import frappe
from hr_ess_api.api.company import get_company_branding
from frappe import _

def get_permission_query_conditions(user):
    if not user:
        user = frappe.session.user

    roles = frappe.get_roles(user)
    if "System Manager" in roles or "HR Manager" in roles:
        return ""

    employee = frappe.db.get_value("Employee", {"user_id": user}, "name")
    if not employee:
        return "1=0"

    return f"employee = {frappe.db.escape(employee)}"


def has_permission(doc, ptype="read", user=None):
    if not user:
        user = frappe.session.user

    roles = frappe.get_roles(user)
    if "System Manager" in roles or "HR Manager" in roles:
        return None

    employee = frappe.db.get_value("Employee", {"user_id": user}, "name")
    if not employee:
        return False

    # If doc is None or a string (just the Doctype name), this is a DocType-level check, not a specific document check
    if not doc or isinstance(doc, str):
        return None

    if doc.get("employee") == employee:
        return None

    return False

@frappe.whitelist()
def get_my_dashboard_context():
    """Returns the basic employee profile and boolean flags for what this user is allowed to see/do."""
    user = frappe.session.user
    employee_data = frappe.db.get_value("Employee", {"user_id": user, "status": "Active"}, ["name", "employee_name"])
    employee_id = employee_data[0] if employee_data else None
    employee_name = employee_data[1] if employee_data else user
    
    has_team = bool(frappe.db.count("Employee", {"reports_to": employee_id, "status": "Active"})) if employee_id else False
    
    # Exclude applications created by the user themselves from leave approval count
    pending_approvals = frappe.get_all(
        "Leave Application",
        filters={"leave_approver": user, "status": "Open", "docstatus": ["<", 2], "owner": ["!=", user]},
        fields=["employee"]
    )
    has_leave_approvals = any(frappe.db.get_value("Employee", a.employee, "user_id") != user for a in pending_approvals)
    
    branding = get_company_branding()
    if not branding or not branding.get("company_name"):
        branding = {"company_name": "ESS Portal", "company_logo": None}
    
    return {
        "employee_name": employee_name,
        "has_team": has_team,
        "has_leave_approvals": has_leave_approvals,
        "branding": branding,
        "modules": {
            "leave": bool(frappe.has_permission("Leave Application", "create")),
            "attendance": bool(frappe.has_permission("Attendance", "read")),
            "salary": bool(frappe.has_permission("Salary Slip", "read")),
            "tax": bool(frappe.has_permission("Employee Tax Exemption Declaration", "create"))
        }
    }

@frappe.whitelist()
def get_csrf_token():
    return frappe.sessions.get_csrf_token()

@frappe.whitelist(allow_guest=True)
def get_logged_user():
    return frappe.session.user
