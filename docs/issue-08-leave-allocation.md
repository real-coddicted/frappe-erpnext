# Issue #8 - Leave Allocation

## Issue Details

| Item | Value |
|------|-------|
| **Issue ID** | #8 |
| **Title** | Configure Leave Allocation for Employees |
| **Status** | ✅ Completed |
| **Module** | Frappe HR |
| **Company** | Meridian Traders Pvt Ltd (MTPL) |
| **Assigned To** | Shubham Patil |

---

# Goal

Allocate the initial leave balances for every employee so they can submit Leave Applications using the Employee Self-Service portal.

---

# Environment

| Component | Version |
|-----------|---------|
| ERPNext | v15.118.2 |
| Frappe Framework | v15.116.1 |
| Frappe HR | v15.63.2 |

---

# Prerequisites

- ✅ Issue #4 – Holiday List & Leave Types
- ✅ Issue #5 – Employee Creation
- ✅ Issue #6 – Employee User Creation
- ✅ Issue #7 – Employee Self-Service Configuration

---

# Acceptance Criteria

- All six employees receive Leave Allocations for the active Leave Period.
- Every employee receives:
  - Casual Leave – **12 Days**
  - Sick Leave – **8 Days**
  - Earned Leave – **15 Days**
- Leave balances are visible from the HRMS Employee Dashboard.
- Employees can submit Leave Applications using the allocated balances.

---

# Implementation

## Step 1 – Configure Leave Allocations

**Navigation**

```
HR
→ Leave Allocation
```

Created and submitted Leave Allocation records for every employee in the active Leave Period.

Each employee received:

| Leave Type | Days |
|------------|-----:|
| Casual Leave | 12 |
| Sick Leave | 8 |
| Earned Leave | 15 |

A total of **18 Leave Allocation records** were created (3 Leave Types × 6 Employees).

### Screenshot

![Leave Allocation](../images/issue-08/01-leave-allocation.png)

*Figure 1 – Leave Allocation records created and submitted.*

---

## Step 2 – Verify Employee Leave Balance

Logged in as an Employee and opened the HRMS Leave Dashboard.

```
/hrms/dashboard/leaves
```

Verified that the allocated balances are displayed correctly.

Expected balances:

| Leave Type | Available Balance |
|------------|------------------:|
| Casual Leave | 12 |
| Sick Leave | 8 |
| Earned Leave | 15 |

The employee can immediately use these balances while creating a Leave Application.

### Screenshot

![HRMS Leave Dashboard](../images/issue-08/02-hrms-leave-dashboard.png)

*Figure 2 – Employee HRMS Dashboard displaying available leave balances.*

---

# Verification

| Check | Status |
|--------|--------|
| Active Leave Period available | ✅ |
| Leave Allocation created | ✅ |
| Leave Allocation submitted | ✅ |
| All six employees allocated leave | ✅ |
| Casual Leave (12 Days) allocated | ✅ |
| Sick Leave (8 Days) allocated | ✅ |
| Earned Leave (15 Days) allocated | ✅ |
| HRMS Dashboard displays balances | ✅ |
| Employee ready to submit Leave Application | ✅ |

---

# Observations

- Leave Allocations become available only after submission.
- HRMS Dashboard automatically displays the current leave balance for each Leave Type.
- Employees can view only their own leave balances through Employee Self-Service.
- No additional customization was required after migrating to the native HRMS interface.

---

# Result

✅ Leave Allocations configured for all six employees.

✅ Casual Leave (12 Days), Sick Leave (8 Days), and Earned Leave (15 Days) successfully allocated.

✅ Employee leave balances verified through the HRMS Dashboard.

✅ Employee Self-Service is ready for Leave Application submission.

---

# Dependencies

- Issue #4
- Issue #5
- Issue #6
- Issue #7

---

# Next Steps

Proceed to **Issue #9 – Employee Attendance & Leave Without Pay (LWP).**

---

# Document Information

| Item | Value |
|------|-------|
| Repository | frappe-erpnext |
| Issue | #8 |
| Status | Completed |
| Author | Shubham Patil |

---

# Change Log

| Date | Version | Changes |
|------|---------|---------|
| 05-Aug-2026 | 1.0 | Configured Leave Allocations for all employees, verified balances through the HRMS Dashboard, and completed leave allocation setup. |