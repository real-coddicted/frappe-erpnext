# Issue #19 - Employee Onboarding Execution

## Issue Details

- **Issue ID:** #19
- **Title:** Employee Onboarding Execution
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

Execute the complete employee onboarding workflow using the **Standard Onboarding** template for a new employee, **Meera Joshi**, and verify that the onboarding process creates the required employee records, onboarding activities, and employee self-service access.

---

## Prerequisites

- ✅ Issue #6 – Employee User Creation
- ✅ Issue #18 – Employee Onboarding Template

---

## Acceptance Criteria

- Employee Onboarding created using the **Standard Onboarding** template.
- All onboarding activities completed.
- Boarding Status updated to **Completed**.
- Employee record becomes **Active**.
- Employee User created successfully.
- Employee can log in to the HRMS Self-Service Portal.

---

# Implementation

## Step 1: Create Employee Onboarding

**Navigation**

```
HR → Employee Onboarding
```

Created a new Employee Onboarding record for the dummy employee **Meera Joshi**.

Configuration used:

| Field | Value |
|--------|-------|
| Employee Name | Meera Joshi |
| Company | Meridian Traders Pvt Ltd |
| Department | Engineering |
| Designation | Software Engineer |
| Onboarding Template | Standard Onboarding |

After selecting the onboarding template, ERPNext automatically generated the predefined onboarding activities.

**Reference:** Figure 1

![Employee Onboarding](../images/issue-19/employee-onboarding.png)

*Figure 1: Employee Onboarding created using the Standard Onboarding template.*

---

## Step 2: Generate Employee Record

After submitting the onboarding record, ERPNext automatically linked the onboarding process to the employee profile.

Verified:

- Employee record created successfully.
- Employee assigned to the Engineering department.
- Designation set as Software Engineer.
- Employee linked with the onboarding record.

**Reference:** Figure 2

![Employee Record](../images/issue-19/meera-employee.png)

*Figure 2: Employee record created for Meera Joshi.*

---

## Step 3: Complete Onboarding Activities

The onboarding template generated four activities:

| Activity | Owner | Status |
|----------|-------|--------|
| Complete HR Forms | Rahul Verma | ✅ Completed |
| IT Account & Laptop Setup | Rahul Verma | ✅ Completed |
| Assign Buddy / Mentor | Anjali Nair | ✅ Completed |
| Orientation Training | Rahul Verma | ✅ Completed |

Each activity was completed by the assigned owner.

Once all activities were marked as completed:

- Boarding Status changed to **Completed**.
- Employee onboarding workflow finished successfully.

**Reference:** Figure 3

![Completed Activities](../images/issue-19/onboarding-completed.png)

*Figure 3: All onboarding activities completed and onboarding successfully finished.*

---

## Step 4: Create Employee User

Created a User account for **Meera Joshi** and linked it to the Employee record.

Configuration verified:

- User linked with Employee.
- Employee role assigned.
- User enabled.
- Employee record connected to the User account.

---

## Step 5: Verify Employee Self-Service Portal

Logged in using **Meera Joshi's** Employee account.

Opened:

```
/hrms
```

Verified:

- Employee successfully logged in.
- HRMS Dashboard loaded correctly.
- Employee profile displayed.
- Self-Service Portal accessible.
- Employee could access only her own HR information.

**Reference:** Figure 4

![HRMS Portal](../images/issue-19/meera-self-service.png)

*Figure 4: Meera Joshi successfully logged in to the HRMS Employee Self-Service Portal.*

---

## Version Notes

ERPNext v15 automatically integrates the Employee Onboarding workflow with Employee records and HRMS Self-Service.

Key observations:

- Selecting an Onboarding Template automatically generates onboarding activities.
- Completing all assigned activities updates the Boarding Status.
- Employee records can be linked directly with User accounts for portal access.
- HRMS provides the recommended Employee Self-Service experience without additional customization.

---

## Verification

| # | Check | Status |
|---|--------------------------------------------|--------|
| 1 | Employee Onboarding created | ✅ |
| 2 | Standard Onboarding template linked | ✅ |
| 3 | Employee record created | ✅ |
| 4 | All onboarding activities generated | ✅ |
| 5 | All activities completed | ✅ |
| 6 | Boarding Status updated to Completed | ✅ |
| 7 | Employee User created | ✅ |
| 8 | Employee role assigned | ✅ |
| 9 | Employee login verified | ✅ |
| 10 | HRMS Self-Service Portal accessible | ✅ |

---

## Observations

- The Standard Onboarding template automatically generated all configured onboarding activities.
- Activity ownership followed the template configuration.
- Completing all activities automatically updated the onboarding progress.
- Employee and User records remained linked throughout the onboarding process.
- Meera Joshi successfully accessed the HRMS Employee Self-Service Portal after user creation.

---

## Result

✅ Successfully created Employee Onboarding for **Meera Joshi**.

✅ Linked the **Standard Onboarding** template.

✅ Generated and completed all onboarding activities.

✅ Boarding Status updated to **Completed**.

✅ Employee record successfully created and activated.

✅ User account linked with the Employee record.

✅ Verified successful login to the HRMS Employee Self-Service Portal.

The onboarding workflow is fully configured and validated for future employee onboarding.

---

## Dependencies

**Depends On:** Issue #18 – Employee Onboarding Template and Issue #6 – Employee User Creation.

---

## Next Steps

Proceed with subsequent HR lifecycle activities such as probation management, performance reviews, or payroll inclusion for newly onboarded employees.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #19 |
| Last Updated | 05-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 05-Aug-2026 | 1.0 | Shubham Patil | Executed complete employee onboarding workflow using the Standard Onboarding template, verified activity completion, employee activation, user creation, and HRMS self-service login. |