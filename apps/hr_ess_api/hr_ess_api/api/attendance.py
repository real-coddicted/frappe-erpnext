import frappe
from frappe import _
from frappe.utils import now, get_first_day, get_last_day

def _get_employee():
    """Resolves the current logged-in user to their Employee record."""
    employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
    if not employee:
        frappe.throw(_("No Employee linked to the current user."))
    return employee

@frappe.whitelist()
def get_my_attendance(month=None, year=None):
    """Fetches the logged-in user's daily attendance records, optionally filtered by month and year."""
    employee = _get_employee()
    
    filters = {"employee": employee, "docstatus": 1}
    
    if month and year:
        # Filter strictly by the boundaries of the requested month
        date_str = f"{year}-{int(month):02d}-01"
        filters["attendance_date"] = ["between", [get_first_day(date_str), get_last_day(date_str)]]
        
    return frappe.get_all(
        "Attendance",
        filters=filters,
        fields=["name", "attendance_date", "status", "shift", "leave_type"],
        order_by="attendance_date desc"
    )

@frappe.whitelist()
def get_my_last_checkin_status():
    """Returns the most recent punch (IN or OUT) to correctly reflect current status on the UI."""
    employee = _get_employee()
    
    last_checkin = frappe.get_all(
        "Employee Checkin",
        filters={"employee": employee},
        fields=["name", "log_type", "time"],
        order_by="time desc",
        limit_page_length=1
    )
    
    if last_checkin:
        return last_checkin[0]
    return None

@frappe.whitelist()
def check_in_out(log_type):
    """Logs a single raw punch (IN or OUT) for the employee at the current time."""
    if log_type not in ["IN", "OUT", "IN/OUT"]:
        frappe.throw(_("log_type must be either 'IN' or 'OUT'"))
        
    employee = _get_employee()
    
    doc = frappe.get_doc({
        "doctype": "Employee Checkin",
        "employee": employee,
        "log_type": log_type,
        "time": now()
    })
    
    doc.insert()
    return doc.name
