const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/expenses`;

// Get all expenses with optional filters
export const getExpenses = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category && filters.category !== 'All') {
      queryParams.append('category', filters.category);
    }
    if (filters.startDate) {
      queryParams.append('startDate', filters.startDate);
    }
    if (filters.endDate) {
      queryParams.append('endDate', filters.endDate);
    }
    if (filters.month) {
      queryParams.append('month', filters.month);
    }
    if (filters.year) {
      queryParams.append('year', filters.year);
    }

    const url = queryParams.toString() ? `${API_URL}?${queryParams}` : API_URL;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

// Get expense summary
export const getSummary = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category && filters.category !== 'All') {
      queryParams.append('category', filters.category);
    }
    if (filters.month) {
      queryParams.append('month', filters.month);
    }
    if (filters.year) {
      queryParams.append('year', filters.year);
    }

    const url = queryParams.toString() 
      ? `${API_URL}/summary?${queryParams}` 
      : `${API_URL}/summary`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch summary');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching summary:', error);
    throw error;
  }
};

// Create new expense
export const createExpense = async (expenseData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create expense');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

// Update expense
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update expense');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

// Delete expense
export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete expense');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};