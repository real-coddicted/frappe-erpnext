# Issue #18 - Employee Onboarding Template

## Issue Details

- **Issue ID:** #18
- **Title:** Employee Onboarding Template
- **Status:** ✅ Completed
- **Assigned To:** Shubham Patil
- **Date Completed:** 05-Aug-2026

---

## Environment

- ERPNext v15.118.2
- Frappe Framework v15.116.1
- Frappe HR v15.63.2
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Create a reusable Employee Onboarding Template that standardizes the onboarding process for new employees by defining common onboarding activities, owners, and expected completion durations.

---

## Prerequisites

- ✅ Issue #6 – Employee User Creation

---

## Acceptance Criteria

- A reusable **Standard Onboarding** template exists.
- Template contains at least four onboarding activities.
- Every activity has an assigned owner.
- Every activity has a defined duration.

---

# Implementation

## Step 1: Create Employee Onboarding Template

**Navigation:**

```
HR → Employee Onboarding Template
```

Created a new Employee Onboarding Template named:

```
Standard Onboarding
```

The template was configured for **Meridian Traders Pvt Ltd** and includes a reusable onboarding checklist that can be assigned whenever a new employee joins the organization.

---

## Step 2: Configure Onboarding Activities

Added the following onboarding activities to the template.

| Activity | Owner | Begin On (Days) | Duration (Days) |
|-----------|-------|----------------:|----------------:|
| Complete HR Forms | Rahul Verma (HR) | 0 | 1 |
| IT Account & Laptop Setup | Rahul Verma (HR/IT) | 0 | 2 |
| Assign Buddy / Mentor | Anjali Nair (Reporting Manager) | 0 | 3 |
| Orientation Training | Rahul Verma (HR) | 1 | 5 |

Each activity includes:

- Assigned owner
- Planned start day
- Estimated completion duration

---

## Step 3: Save Template

Saved the onboarding template successfully.

The template is now available for reuse when creating future Employee Onboarding records, ensuring a consistent onboarding process across the organization.

**Reference:** Figure 1

![Employee Onboarding Template](../images/issue-18/onboarding-template.png)

*Figure 1: Standard Onboarding Template with four configured onboarding activities.*

---

## Version Notes

ERPNext v15 stores onboarding activities within reusable **Employee Onboarding Templates**.

Once created, the template can be selected while creating an **Employee Onboarding** document, automatically generating all predefined onboarding tasks for the new employee.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Employee Onboarding Template created | ✅ |
| 2 | Template named **Standard Onboarding** | ✅ |
| 3 | Four onboarding activities added | ✅ |
| 4 | Activity owners assigned | ✅ |
| 5 | Activity durations configured | ✅ |
| 6 | Template saved successfully | ✅ |

---

## Observations

- Employee Onboarding Templates provide a reusable onboarding workflow.
- Activities can be assigned to HR staff, managers, or other responsible users.
- Begin On and Duration values help schedule onboarding activities.
- The template can be reused for multiple employees without recreating tasks.

---

## Result

✅ Created the **Standard Onboarding** template.

✅ Configured four onboarding activities.

✅ Assigned responsible owners for each activity.

✅ Defined onboarding schedule using begin dates and durations.

✅ Successfully created a reusable onboarding checklist for future employees.

---

## Dependencies

**Depends On:** Issue #6 – Employee User Creation

---

## Next Steps

Use the **Standard Onboarding** template when creating Employee Onboarding records for new hires so that onboarding activities are generated automatically.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #18 |
| Last Updated | 05-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 05-Aug-2026 | 1.0 | Shubham Patil | Created the Standard Onboarding template, configured four onboarding activities with owners and durations, and documented the reusable onboarding workflow. |