import frappe


@frappe.whitelist(allow_guest=True)
def get_company_branding():
    """Company name and logo for the login page. Public on purpose; returns nothing else."""
    company = frappe.db.get_single_value("Global Defaults", "default_company")
    if not company:
        found = frappe.get_all("Company", pluck="name", order_by="creation asc", limit=1)
        company = found[0] if found else None
    if not company:
        return {"company_name": None, "company_logo": None}
    return frappe.db.get_value(
        "Company", company, ["company_name", "company_logo"], as_dict=True
    )
