# Issue #25 - Salary Register Report & Payroll Cost Analysis

## Issue Details

| Item | Value |
|------|-------|
| **Issue ID** | #25 |
| **Title** | Salary Register Report & Payroll Cost Analysis |
| **Status** | ✅ Completed |
| **Company** | Meridian Traders Pvt Ltd (MTPL) |
| **Module** | Payroll |
| **Assigned To** | Shubham Patil |

---

# Goal

Generate a consolidated Salary Register report to review payroll costs across all employees while ensuring that company-wide payroll reports remain accessible only to authorized HR users.

---

# Environment

| Component | Version |
|----------|---------|
| ERPNext | v15.118.2 |
| Frappe Framework | v15.116.1 |
| Frappe HR | v15.63.2 |

---

# Prerequisites

- ✅ Issue #7 – Employee Self-Service Configuration
- ✅ Issue #16 – Payroll Entry & Salary Slip Generation

---

# Acceptance Criteria

- Salary Register report generated successfully.
- Report totals match the Salary Slips generated in Issue #16.
- Payroll data can be filtered by Department.
- Report is accessible only to HR Manager and HR User roles.
- Employee users cannot access company-wide payroll reports.

---

# Implementation

## Step 1 – Generate Salary Register Report

**Navigation**

```
HR → Reports → Salary Register
```

Generated the Salary Register for the payroll period created in Issue #16.

Configured the report using:

| Field | Value |
|------|-------|
| Company | Meridian Traders Pvt Ltd |
| Payroll Period | May 2026 |

Verified that the report contained payroll information for all six employees, including:

- Gross Pay
- Total Deductions
- Net Pay
- Department
- Salary Structure

The report was successfully exported to Excel for payroll review and record keeping.

**Screenshot**

![Salary Register Export](../images/issue-25/01-salary-register-export.png)

*Figure 1 – Salary Register exported to Excel.*

---

## Step 2 – Verify Department-wise Payroll

Applied the **Department** filter within the Salary Register report.

Verified that payroll information could be grouped and reviewed department-wise, allowing HR to analyze salary expenditure across organizational units.

The report accurately reflected payroll values generated during Issue #16.

**Screenshot**

![Department-wise Salary Register](../images/issue-25/02-department-wise-report.png)

*Figure 2 – Salary Register filtered by Department.*

---

## Step 3 – Permission Validation

Verified report accessibility for different user roles.

**HR Manager / HR User**

- Can generate Salary Register reports.
- Can export payroll data.
- Can filter reports by Department.

**Employee**

- Can view only personal Salary Slips through the HRMS Employee Self-Service portal.
- Cannot access the Salary Register or company-wide payroll reports.

This behavior is enforced through ERPNext Role Permissions and User Permissions.

---

# Verification

| Check | Status |
|-------|--------|
| Salary Register generated | ✅ |
| Payroll totals verified | ✅ |
| Report matches Salary Slips from Issue #16 | ✅ |
| Department filter verified | ✅ |
| Excel export successful | ✅ |
| HR Manager access verified | ✅ |
| HR User access verified | ✅ |
| Employee access restricted | ✅ |

---

# Observations

- Salary Register provides a consolidated payroll summary for all employees.
- Department filtering simplifies payroll cost analysis.
- Exporting the report to Excel supports payroll auditing and reporting requirements.
- Employee users remain restricted to viewing only their own Salary Slips through HRMS.

---

# Result

✅ Successfully generated the Salary Register for Meridian Traders Pvt Ltd.

✅ Verified payroll totals against Salary Slips generated in Issue #16.

✅ Confirmed Department-wise payroll filtering.

✅ Exported the Salary Register to Excel.

✅ Verified that company-wide payroll reports are accessible only to HR Manager and HR User roles.

---

# Dependencies

- Issue #7
- Issue #16

---

# Document Information

| Item | Value |
|------|-------|
| Repository | frappe-erpnext |
| Issue | #25 |
| Status | Completed |
| Author | Shubham Patil |

---

# Change Log

| Date | Version | Changes |
|------|---------|---------|
| 06-Aug-2026 | 1.0 | Generated Salary Register report, validated payroll totals, verified department-wise filtering, exported report to Excel, and confirmed role-based access restrictions. |