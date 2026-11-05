import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Lock, 
  Edit3, 
  Save, 
  X, 
  Heart, 
  AlertCircle, 
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { apiGet, apiPost } from '../api/client';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    cell_number: '',
    personal_email: '',
    current_address: '',
    emergency_contact_name: '',
    emergency_phone_number: ''
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet('/method/hr_ess_api.api.profile.get_my_profile');
      const data = res.message || {};
      
      setProfile(data);
      setFormData({
        cell_number: data.cell_number || '',
        personal_email: data.personal_email || '',
        current_address: data.current_address || '',
        emergency_contact_name: data.emergency_contact_name || '',
        emergency_phone_number: data.emergency_phone_number || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch profile details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    if (profile) {
      setFormData({
        cell_number: profile.cell_number || '',
        personal_email: profile.personal_email || '',
        current_address: profile.current_address || '',
        emergency_contact_name: profile.emergency_contact_name || '',
        emergency_phone_number: profile.emergency_phone_number || ''
      });
    }
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      await apiPost('/method/hr_ess_api.api.profile.update_my_profile', formData);
      
      setProfile(prev => ({
        ...prev,
        ...formData
      }));
      
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    } catch (err) {
      setError(err.message || 'Failed to update personal information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#4f46e5] border-t-transparent"></div>
        <p className="text-xs font-medium text-slate-400">Loading profile...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // Calculate real tenure from Date of Joining
  let tenureString = '';
  if (profile?.date_of_joining) {
    const start = new Date(profile.date_of_joining);
    const now = new Date();
    const diffTime = Math.max(0, now - start);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (diffYears > 0) tenureString += `${diffYears} yr${diffYears > 1 ? 's' : ''} `;
    if (diffMonths > 0 || diffYears === 0) tenureString += `${diffMonths} mo${diffMonths > 1 ? 's' : ''}`;
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      
      {/* Top Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {profile?.image ? (
              <img 
                src={profile.image} 
                alt={profile.employee_name} 
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs" 
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4f46e5] text-xl font-bold">
                {(profile?.employee_name || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {profile?.employee_name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {profile?.designation || 'Employee'} {profile?.department ? `• ${profile.department}` : ''}
              </p>
              <p className="text-[11px] font-mono text-slate-400 mt-1">
                ID: {profile?.employee}
              </p>
            </div>
          </div>

          {tenureString && (
            <div className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-right">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Tenure</span>
              <span className="text-xs font-bold text-slate-700">{tenureString}</span>
            </div>
          )}
        </div>
      </div>

      {/* Error alert inside page */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid: Organization Info (Read-only) & Personal Info (Editable) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Card 1: Official HR Details (Read-only) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#4f46e5]" />
              <h2 className="text-sm font-bold text-slate-900">Employment Details</h2>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Lock size={12} />
              HR Managed
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Employee ID</span>
              <span className="font-mono font-semibold text-slate-800">{profile?.employee}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Department</span>
              <span className="font-medium text-slate-800">{profile?.department || 'Not Assigned'}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Designation</span>
              <span className="font-medium text-slate-800">{profile?.designation || 'Not Assigned'}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Date of Joining</span>
              <span className="font-mono font-medium text-slate-800">{profile?.date_of_joining || 'N/A'}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Reporting Manager</span>
              <span className="font-medium text-slate-800">
                {profile?.reports_to_name || profile?.reports_to || 'None'}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Work Location</span>
              <span className="font-medium text-slate-800">{profile?.work_location || 'Not Specified'}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Company Email</span>
              <span className="font-mono text-slate-800">{profile?.company_email || 'Not Assigned'}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Personal Contact Information (Editable) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#4f46e5]" />
              <h2 className="text-sm font-bold text-slate-900">Personal Information</h2>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 rounded-lg text-xs font-semibold text-[#4f46e5] bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>
            )}
          </div>

          {!isEditing ? (
            /* View Mode */
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Personal Phone</span>
                <span className="font-mono font-medium text-slate-800">
                  {profile?.cell_number || 'Not Provided'}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Personal Email</span>
                <span className="font-medium text-slate-800">
                  {profile?.personal_email || 'Not Provided'}
                </span>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <span className="text-slate-500 shrink-0">Current Address</span>
                <span className="text-right text-slate-800 leading-relaxed max-w-xs">
                  {profile?.current_address || 'Not Provided'}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Emergency Contact</span>
                <span className="font-medium text-slate-800">
                  {profile?.emergency_contact_name || 'Not Provided'}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Emergency Phone</span>
                <span className="font-mono font-medium text-slate-800">
                  {profile?.emergency_phone_number || 'Not Provided'}
                </span>
              </div>
            </div>
          ) : (
            /* Edit Mode Form */
            <form onSubmit={handleSave} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-700">Personal Phone</label>
                <input
                  type="tel"
                  name="cell_number"
                  value={formData.cell_number}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9876543210"
                  className="h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#4f46e5] transition-all font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-700">Personal Email</label>
                <input
                  type="email"
                  name="personal_email"
                  value={formData.personal_email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#4f46e5] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-700">Current Address</label>
                <textarea
                  name="current_address"
                  rows="2"
                  value={formData.current_address}
                  onChange={handleInputChange}
                  placeholder="Apartment, Street, City, State..."
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#4f46e5] transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-700">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={handleInputChange}
                    placeholder="Name / Relationship"
                    className="h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#4f46e5] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-700">Emergency Phone</label>
                  <input
                    type="tel"
                    name="emergency_phone_number"
                    value={formData.emergency_phone_number}
                    onChange={handleInputChange}
                    placeholder="+91..."
                    className="h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#4f46e5] transition-all font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  {saving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={13} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Floating Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle size={16} className="text-emerald-400 shrink-0" />
          <span>Profile updated successfully</span>
        </div>
      )}

    </div>
  );
};

export default Profile;
