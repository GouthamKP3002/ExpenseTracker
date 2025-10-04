import { useEffect, useState } from 'react';
import { getSummary } from '../services/api';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ExpenseSummary({ filters, expenseCount }) {
  const [summary, setSummary] = useState({
    totalSpent: 0,
    byCategory: [],
    byMonth: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, [filters, expenseCount]);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const data = await getSummary(filters);
      setSummary(data);
    } catch (error) {
      console.error('Error loading summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-blue-700 to-blue-400 text-white p-6 rounded-t-lg">
          <h3 className="text-sm font-medium uppercase tracking-wide mb-2 opacity-90">Total Spent</h3>
          <p className="text-3xl md:text-4xl font-bold">
            ₹{summary.totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {summary.byCategory.length > 0 && (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">By Category</h3>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {summary.byCategory.map((item, index) => {
                const percentage = summary.totalSpent > 0 
                  ? ((item.total / summary.totalSpent) * 100).toFixed(1) 
                  : 0;
                
                return (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 text-sm md:text-base">{item.category}</span>
                        <span className="text-xs text-gray-500">({item.count})</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm md:text-base">
                        ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-800 h-2 rounded transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1.5">{percentage}% of total</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {summary.byMonth.length > 0 && (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">By Month</h3>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {summary.byMonth.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <span className="font-medium text-gray-900 text-sm md:text-base">
                      {MONTH_NAMES[item.month - 1]} {item.year}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">({item.count})</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {summary.byCategory.length === 0 && summary.byMonth.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <p>No expenses found. Add your first expense to see summary!</p>
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;