# Issue #20 - Employee Separation Template

## Issue Details

| Item | Value |
|------|-------|
| **Issue ID** | #20 |
| **Title** | Employee Separation Template |
| **Status** | ✅ Completed |
| **Assigned To** | Shubham Patil |
| **Date Completed** | 05-Aug-2026 |

---

# Environment

| Component | Version |
|----------|---------|
| ERPNext | v15.118.2 |
| Frappe Framework | v15.116.1 |
| Frappe HR | v15.63.2 |
| Company | Meridian Traders Pvt Ltd (MTPL) |

---

# Goal

Create a reusable Employee Separation Template that standardizes the offboarding process by defining the required separation activities, responsible owners, and expected completion durations.

---

# Prerequisites

- ✅ Issue #6 – Employee User Creation

---

# Acceptance Criteria

- Standard Separation template created.
- At least five separation activities configured.
- Every activity has an assigned owner.
- Every activity has a defined duration.
- Template saved successfully and available for future Employee Separation records.

---

# Implementation

## Step 1 – Create Employee Separation Template

**Navigation**

```
HR → Employee Separation Template → New
```

Created a new Employee Separation Template with the following configuration:

| Field | Value |
|------|-------|
| Title | Standard Separation |
| Company | Meridian Traders Pvt Ltd |

The template was designed as a reusable company-wide offboarding checklist.

---

## Step 2 – Configure Separation Activities

Added the required offboarding activities with responsible users and estimated completion durations.

| Activity | Owner | Begin On (Days) | Duration (Days) |
|----------|-------|----------------:|----------------:|
| Exit Interview | Rahul Verma (HR) | 0 | 1 |
| Return Company Assets | Rahul Verma (HR / IT) | 0 | 2 |
| Revoke System Access | Rahul Verma (HR / IT) | 0 | 1 |
| Full & Final Settlement | Rahul Verma (HR Manager) | 1 | 5 |
| Knowledge Transfer | Anjali Nair (Reporting Manager) | 0 | 3 |

Each activity defines the responsible owner and expected completion timeline for a consistent employee separation workflow.

---

## Step 3 – Save the Template

Saved the Employee Separation Template after validating all required activities and ownership assignments.

The template is now available for reuse whenever an Employee Separation record is created.

**Reference – Figure 1**

![Employee Separation Template](../images/issue-20/employee-separation-template.png)

*Figure 1: Standard Separation template configured with separation activities, assigned owners, and durations.*

---

# Verification

| Check | Status |
|-------|--------|
| Employee Separation Template created | ✅ |
| Template named **Standard Separation** | ✅ |
| Five separation activities configured | ✅ |
| Activity owners assigned | ✅ |
| Activity durations configured | ✅ |
| Template saved successfully | ✅ |

---

# Observations

- Employee Separation Templates provide a reusable offboarding workflow.
- Activity ownership ensures responsibilities are clearly assigned.
- Begin On and Duration fields help schedule separation tasks.
- The template can be linked directly to future Employee Separation records.

---

# Result

✅ Created the **Standard Separation** template.

✅ Configured five separation activities.

✅ Assigned responsible owners and durations for each activity.

✅ Saved the template for reuse in future employee offboarding processes.

The organization now has a standardized offboarding checklist for Employee Separation.

---

# Dependencies

- Depends On: Issue #6 – Employee User Creation

---

# Next Steps

Proceed to creating an **Employee Separation** record using the **Standard Separation** template to execute the complete employee offboarding workflow.

---

# Document Information

| Item | Value |
|------|-------|
| Repository | frappe-erpnext |
| Issue | #20 |
| Status | Completed |
| Author | Shubham Patil |

---

# Change Log

| Date | Version | Changes |
|------|---------|---------|
| 05-Aug-2026 | 1.0 | Created the Standard Separation template, configured separation activities, assigned owners and durations, and documented the reusable employee offboarding workflow. |