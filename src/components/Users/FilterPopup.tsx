import React, { useState, useEffect } from 'react';
import type { UserFilterParams } from '../../types/user.types';


interface FilterPopupProps {
  filters: UserFilterParams;
  onApply: (filters: UserFilterParams) => void;
  onReset: () => void;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ filters, onApply, onReset, onClose }) => {
  const [formData, setFormData] = useState<UserFilterParams>(filters);
const [openSelect, setOpenSelect] = useState<"organization" | "status" | null>(null);


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleChange = (field: keyof UserFilterParams, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formData);
  };

  const handleReset = () => {
    setFormData({});
    onReset();
  };

  return (
      <div className="filter-popup" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="organization">Organization</label>
           <div className={`select-wrap ${openSelect === "organization" ? "is-open" : ""}`}>
  <select
    id="organization"
    value={formData.organization || ""}
    onMouseDown={() => setOpenSelect("organization")} // ✅ better than onFocus
    onBlur={() => setOpenSelect(null)}
    onChange={(e) => {
      handleChange("organization", e.target.value);
      setOpenSelect(null);
    }}
  >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
              <option value="Lendstar">Lendstar</option>
            </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="User"
              value={formData.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={formData.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
           <div className={`select-wrap ${openSelect === "status" ? "is-open" : ""}`}>
  <select
    id="status"
    value={formData.status || ""}
    onMouseDown={() => setOpenSelect("status")} // ✅ better than onFocus
    onBlur={() => setOpenSelect(null)}
    onChange={(e) => {
      handleChange("status", e.target.value as any);
      setOpenSelect(null);
    }}
  >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="reset-button" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="filter-button">
              Filter
            </button>
          </div>
        </form>
      </div>
  );
};

export default FilterPopup;