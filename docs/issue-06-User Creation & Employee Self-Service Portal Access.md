# Issue #6 - User Creation & Employee Self-Service Portal Access

## Issue Details

* **Issue ID**: #6
* **Title**: Create Users and Configure Employee Self-Service Portal Access
* **Status**: ✅ Completed
* **Assigned To**: Shubham Patil
* **Date Completed**: 31-Jul-2026

---

## Environment

* ERPNext v15
* Frappe Framework
* HR Module
* Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Create User accounts for all employees, link each Employee record with its corresponding User, assign the required roles, and verify that Employee-role users can access the Employee Self-Service Portal while being restricted from the ERPNext Desk.

---

## Prerequisites

* ✅ Issue #1 (Company Setup) completed
* ✅ Issue #2 (Departments & Designations) completed
* ✅ Issue #3 (Employee Grades & Employee Groups) completed
* ✅ Issue #4 (Holiday List & Leave Types) completed
* ✅ Issue #5 (Employee Creation & Organization Structure) completed

---

## Acceptance Criteria

* Six User records created.
* Every Employee linked to a User.
* Roles assigned exactly as specified.
* Employee users access the Employee Self-Service Portal.
* Employee users cannot access restricted Desk pages.
* Employee users can access only their own information.

---

# Implementation

## Step 1: Create User Records

**Navigation:** Setup → Users

Created User records for all six employees using their company email addresses.

| Employee     | User ID                                               |
| ------------ | ----------------------------------------------------- |
| Priya Sharma | [priya.sharma@mtpl.com](mailto:priya.sharma@mtpl.com) |
| Rahul Verma  | [rahul.verma@mtpl.com](mailto:rahul.verma@mtpl.com)   |
| Anjali Nair  | [anjali.nair@mtpl.com](mailto:anjali.nair@mtpl.com)   |
| Karan Mehta  | [karan.mehta@mtpl.com](mailto:karan.mehta@mtpl.com)   |
| Sneha Iyer   | [sneha.iyer@mtpl.com](mailto:sneha.iyer@mtpl.com)     |
| Vikram Singh | [vikram.singh@mtpl.com](mailto:vikram.singh@mtpl.com) |

All users were created in **Active** status.

**Reference:** Figure 1

![User List](../images/issue-06/user-list.png)

*Figure 1: User List showing all six employee accounts.*

---

## Step 2: Link Employees to User Accounts

**Navigation:** HR → Employee

Updated the **User ID** field on every Employee record to reference the corresponding User account.

This establishes the relationship between Employee and User for authentication and self-service functionality.

**Reference:** Figure 2

![Employee User Link](../images/issue-06/employee-user-link.png)

*Figure 2: Employee record linked to its corresponding User account.*

---

## Step 3: Assign Roles

Configured Role Profiles so that each user received the required permissions.

| Employee     | Assigned Role |
| ------------ | ------------- |
| Priya Sharma | HR Manager    |
| Rahul Verma  | HR User       |
| Anjali Nair  | Employee      |
| Karan Mehta  | Employee      |
| Sneha Iyer   | Employee      |
| Vikram Singh | Employee      |

The Employee users were assigned only the **Employee** role as required.

**Reference:** Figure 3

![Assigned Roles](../images/issue-06/user-roles.png)

*Figure 3: User Roles configured according to project requirements.*

---

## Step 4: Configure Employee Portal Access

To enable Employee Self-Service access:

* Verified the **Employee** role configuration.
* Configured the Employee role landing page to **/me**.
* Ensured Employee users do not receive unrestricted Desk access.
* Configured the Employee Self-Service portal navigation through Portal Settings.

The portal provides self-service functionality without exposing administrative workspaces.

---

## Step 5: Configure Portal Navigation

**Navigation:** Website → Portal Settings

Configured Employee portal navigation by adding self-service menu items.

| Menu              | Route              | Role     |
| ----------------- | ------------------ | -------- |
| Leave Application | /leave-application | Employee |
| Attendance        | /employee-checkin  | Employee |

These menu items are available only to Employee users through the web portal
---

## Step 6: Verify Employee Login

Opened a private browser session and logged in as **Anjali Nair**.

Verified the following:

* Login completed successfully.
* Employee landed on the Employee Self-Service Portal (`/me`).
* Portal displayed Employee navigation options.
* Direct navigation to restricted Desk pages returned **Not Permitted**.
* Employee access remained limited to self-service functionality.

**Reference:** Figure 6

![Employee Portal](../images/issue-06/employee-portal.png)

*Figure 6: Employee successfully logged into the Self-Service Portal.*

---

## Verification

| #  | Check                                               | Status |
| -- | --------------------------------------------------- | ------ |
| 1  | Six User records created                            | ✅      |
| 2  | Employee records linked with User accounts          | ✅      |
| 3  | HR Manager assigned correctly                       | ✅      |
| 4  | HR User assigned correctly                          | ✅      |
| 5  | Employee role assigned correctly                    | ✅      |
| 6  | Employee login successful                           | ✅      |
| 7  | Employee lands on Self-Service Portal               | ✅      |
| 8  | Employee restricted from administrative Desk pages  | ✅      |
| 9  | Employee can access only self-service functionality | ✅      |
| 10 | Configuration saved successfully                    | ✅      |

---

## Observations

* Employee authentication depends on linking the Employee record with the corresponding User account.
* Role Profiles simplify permission assignment by automatically applying the required roles.
* Employee users authenticate normally but are redirected to the web-based Self-Service Portal instead of the administrative Desk.
* Attempts to access restricted Desk pages return **Not Permitted**, confirming role-based access control.
* The Self-Service Portal exposes only Employee-specific functionality such as profile management, leave applications, and attendance.

---

## Result

✅ Created User accounts for all employees.

✅ Linked every Employee with its corresponding User account.

✅ Assigned roles according to the project requirements.

✅ Verified successful Employee login.

✅ Confirmed Employee users access the Self-Service Portal while remaining restricted from ERPNext administrative functionality.

The user management and Employee Self-Service configuration is complete and ready for subsequent HR processes such as leave management, attendance tracking, and payroll.

---

## Dependencies

* **Depends On:** Issue #1, Issue #2, Issue #3, Issue #4, and Issue #5.

## Next Steps

Proceed to the next assigned issue.

---

## Document Information

| Item         | Value          |
| ------------ | -------------- |
| Author       | Shubham Patil  |
| Repository   | frappe-erpnext |
| Issue        | #6             |
| Last Updated | 31-Jul-2026    |

---

## Change Log

| Date        | Version | Author        | Changes                        |
| ----------- | ------- | ------------- | ------------------------------ |
| 31-Jul-2026 | 1.0     | Shubham Patil | Initial documentation created. |
