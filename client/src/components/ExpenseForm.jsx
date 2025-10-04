import { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'];

function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
    category: 'Other'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        date: new Date(editingExpense.date).toISOString().split('T')[0],
        note: editingExpense.note,
        category: editingExpense.category
      });
    }
  }, [editingExpense]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.note.trim()) {
      newErrors.note = 'Note is required';
    } else if (formData.note.length > 200) {
      newErrors.note = 'Note must be less than 200 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      
      if (!editingExpense) {
        setFormData({
          amount: '',
          date: new Date().toISOString().split('T')[0],
          note: '',
          category: 'Other'
        });
      }
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
      category: 'Other'
    });
    setErrors({});
    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border-b-2  border-gray-500">
      <div className="p-5 shadow border-b-2 border-gray-500">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1.5">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
              step="0.01"
            />
            {errors.amount && (
              <p className="text-red-600 text-xs mt-1">{errors.amount}</p>
            )}
          </div>


          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1.5">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-red-600 text-xs mt-1">{errors.date}</p>
            )}
          </div>


          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-xs mt-1">{errors.category}</p>
            )}
          </div>


          <div className="md:col-span-2">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1.5">
              Note <span className="text-red-500">*</span>
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.note ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter expense description..."
              rows="3"
              maxLength="200"
            />
            <div className="flex justify-between items-center mt-1">
              {errors.note ? (
                <p className="text-red-600 text-xs">{errors.note}</p>
              ) : (
                <span className="text-gray-500 text-xs">
                  {formData.note.length}/200 characters
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
          <button 
            type="submit" 
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-green-700 rounded transition-colors"
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          
          {editingExpense && (
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;