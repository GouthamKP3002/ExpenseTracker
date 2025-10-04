import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import FilterBar from './components/FilterBar';
import { getExpenses, createExpense, updateExpense, deleteExpense } from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadExpenses();
  }, [filters]);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses(filters);
      setExpenses(data);
    } catch (error) {
      showMessage('error', 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, formData);
        showMessage('success', 'Expense updated successfully!');
        setEditingExpense(null);
      } else {
        await createExpense(formData);
        showMessage('success', 'Expense added successfully!');
      }
      loadExpenses();
    } catch (error) {
      showMessage('error', error.message || 'Operation failed');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      showMessage('success', 'Expense deleted successfully!');
      loadExpenses();
    } catch (error) {
      showMessage('error', 'Failed to delete expense');
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow sticky top-0 z-10  border-b-4 border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 md:p-2.5 rounded-xl shadow-md">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900">Expense Tracker</h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Manage your finances with ease</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium italic">
                "Money talks, but mine only says goodbye."
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>


      {message.text && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-3 md:p-4 rounded-lg shadow-sm animate-fade-in ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium text-sm md:text-base">{message.text}</span>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <ExpenseForm 
              onSubmit={handleCreateOrUpdate}
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />
            
            <FilterBar onFilterChange={handleFilterChange} />
            
            <ExpenseList 
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>


          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <ExpenseSummary 
                filters={filters} 
                expenseCount={expenses.length}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-600 text-xs md:text-sm">
              © 2025 Expense Tracker. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
               Evaao
              </span>
              
            
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;