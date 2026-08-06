# Issue #5 - Employee Creation & Organization Structure

## Issue Details

- **Issue ID**: #5
- **Title**: Create Employees and Organization Structure
- **Status**: ✅ Completed
- **Assigned To**: Shubham Patil
- **Date Completed**: 31-Jul-2026

---

## Environment

- ERPNext v15
- HR Module
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Create a realistic organizational structure by adding employee records, assigning departments, designations, grades, employee groups, and reporting relationships.

---

## Prerequisites

- ✅ Issue #1 (Company Setup) completed
- ✅ Issue #2 (Departments & Designations) completed
- ✅ Issue #3 (Employee Grades & Employee Groups) completed
- ✅ Issue #4 (Holiday List & Leave Types) completed

---

## Acceptance Criteria

- Six employee records exist under Meridian Traders Pvt Ltd
- Employees are assigned to the correct Department, Designation, and Grade
- Employees belong to the appropriate Employee Group
- Three Software Engineers report to Engineering Manager Anjali Nair
- Organization Chart correctly reflects the reporting hierarchy

---

## Implementation

### Step 1: Create Employee Records

**Navigation:** HR → Employee

Created the following employee records with **Status = Active** and realistic joining dates.

| Employee | Department | Designation | Grade | Status |
|----------|------------|-------------|--------|--------|
| Priya Sharma | Human Resources - MTPL | HR Manager | Grade A - Leadership | Active |
| Rahul Verma | Human Resources - MTPL | HR Executive | Grade B - Senior | Active |
| Anjali Nair | Engineering - MTPL | Engineering Manager | Grade A - Leadership | Active |
| Karan Mehta | Engineering - MTPL | Software Engineer | Grade C - Associate | Active |
| Sneha Iyer | Engineering - MTPL | Software Engineer | Grade C - Associate | Active |
| Vikram Singh | Engineering - MTPL | Software Engineer | Grade C - Associate | Active |

ERPNext automatically generated employee IDs using the configured naming series (HR-EMP-xxxxx).

**Reference:** Figure 1

![Employee List](../images/issue-05/employee-list.png)

*Figure 1: Employee list showing all six active employees.*

---

### Step 2: Configure Employee Groups

**Navigation:** HR → Employee Group

Employee Group membership in this ERPNext instance is managed from the **Employee Group** document.

Assigned employees as follows:

| Employee Group | Members |
|---------------|---------|
| HR Team | Priya Sharma, Rahul Verma |
| Engineering Team | Anjali Nair, Karan Mehta, Sneha Iyer, Vikram Singh |

Saved both Employee Group records after updating the member list.

**Reference:** Figure 2

![Employee Groups](../images/issue-05/employee-groups.png)

*Figure 2: Employee Groups showing HR Team and Engineering Team members.*

---

### Step 3: Configure Reporting Structure

Configured the reporting hierarchy using the **Reports To** field.

| Employee | Reports To |
|----------|------------|
| Karan Mehta | Anjali Nair |
| Sneha Iyer | Anjali Nair |
| Vikram Singh | Anjali Nair |

Priya Sharma, Rahul Verma, and Anjali Nair were left without a reporting manager as required for this organizational structure.

---

### Step 4: Verify Organization Chart

**Navigation:** HR → Reports → Organization Chart

Verified that the reporting hierarchy correctly displays:

- Anjali Nair
  - Karan Mehta
  - Sneha Iyer
  - Vikram Singh

The HR employees appear independently because they do not report to Anjali Nair.

**Reference:** Figure 3

![Organization Chart](../images/issue-05/org-chart.png)

*Figure 3: Organization Chart showing Anjali Nair managing the three Software Engineers.*

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Six employee records created | ✅ |
| 2 | Departments assigned correctly | ✅ |
| 3 | Designations assigned correctly | ✅ |
| 4 | Employee Grades assigned correctly | ✅ |
| 5 | Employee Groups assigned correctly | ✅ |
| 6 | Three Software Engineers report to Anjali Nair | ✅ |
| 7 | Employee status set to Active | ✅ |
| 8 | Organization Chart reflects reporting hierarchy | ✅ |
| 9 | Configuration saved successfully | ✅ |

---

## Observations

- ERPNext automatically generated Employee IDs using the configured naming series.
- Employee Group membership was maintained through the **Employee Group** document instead of directly from the Employee form.
- The Organization Chart correctly visualized the reporting hierarchy after configuring the **Reports To** field.
- HR employees remained independent because no reporting manager was assigned to them.

---

## Result

✅ Six employee records created successfully.

✅ Departments, Designations, Grades, and Employee Groups assigned correctly.

✅ Reporting hierarchy configured successfully.

✅ Organization Chart accurately represents the company reporting structure.

The employee setup is complete and ready for user creation, leave allocation, attendance tracking, and payroll configuration.

---

## Dependencies

- **Depends On**: Issue #1, #2, #3, and #4

## Next Steps

Proceed to **Issue #6**.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #5 |
| Last Updated | 31-Jul-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 31-Jul-2026 | 1.0 | Shubham Patil | Initial documentation created |