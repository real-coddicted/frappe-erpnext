# Issue #21 - Employee Separation & Offboarding

## Issue Details

| Item | Value |
|------|-------|
| **Issue ID** | #21 |
| **Title** | Employee Separation & Offboarding |
| **Status** | ✅ Completed |
| **Company** | Meridian Traders Pvt Ltd (MTPL) |
| **Module** | Frappe HR |
| **Assigned To** | Shubham Patil |

---

# Goal

Exercise the complete Employee Separation workflow by processing an employee's offboarding using the configured Separation Template, completing all separation activities, updating the employee status, disabling system access, and verifying that the employee can no longer log in.

---

# Environment

| Component | Version |
|----------|---------|
| ERPNext | v15.118.2 |
| Frappe Framework | v15.116.1 |
| Frappe HR | v15.63.2 |

---

# Prerequisites

- ✅ Issue #19 – Employee Onboarding
- ✅ Issue #20 – Employee Separation Template

---

# Acceptance Criteria

- Employee Separation created using the **Standard Separation** template.
- All separation activities completed.
- Employee status updated to **Left**.
- Employee User account disabled.
- Login attempt using the disabled account is denied.

---

# Implementation

## Step 1 – Create Employee Separation

**Navigation**

```
HR
→ Employee Separation
→ New
```

Created a new Employee Separation record for **Meera Joshi** and linked the **Standard Separation** template.

Configuration:

| Field | Value |
|------|-------|
| Employee | Meera Joshi |
| Separation Template | Standard Separation |
| Relieving Date | 05-Aug-2026 |

After submission, ERPNext automatically generated the separation activity checklist from the selected template.

**Screenshot**

![Employee Separation](../images/issue-21/employee-separation.png)

*Figure 1 – Employee Separation created using the Standard Separation template.*

---

## Step 2 – Complete Separation Activities

Completed all activities generated from the separation template.

Activities completed:

- Exit Interview
- Return Company Assets
- Revoke System Access
- Full & Final Settlement
- Knowledge Transfer

After completing every activity, the Employee Separation workflow reached its final completed state.

---

## Step 3 – Verify Employee Status

After all activities were completed, ERPNext automatically updated the employee record.

Verified:

- Employee Status → **Left**
- Relieving Date updated successfully
- Separation process completed

---

## Step 4 – Disable User Account

Opened the linked User record for **Meera Joshi** and verified that the account was disabled after the separation process.

Verified:

- User linked correctly
- **Enabled** checkbox unchecked
- Account disabled

**Screenshot**

![Disabled User](../images/issue-21/user-disabled.png)

*Figure 2 – User account disabled after completing the separation process.*

---

## Step 5 – Verify Login Restriction

Attempted to log in using Meera Joshi's disabled account.

Verified:

- Login request rejected
- Disabled account cannot access ERPNext
- Employee Self-Service access revoked successfully

---

# Verification

| Check | Status |
|-------|--------|
| Employee Separation created | ✅ |
| Standard Separation template linked | ✅ |
| Separation activities generated | ✅ |
| All activities completed | ✅ |
| Employee status updated to Left | ✅ |
| User account disabled | ✅ |
| Disabled user login blocked | ✅ |

---

# Observations

- Separation Template automatically generated the configured offboarding checklist.
- Completing every activity finalized the separation workflow.
- Employee status changed to **Left** after completion.
- User account was disabled, preventing further system access.
- The complete offboarding process followed the standard Frappe HR workflow without additional customization.

---

# Result

✅ Employee Separation completed successfully.

✅ All offboarding activities completed.

✅ Employee status updated to **Left**.

✅ Linked User account disabled.

✅ Login using the disabled account was successfully blocked.

The employee offboarding workflow has been fully validated end-to-end.

---

# Dependencies

- Issue #19
- Issue #20

---

# Document Information

| Item | Value |
|------|-------|
| Repository | frappe-erpnext |
| Issue | #21 |
| Status | Completed |
| Author | Shubham Patil |

---

# Change Log

| Date | Version | Changes |
|------|---------|---------|
| 05-Aug-2026 | 1.0 | Completed end-to-end Employee Separation workflow, verified activity completion, employee status update, user account disablement, and login restriction. |