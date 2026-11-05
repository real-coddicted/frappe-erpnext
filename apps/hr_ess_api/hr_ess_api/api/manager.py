import frappe
from frappe import _

def _get_employee():
    employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user, "status": "Active"}, "name")
    if not employee:
        frappe.throw(_("No Active Employee linked to the current user."))
    return employee

@frappe.whitelist()
def get_my_team():
    """Returns a list of active employees reporting to the logged-in user."""
    employee = _get_employee()
    team = frappe.get_all(
        "Employee",
        filters={"reports_to": employee, "status": "Active"},
        fields=["name", "employee_name", "department", "designation", "image"]
    )
    return team

@frappe.whitelist()
def get_leave_approvals():
    """Returns a list of open leave applications assigned to the logged-in user for approval, excluding self-applications."""
    user = frappe.session.user
    approvals = frappe.get_all(
        "Leave Application",
        filters={"leave_approver": user, "status": "Open", "docstatus": ["<", 2], "owner": ["!=", user]},
        fields=["name", "employee", "employee_name", "leave_type", "from_date", "to_date", "total_leave_days", "description", "status"]
    )
    valid_approvals = []
    for app in approvals:
        emp_user = frappe.db.get_value("Employee", app.employee, "user_id")
        if emp_user != user:
            valid_approvals.append(app)
    return valid_approvals

@frappe.whitelist()
def submit_leave_approval(leave_id, action):
    """Approves or Rejects a leave application."""
    user = frappe.session.user
    
    if action not in ["Approved", "Rejected"]:
        frappe.throw(_("Invalid action. Must be 'Approved' or 'Rejected'."))
        
    doc = frappe.get_doc("Leave Application", leave_id)
    
    # 1. Strict assigned approver check
    if doc.leave_approver != user:
        frappe.throw(_("You are not the approver for this leave application."))
        
    # 2. Strict anti-self-approval check: caller cannot be the applicant
    applicant_user = frappe.db.get_value("Employee", doc.employee, "user_id")
    if applicant_user == user or doc.owner == user:
        frappe.throw(_("You cannot approve your own leave application."))
        
    if doc.status != "Open":
        frappe.throw(_("This leave application is already {0}.").format(doc.status))
        
    doc.status = action
    if doc.docstatus == 0:
        doc.flags.ignore_permissions = True
        doc.submit()
    else:
        doc.save(ignore_permissions=True)
    
    return doc.name
