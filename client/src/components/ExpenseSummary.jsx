import { useEffect, useState } from 'react';
import { getSummary } from '../services/api';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ExpenseSummary({ filters }) {
  const [summary, setSummary] = useState({
    totalSpent: 0,
    byCategory: [],
    byMonth: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, [filters]);

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
      <div className="card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total Spent Card */}
      <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <h3 className="text-lg font-medium mb-2 opacity-90">Total Spent</h3>
        <p className="text-4xl font-bold">₹{summary.totalSpent.toFixed(2)}</p>
      </div>

      {/* By Category */}
      {summary.byCategory.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">By Category</h3>
          <div className="space-y-3">
            {summary.byCategory.map((item, index) => {
              const percentage = summary.totalSpent > 0 
                ? ((item.total / summary.totalSpent) * 100).toFixed(1) 
                : 0;
              
              return (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{item.category}</span>
                      <span className="text-sm text-gray-500">({item.count} expenses)</span>
                    </div>
                    <span className="font-semibold text-gray-900">₹{item.total.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{percentage}% of total</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* By Month */}
      {summary.byMonth.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">By Month</h3>
          <div className="space-y-3">
            {summary.byMonth.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3 last:border-b-0">
                <div>
                  <span className="font-medium text-gray-800">
                    {MONTH_NAMES[item.month - 1]} {item.year}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">({item.count} expenses)</span>
                </div>
                <span className="font-semibold text-gray-900">₹{item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {summary.byCategory.length === 0 && summary.byMonth.length === 0 && (
        <div className="card text-center text-gray-500 py-8">
          <p>No expenses found. Add your first expense to see summary!</p>
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;