# Issue #11 - Salary Structure Assignment

## Issue Details

* **Issue ID**: #11
* **Title**: Assign Salary Structures to Employees
* **Status**: ✅ Completed
* **Assigned To**: Shubham Patil
* **Date Completed**: 03-Aug-2026

---

## Environment

* ERPNext v15
* Frappe Framework v15
* HR & Payroll Module
* Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Assign Salary Structures to employees according to their Employee Grade and prepare the payroll configuration for salary processing.

---

## Prerequisites

* ✅ Issue #3 – Employee Grades & Employee Groups
* ✅ Issue #10 – Salary Structure(s)

---

## Acceptance Criteria

* At least two employees assigned to Salary Structures.
* Rahul Verma assigned to the Grade A Structure (Grade B reuses Grade A Structure).
* Salary Structure Assignments are submitted.
* Effective date set to **01-Apr-2026**.

---

# Implementation

## Step 1: Open Salary Structure Assignment

**Navigation:** HR → Payroll → Salary Structure Assignment

Opened the Salary Structure Assignment list and created new assignment records for employees.

---

## Step 2: Assign Grade A Structure

Created Salary Structure Assignments for employees belonging to Grade A and Grade B tiers.

### Grade A Employees

| Employee | Employee Grade | Salary Structure | Base Amount |
|----------|----------------|------------------|------------:|
| Priya Sharma | Grade A | Grade A Structure | ₹55,000 |
| Anjali Nair | Grade A | Grade A Structure | ₹55,000 |

### Grade B Employee

| Employee | Employee Grade | Salary Structure | Base Amount |
|----------|----------------|------------------|------------:|
| Rahul Verma | Grade B | Grade A Structure | ₹45,000 |

**Effective From:** 01-Apr-2026

All assignments were saved and submitted successfully.

**Reference:** Figure 1

![Grade A Assignment](../images/issue-11/grade-a-assignment.png)

*Figure 1: Grade A Structure assigned to Grade A and Grade B employees.*

---

## Step 3: Assign Grade C Structure

Created Salary Structure Assignments for Grade C employees.

| Employee | Employee Grade | Salary Structure | Base Amount |
|----------|----------------|------------------|------------:|
| Karan Mehta | Grade C | Grade C Structure | ₹27,500 |
| Sneha Iyer | Grade C | Grade C Structure | ₹27,500 |
| Vikram Singh | Grade C | Grade C Structure | ₹27,500 |

**Effective From:** 01-Apr-2026

All assignments were saved and submitted successfully.

**Reference:** Figure 2

![Grade C Assignment](../images/issue-11/grade-c-assignment.png)

*Figure 2: Grade C Structure assigned to Grade C employees.*

---

## Step 4: Verify Salary Structure Assignments

Verified that all Salary Structure Assignment records were successfully created and submitted.

Confirmed:

* Correct Employee selected.
* Correct Salary Structure assigned.
* Effective date set to **01-Apr-2026**.
* Assignment status is **Submitted**.

**Reference:** Figure 3

![Salary Assignment List](../images/issue-11/salary-assignment-list.png)

*Figure 3: Salary Structure Assignment list showing all submitted records.*

---

## Verification

| # | Check | Status |
|---|---------------------------------------------|:------:|
| 1 | Salary Structure Assignments created | ✅ |
| 2 | Grade A employees assigned correctly | ✅ |
| 3 | Grade B employee assigned to Grade A Structure | ✅ |
| 4 | Grade C employees assigned correctly | ✅ |
| 5 | Effective Date set to 01-Apr-2026 | ✅ |
| 6 | Assignment records submitted | ✅ |
| 7 | Payroll configuration ready | ✅ |

---

## Grade Mapping

| Employee Grade | Salary Structure |
|---------------|------------------|
| Grade A | Grade A Structure |
| Grade B | Grade A Structure *(reused as per project requirement)* |
| Grade C | Grade C Structure |

---

## Observations

* Salary Structure Assignments link Employees with their payroll configuration.
* Grade B employees reuse the Grade A Structure as specified in the project requirements.
* Assignments remain effective from **01-Apr-2026**, aligning with the current fiscal year.
* Submitted Salary Structure Assignments are now available for payroll processing.

---

## Result

✅ Salary Structures successfully assigned to employees.

✅ Grade A and Grade B employees assigned to **Grade A Structure**.

✅ Grade C employees assigned to **Grade C Structure**.

✅ All Salary Structure Assignments submitted successfully.

✅ Payroll setup is ready for the next phase of payroll processing.

---

## Dependencies

* **Depends On:** Issue #3 and Issue #10.

---

## Next Steps

Proceed to **Issue #12**.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #11 |
| Last Updated | 03-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 03-Aug-2026 | 1.0 | Shubham Patil | Created Salary Structure Assignment records for Grade A, Grade B, and Grade C employees and verified successful submission. |