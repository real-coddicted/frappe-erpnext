import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Send, 
  Edit3, 
  Lock, 
  AlertCircle, 
  CheckCircle, 
  Calculator, 
  Clock, 
  FileCheck, 
  XCircle,
  HelpCircle
} from 'lucide-react';
import { apiGet, apiPost } from '../api/client';

const Tax = () => {
  const [history, setHistory] = useState([]);
  const [payrollPeriods, setPayrollPeriods] = useState([]);
  const [exemptionCategories, setExemptionCategories] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [declarations, setDeclarations] = useState([{ exemption_category: '', amount: '' }]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [histRes, ppRes, catRes] = await Promise.all([
        apiGet('/method/hr_ess_api.api.tax.get_my_tax_declaration'),
        apiGet('/method/hr_ess_api.api.tax.get_payroll_periods'),
        apiGet('/method/hr_ess_api.api.tax.get_exemption_categories')
      ]);
      
      const histData = histRes.message || [];
      const periods = ppRes.message || [];
      const categories = catRes.message || [];

      setHistory(histData);
      setPayrollPeriods(periods);
      setExemptionCategories(categories);

      // Default to first open period if available and not currently editing
      if (periods.length > 0 && !editingId) {
        setSelectedPeriod(periods[0].name);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch tax declarations');
    } finally {
      setLoading(false);
    }
  }, [editingId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddRow = () => {
    setDeclarations(prev => [...prev, { exemption_category: '', amount: '' }]);
  };

  const handleRemoveRow = (index) => {
    if (declarations.length <= 1) {
      setDeclarations([{ exemption_category: '', amount: '' }]);
      return;
    }
    setDeclarations(prev => prev.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...declarations];
    updated[index][field] = value;
    setDeclarations(updated);
  };

  const handleEdit = async (declarationName) => {
    try {
      setError(null);
      setSuccess(null);
      
      // Fetch details from Frappe child table
      const res = await apiGet('/method/hr_ess_api.api.tax.get_tax_declaration_details', { name: declarationName });
      const details = res.message || [];
      
      const targetDoc = history.find(r => r.name === declarationName);
      if (targetDoc) {
        setSelectedPeriod(targetDoc.payroll_period);
      }
      
      if (details.length > 0) {
        setDeclarations(details.map(d => ({
          exemption_category: d.exemption_category,
          amount: d.amount
        })));
      } else {
        setDeclarations([{ exemption_category: '', amount: '' }]);
      }
      
      setEditingId(declarationName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to fetch declaration details for editing');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    if (payrollPeriods.length > 0) {
      setSelectedPeriod(payrollPeriods[0].name);
    }
    setDeclarations([{ exemption_category: '', amount: '' }]);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    setSuccess(null);

    // Filter valid rows
    const validDeclarations = declarations.filter(
      d => d.exemption_category && d.amount !== '' && parseFloat(d.amount) > 0
    );

    if (validDeclarations.length === 0) {
      setError('Please add at least one valid exemption category and amount greater than 0.');
      setSubmitLoading(false);
      return;
    }
    
    if (!selectedPeriod) {
      setError('Please select a payroll period.');
      setSubmitLoading(false);
      return;
    }

    try {
      if (editingId) {
        await apiPost('/method/hr_ess_api.api.tax.update_tax_declaration', {
          name: editingId,
          declarations: validDeclarations
        });
        setSuccess('Tax declaration updated successfully.');
      } else {
        await apiPost('/method/hr_ess_api.api.tax.submit_tax_declaration', {
          payroll_period: selectedPeriod,
          declarations: validDeclarations
        });
        setSuccess('Tax declaration submitted successfully.');
      }
      
      cancelEdit();
      await fetchData();
      
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError(err.message || 'Failed to submit declaration');
    } finally {
      setSubmitLoading(false);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Helper for Frappe DocStatus (0 = Draft, 1 = Submitted, 2 = Cancelled)
  const getDocStatusBadge = (docstatus) => {
    switch (docstatus) {
      case 0:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={12} className="text-amber-500" />
            Draft
          </span>
        );
      case 1:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileCheck size={12} className="text-emerald-500" />
            Submitted
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle size={12} className="text-rose-500" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const declaredTotal = declarations.reduce(
    (sum, dec) => sum + (parseFloat(dec.amount) || 0), 
    0
  );

  if (loading && history.length === 0) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#4f46e5] border-t-transparent"></div>
        <p className="text-xs font-medium text-slate-400">Loading tax declarations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tax Declaration</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Submit your projected investment declarations and exemption claims for tax computation.
          </p>
        </div>

        {selectedPeriod && (
          <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-[#4f46e5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>
            <span>Period: {selectedPeriod}</span>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-xs">Error</p>
            <p className="text-xs text-rose-600/90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          <p className="text-xs font-medium">{success}</p>
        </div>
      )}

      {/* Main 2-Column Split: Form (Left) & History (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Declaration' : 'New Declaration'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {editingId ? `Modifying: ${editingId}` : 'Add eligible exemptions for this payroll cycle'}
              </p>
            </div>
            {editingId && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                Edit Mode
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Payroll Period Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Payroll Period <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                disabled={!!editingId || payrollPeriods.length === 0}
                required
                className="h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] disabled:bg-slate-100 disabled:text-slate-500 transition-all cursor-pointer"
              >
                {payrollPeriods.length === 0 ? (
                  <option value="" disabled>No active payroll periods found</option>
                ) : (
                  <>
                    <option value="" disabled>Select Payroll Period</option>
                    {payrollPeriods.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {/* Dynamic Exemption Item Rows */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Exemption Categories ({declarations.length})
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Amounts in INR (₹)</span>
              </div>

              <div className="space-y-3">
                {declarations.map((row, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
                  >
                    {/* Category Dropdown */}
                    <div className="flex-1">
                      <select
                        value={row.exemption_category}
                        onChange={(e) => handleRowChange(idx, 'exemption_category', e.target.value)}
                        required
                        className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#4f46e5] transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select Category</option>
                        {exemptionCategories.map((cat) => (
                          <option key={cat.name} value={cat.name}>
                            {cat.name} {cat.max_amount ? `(Max: ₹${cat.max_amount})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Amount Input */}
                    <div className="w-full sm:w-40 relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        value={row.amount}
                        onChange={(e) => handleRowChange(idx, 'amount', e.target.value)}
                        required
                        className="w-full h-9 pl-6 pr-3 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-mono font-medium focus:outline-none focus:border-[#4f46e5] transition-all"
                      />
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors self-end sm:self-center"
                      title="Remove Row"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Row Button */}
              <button
                type="button"
                onClick={handleAddRow}
                className="mt-1 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <Plus size={14} />
                <span>Add Exemption Item</span>
              </button>
            </div>

            {/* Total Summary Strip */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Calculator size={16} className="text-[#4f46e5]" />
                <span>Total Declared</span>
              </div>
              <span className="font-mono text-sm font-bold text-[#4f46e5]">
                {formatCurrency(declaredTotal)}
              </span>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitLoading || payrollPeriods.length === 0}
                className="px-5 py-2 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                {submitLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={14} />
                    <span>{editingId ? 'Update Declaration' : 'Submit Declaration'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Declaration History */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Declaration History</h3>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {history.length} {history.length === 1 ? 'Record' : 'Records'}
            </span>
          </div>

          {history.length > 0 ? (
            <div className="space-y-3">
              {history.map((doc) => (
                <div
                  key={doc.name}
                  className="p-4 rounded-xl border border-slate-200/70 bg-white hover:border-slate-300 transition-all flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {doc.payroll_period}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {doc.name}
                      </p>
                    </div>
                    {getDocStatusBadge(doc.docstatus)}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Total Claimed</span>
                      <span className="font-mono font-bold text-slate-800">
                        {formatCurrency(doc.total_exemption_amount)}
                      </span>
                    </div>

                    {/* Edit button only if Frappe allows edit */}
                    {doc.can_edit ? (
                      <button
                        type="button"
                        onClick={() => handleEdit(doc.name)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold text-[#4f46e5] bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors flex items-center gap-1"
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Lock size={12} />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-2">
                <FileText size={22} />
              </div>
              <p className="text-xs font-semibold text-slate-700">No declarations filed</p>
              <p className="text-[11px] text-slate-400 max-w-xs mt-0.5">
                Declarations submitted for active payroll periods will appear here.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Tax;
