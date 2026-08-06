# Issue #3 - Employee Grades & Employee Groups

## Issue Details

- **Issue ID**: #3
- **Title**: Create Employee Grades and Employee Groups
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

Configure employee grading and grouping structures required for employee assignment, salary planning, and reporting in ERPNext.

---

## Prerequisites

- ✅ Issue #1 (Company Setup) completed
- ✅ Issue #2 (Departments & Designations) completed

---

## Acceptance Criteria

- Employee Grades:
  - Grade A - Leadership exists
  - Grade B - Senior exists
  - Grade C - Associate exists

- Employee Groups:
  - Engineering Team exists
  - HR Team exists

---

## Implementation

### Step 1: Create Employee Grades

**Navigation:** HR → Employee Grade

The ERPNext instance did not contain the required employee grades, so the following grades were created:

| Grade Name | Status |
|------------|--------|
| Grade A - Leadership | ✅ Created |
| Grade B - Senior | ✅ Created |
| Grade C - Associate | ✅ Created |

Employee Grade records only required the **Grade Name** field. Optional fields such as salary structure configuration were left empty because they are not required for this setup.

**Reference:** Figure 1

![Employee Grades List](../images/issue-03/grades-list.png)

*Figure 1: Employee Grade list showing Grade A - Leadership, Grade B - Senior, and Grade C - Associate*

---

### Step 2: Create Employee Groups

**Navigation:** HR → Employee Group

The ERPNext instance did not contain the required employee groups, so the following groups were created:

| Group Name | Status |
|------------|--------|
| Engineering Team | ✅ Created |
| HR Team | ✅ Created |

Employee Group records only required the **Group Name** field.

Employees were not assigned to groups at this stage because employee creation and assignment will be handled in a later issue.

**Reference:** Figure 2

![Employee Groups List](../images/issue-03/groups-list.png)

*Figure 2: Employee Group list showing Engineering Team and HR Team*

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Grade A - Leadership exists | ✅ |
| 2 | Grade B - Senior exists | ✅ |
| 3 | Grade C - Associate exists | ✅ |
| 4 | Engineering Team exists | ✅ |
| 5 | HR Team exists | ✅ |
| 6 | Configuration saved successfully | ✅ |

---

## Observations

- Employee Grade records require only the grade name for basic configuration.
- Additional salary-related fields can be configured later during payroll setup.
- Employee Groups are created as master data and employee assignment can be performed during employee onboarding.
- No duplicate records were created.

---

## Result

✅ Employee Grades **Grade A - Leadership**, **Grade B - Senior**, and **Grade C - Associate** created successfully.

✅ Employee Groups **Engineering Team** and **HR Team** created successfully.

✅ Employee master configuration prerequisites are completed.

The system is ready for employee onboarding.

---

## Dependencies

- **Depends On**:
  - Issue #1 (Company Setup)
  - Issue #2 (Departments & Designations)

---

## Next Steps

Proceed to **Issue #4 - Holiday List and Leave Types**

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #3 |
| Last Updated | 31-Jul-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 31-Jul-2026 | 1.0 | Shubham Patil | Initial documentation created |