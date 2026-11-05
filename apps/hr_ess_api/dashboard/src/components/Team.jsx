import React, { useState, useEffect } from 'react';
import { Users, AlertCircle, Building2, Briefcase, Search } from 'lucide-react';
import { apiGet } from '../api/client';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet('/method/hr_ess_api.api.manager.get_my_team');
      setTeam(data.message || []);
    } catch (err) {
      setError(err.message || 'Failed to load team data');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeam = team.filter((emp) => {
    const q = searchTerm.toLowerCase();
    const name = (emp.employee_name || '').toLowerCase();
    const id = (emp.name || '').toLowerCase();
    const des = (emp.designation || '').toLowerCase();
    const dep = (emp.department || '').toLowerCase();
    return name.includes(q) || id.includes(q) || des.includes(q) || dep.includes(q);
  });

  if (loading) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#4f46e5] border-t-transparent"></div>
        <p className="text-xs font-medium text-slate-400">Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-semibold tracking-wide uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
            Management
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Team</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Directory of employees and team members reporting directly to you.
          </p>
        </div>

        <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
          <Users size={14} className="text-teal-600" />
          <span>{team.length} Direct Report{team.length === 1 ? '' : 's'}</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-xs">Error loading team</p>
            <p className="text-xs text-rose-600/90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Search Input (only shown if there are team members) */}
      {team.length > 0 && (
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ID, or designation..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all shadow-xs"
          />
        </div>
      )}

      {/* Team Content */}
      {team.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
            <Users size={28} />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No Direct Reports</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            You currently do not have any employees configured to report to you in Frappe HR.
          </p>
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-10 text-center flex flex-col items-center justify-center">
          <p className="text-sm font-semibold text-slate-700">No matching team members found</p>
          <p className="text-xs text-slate-400 mt-1">Try searching with a different name or role.</p>
        </div>
      ) : (
        /* Team Members Table / Cards Container */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Employee</th>
                  <th className="py-3 px-6">Designation</th>
                  <th className="py-3 px-6">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredTeam.map((emp) => (
                  <tr key={emp.name} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        {emp.image ? (
                          <img
                            src={emp.image}
                            alt={emp.employee_name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0">
                            {(emp.employee_name || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate">
                            {emp.employee_name}
                          </p>
                          <p className="font-mono text-[11px] text-slate-400">
                            {emp.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-6 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={13} className="text-slate-400 shrink-0" />
                        <span>{emp.designation || '—'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-6 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={13} className="text-slate-400 shrink-0" />
                        <span>{emp.department || '—'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Team;
