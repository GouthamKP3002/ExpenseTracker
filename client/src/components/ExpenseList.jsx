import { useState } from 'react';

const CATEGORY_COLORS = {
  Food: 'bg-gray-200 text-orange-700 border-orange-200',
  Travel: 'bg-gray-200 text-blue-700 border-blue-200',
  Bills: 'bg-gray-200 text-red-700 border-red-200',
  Entertainment: 'bg-gray-200 text-purple-700 border-purple-200',
  Shopping: 'bg-gray-200 text-pink-700 border-pink-200',
  Health: 'bg-gray-200 text-green-700 border-green-200',
  Education: 'bg-gray-200 text-indigo-700 border-indigo-200',
  Other: 'bg-gray-200 text-yellow-700 border-yellow-200'
};

function ExpenseList({ expenses, onEdit, onDelete, loading }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 mb-3">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
        </div>
        <h3 className="text-base font-medium text-gray-700 mb-1">No expenses found</h3>
        <p className="text-sm text-gray-500">Start by adding your first expense above</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border-b-2 border-gray-500">
      <div className="p-5 shadow border-b-2 border-gray-500">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          All Expenses ({expenses.length})
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <div 
            key={expense._id} 
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xl md:text-2xl font-bold text-gray-900">
                    ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded border text-xs font-medium ${CATEGORY_COLORS[expense.category]}`}>
                    {expense.category}
                  </span>
                </div>
                
                <p className="text-sm md:text-base text-gray-700 mb-2 break-words">{expense.note}</p>
                
                <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(expense.date)}</span>
                </div>
              </div>
              
              <div className="flex gap-2 sm:ml-4">
                <button
                  onClick={() => onEdit(expense)}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-blue-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingId === expense._id}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-orange-500 hover:bg-red-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingId === expense._id}
                >
                  {deletingId === expense._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;