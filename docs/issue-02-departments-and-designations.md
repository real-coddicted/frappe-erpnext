# Issue #2 - Departments & Designations

## Issue Details

- **Issue ID**: #2
- **Title**: Create Departments and Designations
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

Configure organizational departments and employee designations required for employee management in ERPNext.

---

## Prerequisites

- ✅ Issue #1 (Company Setup) completed
- Company **Meridian Traders Pvt Ltd (MTPL)** exists

---

## Acceptance Criteria

- Department **Human Resources - MTPL** exists
- Department **Engineering - MTPL** exists
- Both departments belong to Meridian Traders Pvt Ltd
- Designations **HR Manager**, **HR Executive**, **Engineering Manager**, and **Software Engineer** exist

---

## Implementation

### Step 1: Create Departments

**Navigation:** HR → Department

The ERPNext instance already contained several default departments.

**Verified Existing Department:**

- ✅ Human Resources - MTPL

**Created Missing Department:**

| Field | Value |
|-------|-------|
| Department Name | Engineering |
| Parent Department | All Departments |
| Company | Meridian Traders Pvt Ltd |
| Is Group | Unchecked |
| Disabled | Unchecked |

After saving, ERPNext displayed the department as:

**Engineering - MTPL**

**Reference:** Figure 1

![Departments List](../images/issue-02/departments-list.png)

*Figure 1: Department list showing Human Resources - MTPL and Engineering - MTPL*

---

### Step 2: Create Designations

**Navigation:** HR → Designation

The ERPNext instance already contained some default designations.

**Verified Existing Designation:**

- ✅ HR Manager

**Created Missing Designations:**

| Designation Name | Status |
|------------------|--------|
| HR Executive | ✅ Created |
| Engineering Manager | ✅ Created |
| Software Engineer | ✅ Created |

No Appraisal Template was assigned because it is optional and not required for this configuration.

**Reference:** Figure 2

![Designations List](../images/issue-02/designations-list.png)

*Figure 2: Designation list showing HR Manager, HR Executive, Engineering Manager, and Software Engineer*

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Human Resources - MTPL exists | ✅ |
| 2 | Engineering - MTPL exists | ✅ |
| 3 | Departments linked with Meridian Traders Pvt Ltd | ✅ |
| 4 | HR Manager exists | ✅ |
| 5 | HR Executive exists | ✅ |
| 6 | Engineering Manager exists | ✅ |
| 7 | Software Engineer exists | ✅ |
| 8 | Configuration saved successfully | ✅ |

---

## Observations

- ERPNext instance already contained some default departments and designations.
- Human Resources - MTPL and HR Manager were already available and only required verification.
- Department names automatically received the company abbreviation suffix (MTPL) when linked with the company.
- Only missing records were created to avoid duplicate configuration.

---

## Result

✅ Departments **Human Resources - MTPL** and **Engineering - MTPL** configured successfully.

✅ Designations **HR Manager**, **HR Executive**, **Engineering Manager**, and **Software Engineer** configured successfully.

✅ Organization structure is ready for employee creation.

---

## Dependencies

- **Depends On**: Issue #1 (Company Setup)

## Next Steps

Proceed to **Issue #3 - Employee Grades and Employee Groups**

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #2 |
| Last Updated | 31-Jul-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 31-Jul-2026 | 1.0 | Shubham Patil | Initial documentation created |