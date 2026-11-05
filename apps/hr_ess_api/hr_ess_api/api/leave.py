import frappe
from frappe import _
from hrms.hr.doctype.leave_application.leave_application import get_leave_balance_on
from frappe.utils import today

def _get_employee():
    """Resolves the current logged-in user to their Employee record to prevent data leaks across employees."""
    employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
    if not employee:
        frappe.throw(_("No Employee linked to the current user."))
    return employee

@frappe.whitelist()
def get_my_leaves():
    """Fetches the logged-in user's leave history explicitly requesting specific fields to avoid over-fetching data."""
    employee = _get_employee()
    return frappe.get_all(
        "Leave Application",
        filters={"employee": employee},
        fields=["name", "leave_type", "from_date", "to_date", "status", "total_leave_days", "description"],
        order_by="from_date desc"
    )

@frappe.whitelist()
def get_my_leave_balance():
    """Returns the logged-in user's leave balance per leave type by wrapping the standard HRMS utility."""
    employee = _get_employee()
    leave_allocations = frappe.get_all(
        "Leave Allocation",
        filters={"employee": employee, "docstatus": 1, "to_date": [">=", today()], "from_date": ["<=", today()]},
        fields=["leave_type"],
        distinct=True
    )
    
    balances = []
    for row in leave_allocations:
        balances.append({
            "leave_type": row.leave_type,
            "balance": get_leave_balance_on(employee, row.leave_type, today())
        })
    return balances

@frappe.whitelist()
def apply_leave(leave_type, from_date, to_date, reason=None):
    """Creates a Leave Application securely by forcing the employee ID to be the logged-in user's."""
    employee = _get_employee()
    
    # Auto-fetch the leave approver from the employee's profile
    approver = frappe.db.get_value("Employee", employee, "leave_approver")
    if not approver:
        # Fallback to the user of the reports_to employee
        reports_to = frappe.db.get_value("Employee", employee, "reports_to")
        if reports_to:
            approver = frappe.db.get_value("Employee", reports_to, "user_id")
            
    doc = frappe.get_doc({
        "doctype": "Leave Application",
        "employee": employee,
        "leave_type": leave_type,
        "from_date": from_date,
        "to_date": to_date,
        "description": reason,
        "leave_approver": approver
    })
    doc.insert()
    return doc.name
