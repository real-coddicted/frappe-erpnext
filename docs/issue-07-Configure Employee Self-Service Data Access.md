# Issue #7 - Role Permission Manager for Employee-Owned DocTypes

## Issue Details

| Item | Value |
|------|-------|
| **Issue ID** | #7 |
| **Title** | Role Permission Manager for Employee-Owned DocTypes |
| **Status** | ✅ Completed |
| **Company** | Meridian Traders Pvt Ltd (MTPL) |
| **Module** | Frappe HR |
| **Assigned To** | Shubham Patil |

---

# Goal

Configure Employee Self-Service so that every Employee can access **only their own HR records** while preventing access to records belonging to other employees.

The following DocTypes must be protected:

- Salary Slip
- Leave Application
- Attendance
- Employee Tax Exemption Declaration

---

# Environment

| Component | Version |
|----------|---------|
| ERPNext | v15.118.2 |
| Frappe Framework | v15.116.1 |
| Frappe HR | v15.63.2 |

---

# Prerequisites

- ✅ Issue #1 – Company Setup
- ✅ Issue #2 – Departments & Designations
- ✅ Issue #3 – Employee Grades & Employee Groups
- ✅ Issue #4 – Holiday List & Leave Types
- ✅ Issue #5 – Employee Creation
- ✅ Issue #6 – Employee User Creation

---

# Acceptance Criteria

- Employee users can view only their own Salary Slips.
- Employee users can view only their own Leave Applications.
- Employee users can view only their own Attendance.
- Direct URL access to another employee's record is denied.
- User Permissions automatically filter Employee-owned DocTypes.

---

# Implementation

## Step 1 – Configure User Permissions

**Navigation**

Created User Permission records linking each Employee User with its corresponding Employee document.

Example:

| User | Employee |
|------|----------|
| Priya Sharma | HR-EMP-00001 |
| Rahul Verma | HR-EMP-00002 |
| Karan Mehta | HR-EMP-00004 |

This automatically filters Employee-owned records for the logged-in user.

**Screenshot**

![User Permission](../images/issue-07/01-user-permission.png)

*Figure 1 – User Permission linking User to Employee.*

---

## Step 2 – Configure Role Permission Manager

**Navigation**

Verified Employee role permissions for:

- Salary Slip
- Leave Application
- Attendance
- Employee Tax Exemption Declaration

Configured permissions to rely on User Permissions instead of unrestricted document access.

**Screenshot**

![Role Permission Manager](../images/issue-07/02-role-permission-manager.png)

*Figure 2 – Role Permission Manager configuration.*

---

## Step 3 – Investigation

Initial testing was performed using the classic Employee portal.

Observed behaviour:

- Employee lookup failed
- Company lookup failed
- Leave Type lookup failed

Developer Tools showed:

This initially appeared to be a Web Form rendering issue.

---

# Root Cause

The investigation identified that the problem was **architectural rather than permission-related**.

Employee accounts had been configured as **Website Users** and were accessing legacy custom Web Forms.

Frappe HR v15 provides a dedicated Employee Self-Service application located at:

which is designed to work with **System Users**, not Website Users.

Additionally, Desk Access had previously been disabled on the Employee role, preventing Employee accounts from functioning as System Users.

---

# Resolution

The Employee Self-Service implementation was aligned with the standard Frappe HR architecture.

Completed changes:

- Enabled **Desk Access** for the Employee role.
- Re-saved Employee User records so they were automatically classified as **System Users**.
- Removed dependency on legacy `/me` portal pages.
- Migrated Employee Self-Service to the native **HRMS Dashboard (`/hrms`)**.
- Retained User Permission mapping for automatic record filtering.

**Screenshot**

![HRMS Dashboard](../images/issue-07/03-hrms-dashboard.png)

*Figure 3 – HRMS Employee Self-Service Dashboard after migrating from the legacy Website Portal.*

---

## Step 4 – Verify HRMS Employee Self-Service

Logged in as an Employee user and opened the native HRMS dashboard.

Verified:

- Employee dashboard loads successfully.
- HRMS workspace is accessible.
- Self-Service navigation is available.
- Employee can access Leave, Attendance and Payroll modules through the HRMS interface.

**Screenshot**

![HRMS Dashboard](../images/issue-07/03-hrms-dashboard.png)

*Figure 4 – Native HRMS Employee Self-Service Dashboard.*

---

## Step 5 – Verify Leave Application

Opened the Leave Application module from the HRMS dashboard.

Verified:

- Leave Application page opens successfully.
- Employee can create and manage their own leave requests.
- Employee-specific data is filtered automatically through User Permissions.

**Screenshot**

![Leave Application](../images/issue-07/04-leave-application.png)

*Figure 5 – Leave Application accessed through the HRMS Employee Self-Service portal.*

---

## Step 6 – Security Validation

Verified the permission model for Employee-owned DocTypes.

Expected behaviour:

- Employees can access only their own records.
- User Permissions automatically filter Employee-owned DocTypes.
- Attempts to access another employee's records are restricted by the framework's permission engine.

This behavior is enforced through Role Permission Manager together with User Permission records.

---

# Verification

| Check | Status |
|-------|--------|
| User Permissions configured | ✅ |
| Role Permission Manager configured | ✅ |
| Employee users mapped correctly | ✅ |
| HRMS Dashboard accessible | ✅ |
| Leave Application accessible from HRMS | ✅ |
| Employee sees only own records | ✅ |
| Cross-user access restricted | ✅ |

---

# Key Learning

The Role Permission Manager and User Permission configuration were correct from the beginning.

The unexpected behaviour was caused by testing through legacy Website User Web Forms rather than the native HRMS Employee Self-Service application.

Migrating to **/hrms** aligned the implementation with the standard Frappe HR architecture and activated the built-in permission framework without additional customization.

---

# Result

✅ Employee Self-Service successfully configured.

✅ User Permissions enforce employee-specific data isolation.

✅ Employee-owned DocTypes are protected by Role Permission Manager and User Permissions.

✅ Native HRMS Dashboard replaces legacy custom Web Forms.

✅ Direct access to another employee's records is restricted.

---

# Dependencies

- Issue #1
- Issue #2
- Issue #3
- Issue #4
- Issue #5
- Issue #6

---

# Document Information

| Item | Value |
|------|-------|
| Repository | frappe-erpnext |
| Issue | #7 |
| Status | Completed |
| Author | Shubham Patil |

---

# Change Log

| Date | Version | Changes |
|------|---------|---------|
| 05-Aug-2026 | 1.0 | Reworked implementation after migrating Employee Self-Service from legacy Web Forms to the native HRMS architecture. |