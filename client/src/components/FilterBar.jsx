import { useState } from 'react';

const CATEGORIES = ['All', 'Food', 'Travel', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'];

function FilterBar({ onFilterChange }) {
  const currentYear = new Date().getFullYear();
  const [filters, setFilters] = useState({
    category: 'All',
    startDate: '',
    endDate: '',
    month: '',
    year: currentYear.toString()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'All',
      startDate: '',
      endDate: '',
      month: '',
      year: currentYear.toString()
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input-field"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Month */}
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
            Month
          </label>
          <select
            id="month"
            name="month"
            value={filters.month}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleChange}
            className="input-field"
          >
            {[...Array(5)].map((_, i) => {
              const year = currentYear - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button onClick={handleReset} className="btn-secondary text-sm">
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default FilterBar;