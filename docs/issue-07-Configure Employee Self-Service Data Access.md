# Issue #7 - Configure Employee Self-Service Data Access

## Issue Details

* **Issue ID**: #7
* **Title**: Configure Employee Self-Service Data Access and Portal Permissions
* **Status**: 🟡 Partially Completed (Blocked by Web Form Rendering Issue)
* **Assigned To**: Shubham Patil
* **Last Updated**: 03-Aug-2026

---

## Environment

* ERPNext v15.118.2
* Frappe Framework v15.116.1
* Frappe HR v15.63.2
* Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Configure the Employee Self-Service Portal so that Employee users can:

* View only their own Leave Applications.
* Create Leave Applications.
* View only their own Attendance records.
* View only their own Salary Slips.
* Prevent access to records belonging to other employees using Role Permissions and User Permissions.

---

## Prerequisites

* ✅ Issue #1 – Company Setup
* ✅ Issue #2 – Departments & Designations
* ✅ Issue #3 – Employee Grades & Employee Groups
* ✅ Issue #4 – Holiday List & Leave Types
* ✅ Issue #5 – Employee Creation & Organization Structure
* ✅ Issue #6 – User Creation & Employee Self-Service Portal Access

---

## Acceptance Criteria

* Employee users can only access their own records.
* User Permissions are enforced correctly.
* Leave Application Web Form works correctly.
* Employee lookup functions correctly.
* Leave Type lookup functions correctly.
* Attendance and Salary Slip remain restricted to the logged-in Employee.

---

# Implementation

## Step 1: Configure User Permissions

**Navigation:** Users & Permissions → User Permissions

Created User Permission records mapping every Employee user to the corresponding Employee document.

Example:

| User | Allowed Document |
|------|------------------|
| Karan Mehta | HR-EMP-00004 |

This ensures each Employee can only access records related to their own Employee document.

**Reference:** Figure 1

![User Permission](../images/issue-07/user-permission.png)

*Figure 1: User Permission linking Employee user with Employee record.*

---

## Step 2: Verify Role Permissions

Verified Role Permission Manager configuration for all required DocTypes.

### Employee

Verified:

* Read ✅
* Select ✅

### Leave Type

Verified:

* Read ✅
* Select ✅

The permissions were confirmed to be correctly configured for the Employee role.

**Reference:** Figure 2

![Role Permission](../images/issue-07/role-permission.png)

*Figure 2: Employee Role permissions for Employee and Leave Type.*

---

## Step 3: Verify Leave Application Web Form

**Navigation:** Website → Web Form

Verified the Leave Application Web Form configuration.

Confirmed:

* Published ✅
* Login Required ✅
* Apply Document Permissions ✅
* Allow Multiple Responses ✅

The Web Form configuration matched the project requirements.

**Reference:** Figure 1

![Leave Application Web Form](../images/issue-07/webform-list.png)

*Figure 1: Leave Application Web Form available in the Website module for Employee Self-Service.*

**Navigation:** Website → Web Form → Leave Application

Verified the following settings:

* Published ✅
* Login Required ✅
* Apply Document Permissions ✅
* Allow Multiple Responses ✅

The Web Form configuration matched the project requirements.

**Reference:** Figure 3

![Web Form Settings](../images/issue-07/webform-settings.png)

*Figure 3: Leave Application Web Form configuration.*

---

## Step 4: Verify Portal List Page

Opened the Employee Self-Service Portal.

Verified:

```
/leave-application/list
```

The following functionality worked correctly:

* Employee filter
* Company filter
* Leave Type filter
* Employee Name display
* Portal authentication

The list page loaded successfully, Employee Name and Company information were displayed, and filter fields such as Employee, Company, and Leave Type were available.

**Reference:** Figure 2

![Leave Application List](../images/issue-07/leave-application-list.png)

*Figure 2: Leave Application list page showing Employee Self-Service portal with working filters.*

Opened the Employee Self-Service Portal.

Verified:

```
/leave-application/list
```

The following functionality worked correctly:

* Employee filter
* Company filter
* Leave Type filter
* Employee Name display
* Portal authentication

Employee-specific data was displayed correctly according to User Permissions.

**Reference:** Figure 4

![Leave List](../images/issue-07/leave-list.png)

*Figure 4: Leave Application list page displaying Employee filters.*

---

# Investigation

Testing was performed using:

```
/leave-application/new
```

Observed behaviour:

* Employee field displayed **"No results found"**
* Leave Type displayed **"Begin typing for results"**
* Company lookup failed
* No search request was generated from the browser

The issue occurred only on the Web Form create page.

**Reference:** Figure 3

![Leave Application Create Page](../images/issue-07/leave-application-new.png)

