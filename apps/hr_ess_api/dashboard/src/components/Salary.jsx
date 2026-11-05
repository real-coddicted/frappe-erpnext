import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { apiGet } from '../api/client';
import {
  DollarSign,
  Calendar,
  Download,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  FileText,
  Lock,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Printer,
  BadgeCheck,
  Building,
  CreditCard,
  Percent,
  HelpCircle,
  Info
} from 'lucide-react';

export default function Salary() {
  const currentCalDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentCalDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentCalDate.getFullYear());
  
  const [loading, setLoading] = useState(true);
  const [activeSlipInfo, setActiveSlipInfo] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  
  const [showItemized, setShowItemized] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [toastNotification, setToastNotification] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [slipRes, histRes] = await Promise.all([
        apiGet('/method/hr_ess_api.api.salary.get_salary_slip_for_month', { month: selectedMonth, year: selectedYear }),
        apiGet('/method/hr_ess_api.api.salary.get_my_salary_slips')
      ]);
      
      setActiveSlipInfo(slipRes.message);
      setHistoryList(histRes.message || []);
    } catch (err) {
      console.error(err);
      setActiveSlipInfo(null);
      setToastNotification({
        title: 'Error Loading Salary',
        desc: err.message || 'Failed to fetch salary data.',
        isError: true
      });
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const onYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const selectQuickMonth = (m) => {
    setSelectedMonth(m);
  };

  // Currency formatter
  const formatCurrency = (val, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 2
    }).format(val || 0);
  };

  const getDownloadUrl = (slipName) => {
    return `/api/method/frappe.utils.print_format.download_pdf?doctype=Salary+Slip&name=${encodeURIComponent(slipName)}&format=Salary+Slip`;
  };

  // PDF Download Trigger
  const triggerPdfDownload = (slipId, monthTitle) => {
    setDownloadingId(slipId);
    setTimeout(() => {
      setDownloadingId(null);
      window.open(getDownloadUrl(slipId), '_blank');
      setToastNotification({
        title: 'Payslip Downloaded',
        desc: `${monthTitle || 'Salary Slip'} PDF downloaded.`
      });
      setTimeout(() => setToastNotification(null), 4000);
    }, 800);
  };

  // Filtered History
  const filteredHistory = useMemo(() => {
    if (!searchFilter.trim()) return historyList;
    const q = searchFilter.toLowerCase();
    return historyList.filter(
      item => 
        (item.name && item.name.toLowerCase().includes(q)) || 
        (item.start_date && item.start_date.toLowerCase().includes(q))
    );
  }, [searchFilter, historyList]);

  // Proportions for visual progress breakdown
  const proportions = useMemo(() => {
    if (!activeSlipInfo || !activeSlipInfo.slip || !activeSlipInfo.slip.gross_pay) {
      return { netPercent: 82, dedPercent: 18 };
    }
    const slip = activeSlipInfo.slip;
    const netP = Math.round((slip.net_pay / slip.gross_pay) * 100);
    const dedP = 100 - netP;
    return { netPercent: netP, dedPercent: dedP };
  }, [activeSlipInfo]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const activeSlip = activeSlipInfo?.available ? activeSlipInfo.slip : null;
  const earnings = activeSlipInfo?.earnings || [];
  const deductions = activeSlipInfo?.deductions || [];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 font-sans antialiased p-4 sm:p-6 lg:p-8">
      {/* Toast Alert */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-4 py-3.5 shadow-2xl border border-slate-800 animate-in slide-in-from-bottom-5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${toastNotification.isError ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {toastNotification.isError ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          </div>
          <div>
            <div className="text-xs font-bold text-white">{toastNotification.title}</div>
            <div className="text-[11px] text-slate-400">{toastNotification.desc}</div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-7">
        {/* Top Hero Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-indigo-700 mb-2">
              <Sparkles size={13} className="text-indigo-600" />
              <span>Payroll & Compensation Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Salary & Payslips
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Access certified compensation records, income tax deductions, and stamped statements.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200/60">
              <Clock size={13} className="text-[#4f46e5]" />
              <span>FY Cycle</span>
            </span>

            {activeSlip && (
              <button
                onClick={() => triggerPdfDownload(activeSlip.name, monthNames[selectedMonth - 1])}
                disabled={downloadingId === activeSlip.name}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4f46e5] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#4338ca] active:scale-95 transition-all disabled:opacity-50"
              >
                {downloadingId === activeSlip.name ? (
                  <>
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>Download Stamped PDF</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Filter Toolbar: Year/Month Selectors & Quick-Pills */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Period:
            </span>

            {/* Month Select */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={onMonthChange}
                className="appearance-none rounded-xl bg-slate-50 border border-slate-200/80 pl-3.5 pr-8 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition cursor-pointer"
              >
                {monthNames.map((name, i) => (
                  <option key={i + 1} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Year Select */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={onYearChange}
                className="appearance-none rounded-xl bg-slate-50 border border-slate-200/80 pl-3.5 pr-8 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition cursor-pointer"
              >
                {[...Array(5)].map((_, i) => {
                  const y = currentCalDate.getFullYear() - i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Quick Month Navigation Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] text-slate-400 font-medium mr-1 hidden lg:inline">Recent:</span>
            {[
              { m: currentCalDate.getMonth() + 1, label: monthNames[currentCalDate.getMonth()].slice(0, 3) },
              { m: currentCalDate.getMonth() || 12, label: monthNames[(currentCalDate.getMonth() + 11) % 12].slice(0, 3) },
              { m: (currentCalDate.getMonth() - 1) || 12, label: monthNames[(currentCalDate.getMonth() + 10) % 12].slice(0, 3) }
            ].map((chip) => (
              <button
                key={chip.m}
                onClick={() => selectQuickMonth(chip.m)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedMonth === chip.m
                    ? 'bg-[#4f46e5] text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="rounded-2xl bg-white p-12 border border-slate-200/80 text-center flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#4f46e5] border-t-transparent" />
            <p className="text-xs font-semibold text-slate-500">Loading salary slip...</p>
          </div>
        ) : activeSlip ? (
          <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200">
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-400" />

            <div className="p-6 sm:p-8 space-y-6">
              {/* Slip Metadata Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#4f46e5] border border-indigo-100/60 shadow-xs">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{monthNames[selectedMonth - 1]} {selectedYear}</h2>
                      <span className="font-mono text-xs text-slate-400">#{activeSlip.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activeSlip.bank_account_no ? `Direct Deposit to ${activeSlip.bank_account_no}` : 'Direct Deposit'} 
                      {activeSlip.pan_number ? ` · Tax ID: ${activeSlip.pan_number.substring(0, 5)}***` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/80">
                    <CheckCircle size={14} className="text-emerald-600" />
                    <span>{activeSlip.status === 'Submitted' ? 'Disbursed' : activeSlip.status || 'Processed'}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200/60">
                    <BadgeCheck size={14} className="text-indigo-600" />
                    <span>Verified Audit</span>
                  </div>
                </div>
              </div>

              {/* Net Take-Home Hero Block */}
              <div className="bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/30 rounded-2xl p-6 border border-indigo-100/70 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    Net Take-Home Pay
                  </span>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
                      {formatCurrency(activeSlip.net_pay, activeSlip.currency)}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      100% Credited
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Processed and cleared for {activeSlip.end_date}
                  </p>
                </div>

                {/* KPI Pill Trio */}
                <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                  <div className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs min-w-[105px]">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Gross Pay
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-900 font-mono">
                      {formatCurrency(activeSlip.gross_pay, activeSlip.currency)}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs min-w-[105px]">
                    <div className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">
                      Deductions
                    </div>
                    <div className="mt-1 text-sm font-bold text-rose-600 font-mono">
                      -{formatCurrency(activeSlip.total_deduction, activeSlip.currency)}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs min-w-[105px]">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Days Paid
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-800 font-mono">
                      {activeSlip.payment_days} Days
                    </div>
                  </div>
                </div>
              </div>

              {/* Proportional Income & Deductions Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-indigo-700">
                    <span className="h-2 w-2 rounded-full bg-[#4f46e5]" />
                    <span>Net Credited Earnings ({proportions.netPercent}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-600">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    <span>Statutory & Tax Deductions ({proportions.dedPercent}%)</span>
                  </div>
                </div>

                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <div
                    className="h-full bg-[#4f46e5] rounded-l-full transition-all duration-700 ease-out"
                    style={{ width: `${proportions.netPercent}%` }}
                    title={`Net Pay: ${proportions.netPercent}%`}
                  />
                  <div
                    className="h-full bg-rose-400 rounded-r-full transition-all duration-700 ease-out"
                    style={{ width: `${proportions.dedPercent}%` }}
                    title={`Deductions: ${proportions.dedPercent}%`}
                  />
                </div>
              </div>

              {/* Itemized Accordion Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowItemized(prev => !prev)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-xs font-semibold text-slate-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-[#4f46e5]" />
                    <span>
                      {showItemized ? 'Hide Itemized Breakdown' : 'View Itemized Earnings & Deductions Breakdown'}
                    </span>
                  </div>
                  {showItemized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showItemized && (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                    {/* Left: Earnings Table */}
                    <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Earnings Breakdown
                        </span>
                        <span className="text-xs font-bold font-mono text-emerald-600">
                          +{formatCurrency(activeSlip.gross_pay, activeSlip.currency)}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        {earnings.map((e, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                            <div>
                              <div className="font-semibold text-slate-800">{e.salary_component}</div>
                              <span className="text-[10px] text-slate-400">Earning</span>
                            </div>
                            <span className="font-mono font-semibold text-slate-900">
                              {formatCurrency(e.amount, activeSlip.currency)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Deductions Table */}
                    <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Deductions & Retentions
                        </span>
                        <span className="text-xs font-bold font-mono text-rose-600">
                          -{formatCurrency(activeSlip.total_deduction, activeSlip.currency)}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        {deductions.map((d, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                            <div>
                              <div className="font-semibold text-slate-800">{d.salary_component}</div>
                              <span className="text-[10px] text-slate-400">Deduction</span>
                            </div>
                            <span className="font-mono font-semibold text-rose-600">
                              -{formatCurrency(d.amount, activeSlip.currency)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Slip Card Footer */}
            <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <button
                onClick={() => triggerPdfDownload(activeSlip.name, monthNames[selectedMonth - 1])}
                className="inline-flex items-center gap-1.5 font-semibold text-[#4f46e5] hover:text-[#4338ca] transition self-start sm:self-auto"
              >
                <span>Save Local Copy</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          /* Empty State for selected month */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-[#4f46e5] mb-3">
              <Calendar size={26} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">No Payslip Available</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              {activeSlipInfo ? activeSlipInfo.message : 'No salary slip was found for the selected period.'}
            </p>
          </div>
        )}

        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Historical Disbursal Archive</h2>
              <p className="text-xs text-slate-500">
                Verified stubs and statements from past payroll cycles.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search past months, voucher ID..."
                className="w-full rounded-xl bg-white border border-slate-200/80 py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredHistory.map((slip) => {
              const d = new Date(slip.start_date);
              const formattedMonth = d.toLocaleString('default', { month: 'long', year: 'numeric' });
              
              return (
                <div
                  key={slip.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-xs border border-slate-200/80 hover:border-indigo-200 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-[#4f46e5]">
                      <FileText size={20} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{formattedMonth}</h4>
                        <span className="text-[11px] font-mono text-slate-400">#{slip.name}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-100">
                          {slip.status === 'Submitted' ? 'Disbursed' : slip.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>{slip.start_date} to {slip.end_date}</span>
                        {slip.gross_pay && (
                          <>
                            <span>·</span>
                            <span className="text-slate-400">Gross: {formatCurrency(slip.gross_pay, slip.currency)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        Net Disbursed
                      </div>
                      <div className="text-base font-bold text-slate-900 font-mono">
                        {formatCurrency(slip.net_pay, slip.currency)}
                      </div>
                    </div>

                    <button
                      onClick={() => triggerPdfDownload(slip.name, formattedMonth)}
                      disabled={downloadingId === slip.name}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 active:scale-95 transition"
                    >
                      {downloadingId === slip.name ? (
                        <div className="h-3.5 w-3.5 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredHistory.length === 0 && (
              <div className="rounded-xl bg-white p-8 border border-slate-200 text-center text-xs text-slate-400">
                No past vouchers matching "{searchFilter}".
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-indigo-50/60 border border-indigo-100 p-5 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <Lock size={18} />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-900">
              Salary Slip Downloads
            </h4>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              Download your salary slip as a PDF. It contains personal and salary details, so keep the file safe.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
