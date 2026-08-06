# Issue #22 - Salary Structure Approval Workflow & Payroll Entry Permissions

## Issue Details

- **Issue ID:** #22
- **Title:** Salary Structure Approval Workflow & Payroll Entry Permissions
- **Status:** ✅ Completed
- **Assigned To:** Shubham Patil
- **Date Completed:** 06-Aug-2026

---

## Environment

- ERPNext v15.118.2
- Frappe Framework v15.116.1
- Frappe HR v15.63.2
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Implement an approval workflow for Salary Structures and restrict Payroll Entry creation and submission based on user roles.

The implementation ensures:

- HR Users can create and submit Salary Structures for approval.
- HR Managers review and approve Salary Structures.
- HR Users cannot approve their own Salary Structures.
- Payroll Entry creation and submission are restricted to HR Managers.
- HR Users have read-only access to Payroll Entries.

---

## Prerequisites

- ✅ Issue #6 – Employee User Creation
- ✅ Salary Structure Configuration
- ✅ Role & User Setup

---

## Acceptance Criteria

- Salary Structure approval workflow is active.
- HR User cannot approve Salary Structures.
- HR Manager can approve Salary Structures.
- HR User cannot create or submit Payroll Entries.
- HR Manager can create and submit Payroll Entries.

---

# Implementation

## Step 1: Configure Salary Structure Approval Workflow

**Navigation**

```
Setup
→ Workflow
→ Salary Structure Approval
```

Created a workflow for the **Salary Structure** DocType with approval stages for HR Users and HR Managers.

Workflow configuration:

- Draft
- Pending Approval
- Approved

Transition rules ensured that only HR Managers could approve submitted Salary Structures.

**Reference:** Figure 1

![Workflow](../images/issue-22/workflow-salary-structure-approval.png)

*Figure 1: Salary Structure Approval workflow configuration.*

---

## Step 2: Verify HR User Restrictions

Logged in as **Rahul Verma (HR User)**.

Verified:

- Salary Structure can be submitted for approval.
- Approval action is not available.
- Payroll Entry remains read-only.
- Create and Submit actions are restricted.

**Reference:** Figure 2

![Rahul Workflow](../images/issue-22/rahul-cannot-approve.png)

*Figure 2: HR User cannot approve Salary Structures.*

---

## Step 3: Verify HR Manager Approval

Logged in as **Priya Sharma (HR Manager)**.

Opened the pending Salary Structure submitted by Rahul Verma.

Verified:

- Approve action is available.
- Salary Structure successfully moves to Approved state.
- Workflow completes successfully.

**Reference:** Figure 3

![Priya Approval](../images/issue-22/priya-approves-salary-structure.png)

*Figure 3: HR Manager approving the Salary Structure.*

---

## Step 4: Verify Payroll Entry Permissions

Role Permission Manager was configured so that Payroll Entry permissions differ by role.

### HR User

- Read ✅
- Select ✅
- Create ❌
- Submit ❌

### HR Manager

- Read ✅
- Create ✅
- Submit ✅

This prevents HR Users from processing payroll while allowing HR Managers full payroll control.

---

## Step 5: Validate Payroll Entry Access

Payroll Entry access was tested using separate user accounts.

### Rahul Verma (HR User)

Verified:

- Payroll Entry list is accessible.
- Existing Payroll Entries can be viewed.
- Create and Submit actions are unavailable.

**Reference:** Figure 4

![Rahul Payroll](../images/issue-22/payroll-entry-rahul.png)

*Figure 4: Payroll Entry access for HR User (read-only).*

---

### Priya Sharma (HR Manager)

Verified:

- Payroll Entry list is accessible.
- Create Payroll Entry option is available.
- Payroll processing actions are available.

**Reference:** Figure 5

![Priya Payroll](../images/issue-22/payroll-entry-priya.png)

*Figure 5: Payroll Entry access for HR Manager.*

---

## Verification

| # | Check | Status |
|---|-------------------------------|--------|
| 1 | Workflow created | ✅ |
| 2 | Workflow activated | ✅ |
| 3 | HR User cannot approve | ✅ |
| 4 | HR Manager can approve | ✅ |
| 5 | Payroll Entry restricted for HR User | ✅ |
| 6 | Payroll Entry accessible for HR Manager | ✅ |
| 7 | Role permissions validated | ✅ |

---

## Observations

- Salary Structure approval is enforced through Workflow.
- HR Users cannot approve their own Salary Structures.
- HR Managers act as the approval authority.
- Payroll Entry permissions are successfully separated by role.
- Role Permission Manager correctly restricts payroll processing.

---

## Result

✅ Salary Structure Approval Workflow configured successfully.

✅ HR User approval restricted.

✅ HR Manager approval verified.

✅ Payroll Entry permissions separated by role.

✅ Payroll processing secured using Role Permission Manager.

---

## Dependencies

**Depends On:** Issue #6

---

## Next Steps

Proceed with subsequent HR and Payroll workflow enhancements.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #22 |
| Last Updated | 06-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 06-Aug-2026 | 1.0 | Shubham Patil | Implemented Salary Structure approval workflow, validated role-based approvals, and configured Payroll Entry permissions for HR Users and HR Managers. |