*Figure 3: Leave Application create page where Employee, Company and Leave Type lookups fail to initialize correctly.*
---

## Step 5: Runtime Investigation

Developer Tools were used to inspect the rendered Web Form metadata.

Example:

```javascript
frappe.web_form.fields_dict.employee.df
```

Observed runtime values:

```text
fieldtype : "Autocomplete"
options   : ""
```

The same behaviour was observed for:

* Employee
* Company
* Leave Type

This suggests that the lookup target Doctype is unavailable during runtime, preventing the lookup request from being initialized.

## Step 6: Compare Web Form Configuration

The same fields were inspected inside the Web Form editor.

Verified:

**Employee**

* Fieldtype → Link
* Options → Employee

**Leave Type**

* Fieldtype → Link
* Options → Leave Type

**Company**

* Fieldtype → Link
* Options → Company

The Web Form editor displayed the fields correctly.

However, the runtime portal rendered the same fields as Autocomplete controls with empty `options`.

This indicates a mismatch between the configured Web Form metadata and the metadata available during runtime rendering.

## Step 7: Additional Tests Performed

The following troubleshooting steps were completed.

### Test 1

Deleted the Employee field.

Recreated the Employee field.

**Result**

No change.

---

### Test 2

Deleted the Company field.

Recreated the Company field.

**Result**

No change.

---

### Test 3

Enabled **Show in Filter** for Employee.

Result:

Employee filter appeared correctly on:

```
/leave-application/list
```

However, Employee lookup on:

```
/leave-application/new
```

still failed.

---

### Test 4

Enabled **Show in Filter** for Leave Type.

Leave Type filter appeared correctly on the list page.

The create page continued to fail.

---

### Test 5

Verified browser Developer Tools while interacting with Employee, Company and Leave Type fields.

**Result**

No XHR/API request was generated when interacting with these fields.

This indicates that the lookup initialization itself is failing before any server request is made.

## Verification

| # | Check | Status |
|----|----------------------------------------------|--------|
| 1 | User Permissions configured | ✅ |
| 2 | Employee Role Permissions verified | ✅ |
| 3 | Leave Type permissions verified | ✅ |
| 4 | Login Required enabled | ✅ |
| 5 | Apply Document Permissions enabled | ✅ |
| 6 | Employee portal login verified | ✅ |
| 7 | Leave Application list page working | ✅ |
| 8 | Employee filters working | ✅ |
| 9 | Employee lookup on create page | ❌ |
|10 | Leave Type lookup on create page | ❌ |
|11 | Company lookup on create page | ❌ |
|12 | Root cause narrowed | 🟡 |

---

## Observations

* User Permissions are functioning correctly.
* Employee users are restricted to their own records.
* Portal authentication is functioning correctly.
* Leave Application list page behaves as expected.
* Employee, Company, and Leave Type filters work correctly on the list page.
* The issue is isolated to the Leave Application Web Form create page.
* During runtime, all Link fields are rendered as **Autocomplete** controls with an empty `options` property.
* Because the lookup target Doctype is unavailable, no search request is generated when interacting with these fields.
* The stored Web Form configuration appears correct inside the editor, indicating a mismatch during runtime rendering.

---

## Current Blocker

The Leave Application Web Form fails to initialize Link fields correctly during portal rendering.

Instead of receiving their configured target Doctype, the rendered controls contain:

```
fieldtype : Autocomplete
options   : ""
```

As a result:

* Employee lookup fails.
* Company lookup fails.
* Leave Type lookup fails.
* No search request is generated.

The exact point where the `options` property is lost could not be verified because server-side inspection through Bench Console or System Console was not available in the current environment.

---

## Result

✅ Successfully configured Employee User Permissions.

✅ Successfully verified Role Permissions.

✅ Successfully configured Employee Self-Service Portal access.

✅ Successfully verified document-level access restrictions.

✅ Successfully narrowed the issue to the Leave Application Web Form rendering process.

🟡 Implementation is partially complete.

The remaining blocker is isolated to the Leave Application Web Form create page, where Link fields lose their runtime lookup configuration.

---

## Dependencies

* Depends On: Issue #1, Issue #2, Issue #3, Issue #4, Issue #5, and Issue #6.

---

## Next Steps

* Verify stored Web Form metadata through Bench Console or REST API.
* Compare stored Web Form field configuration with runtime metadata.
* Investigate the Web Form rendering pipeline responsible for converting Link fields into Autocomplete controls.
* Resume implementation after identifying the root cause of the rendering issue.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #7 |
| Status | Partially Completed |
| Last Updated | 03-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 03-Aug-2026 | 0.9 | Shubham Patil | Initial investigation documented. User permissions, portal configuration, debugging, findings, and blocker documented. Issue marked as partially completed pending framework-level investigation. |