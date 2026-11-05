import frappe

@frappe.whitelist()
def get_my_profile():
    user = frappe.session.user
    
    employee = frappe.get_value("Employee", {"user_id": user}, "name")
    if not employee:
        frappe.throw("Employee profile not found")
        
    doc = frappe.get_doc("Employee", employee)
    
    # Get the manager's name
    reports_to_name = None
    if doc.reports_to:
        reports_to_name = frappe.get_value("Employee", doc.reports_to, "employee_name")
        
    # Get the company email
    user_email = frappe.get_value("User", user, "email")
        
    return {
        "employee": doc.name,
        "employee_name": doc.employee_name,
        "image": doc.image,
        "department": doc.department,
        "designation": doc.designation,
        "date_of_joining": doc.date_of_joining,
        "reports_to": doc.reports_to,
        "reports_to_name": reports_to_name,
        "work_location": doc.get("branch"),
        
        "cell_number": doc.cell_number,
        "personal_email": doc.personal_email,
        "current_address": doc.current_address,
        "emergency_contact_name": doc.person_to_be_contacted,
        "emergency_phone_number": doc.emergency_phone_number,
        "company_email": doc.company_email or user_email
    }

@frappe.whitelist()
def update_my_profile(
    cell_number=None, 
    personal_email=None, 
    current_address=None, 
    emergency_contact_name=None, 
    emergency_phone_number=None
):
    user = frappe.session.user
    
    employee = frappe.get_value("Employee", {"user_id": user}, "name")
    if not employee:
        frappe.throw("Employee profile not found")
        
    doc = frappe.get_doc("Employee", employee)
    
    # Explicitly whitelist and assign fields
    if cell_number is not None: doc.cell_number = cell_number
    if personal_email is not None: doc.personal_email = personal_email
    if current_address is not None: doc.current_address = current_address
    if emergency_contact_name is not None: doc.person_to_be_contacted = emergency_contact_name
    if emergency_phone_number is not None: doc.emergency_phone_number = emergency_phone_number
    
    # Not using doc.update(data) specifically to prevent mass-assignment
    doc.save(ignore_permissions=True)
    return doc.name
