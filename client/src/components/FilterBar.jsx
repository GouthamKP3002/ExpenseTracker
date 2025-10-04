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
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border-b-2 border-gray-500">
      <div className="p-5 shadow border-b-2 border-gray-500">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Filters</h3>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>


          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>


          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1.5">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>


          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1.5">
              Month
            </label>
            <select
              id="month"
              name="month"
              value={filters.month}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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


          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1.5">
              Year
            </label>
            <select
              id="year"
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[...Array(5)].map((_, i) => {
                const year = currentYear - i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={handleReset} 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;