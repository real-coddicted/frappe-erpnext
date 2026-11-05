import frappe
from frappe import _
from frappe.utils import get_first_day, get_last_day

def _get_employee():
    """Resolves the current logged-in user to their Employee record."""
    employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
    if not employee:
        frappe.throw(_("No Employee linked to the current user."))
    return employee

@frappe.whitelist()
def get_my_salary_slips(year=None):
    """Returns a list of submitted Salary Slips for the logged-in employee."""
    employee = _get_employee()
    
    filters = {"employee": employee, "docstatus": 1}
    
    if year:
        # Assuming we just want slips with start_date inside this year
        filters["start_date"] = ["between", [f"{year}-01-01", f"{year}-12-31"]]
        
    return frappe.get_all(
        "Salary Slip",
        filters=filters,
        fields=["name", "start_date", "end_date", "net_pay", "currency"],
        order_by="start_date desc"
    )

@frappe.whitelist()
def get_salary_slip_for_month(month, year):
    """Returns a single Salary Slip for a given month/year without throwing an error if missing."""
    employee = _get_employee()
    
    date_str = f"{year}-{int(month):02d}-01"
    
    slips = frappe.get_all(
        "Salary Slip",
        filters={
            "employee": employee, 
            "docstatus": 1,
            # A slip belongs to a month if it overlaps with that month
            "start_date": ["<=", get_last_day(date_str)],
            "end_date": [">=", get_first_day(date_str)]
        },
        fields=["name"],
        limit_page_length=1
    )
    
    if not slips:
        return {
            "available": False,
            "message": _("No submitted salary slip found for {0}/{1}").format(month, year)
        }
        
    doc = frappe.get_doc("Salary Slip", slips[0].name)
    
    return {
        "available": True,
        "slip": doc.as_dict()
    }
