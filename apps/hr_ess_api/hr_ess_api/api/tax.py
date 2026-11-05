import frappe
from frappe import _
import json

def _get_employee():
    """Resolves the current logged-in user to their Employee record."""
    employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
    if not employee:
        frappe.throw(_("No Employee linked to the current user."))
    return employee

@frappe.whitelist()
def get_payroll_periods():
    """Fetches a list of active Payroll Periods for dropdowns."""
    return frappe.get_all("Payroll Period", fields=["name"], order_by="name desc")

@frappe.whitelist()
def get_exemption_categories():
    """Fetches Employee Tax Exemption Categories."""
    return frappe.get_all("Employee Tax Exemption Category", fields=["name", "max_amount"], order_by="name asc")

@frappe.whitelist()
def get_my_tax_declaration(payroll_period=None):
    """Fetches the logged-in user's tax declarations, dynamically computing if each is editable."""
    employee = _get_employee()
    
    filters = {"employee": employee}
    if payroll_period:
        filters["payroll_period"] = payroll_period
        
    declarations = frappe.get_all(
        "Employee Tax Exemption Declaration",
        filters=filters,
        fields=["name", "payroll_period", "total_exemption_amount", "docstatus"],
        order_by="creation desc"
    )
    
    for d in declarations:
        # Dynamically check if Frappe's permission engine allows writing to this specific doc
        d["can_edit"] = frappe.has_permission("Employee Tax Exemption Declaration", "write", doc=d.name)
        
    return declarations

@frappe.whitelist()
def get_tax_declaration_details(name):
    """Fetches the child table rows for an existing declaration."""
    _get_employee()
    doc = frappe.get_doc("Employee Tax Exemption Declaration", name)
    if not frappe.has_permission("Employee Tax Exemption Declaration", "read", doc=name):
        frappe.throw(_("No permission"))
    return doc.get("declarations")

@frappe.whitelist()
def submit_tax_declaration(payroll_period, declarations):
    """Creates a new Employee Tax Exemption Declaration securely."""
    employee = _get_employee()
    
    if isinstance(declarations, str):
        declarations = json.loads(declarations)
        
    doc = frappe.get_doc({
        "doctype": "Employee Tax Exemption Declaration",
        "employee": employee,
        "payroll_period": payroll_period,
        "declarations": declarations
    })
    
    doc.insert()
    return doc.name

@frappe.whitelist()
def update_tax_declaration(name, declarations):
    """Updates an existing declaration, but only if the Frappe permission engine allows it."""
    # Ensure they have an employee record, though the permission engine is the real guard here
    _get_employee()
    
    doc = frappe.get_doc("Employee Tax Exemption Declaration", name)
    
    # Crucial security check: Enforce the backend permission state
    if not doc.has_permission("write"):
        frappe.throw(_("You don't have permission to edit this Tax Declaration."), frappe.PermissionError)
        
    if isinstance(declarations, str):
        declarations = json.loads(declarations)
        
    # Overwrite the child table with the new items
    doc.set("declarations", [])
    doc.extend("declarations", declarations)
    doc.save()
    
    return doc.name
