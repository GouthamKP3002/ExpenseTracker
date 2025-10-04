const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// @route   GET /api/expenses
// @desc    Get all expenses with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, startDate, endDate, month, year } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by date range
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Filter by month and year
    if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);
      query.date = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/expenses/summary
// @desc    Get expense summary
router.get('/summary', async (req, res) => {
  try {
    const { category, month, year } = req.query;
    let matchStage = {};

    // Filter by category
    if (category && category !== 'All') {
      matchStage.category = category;
    }

    // Filter by month and year
    if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);
      matchStage.date = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    }

    // Total spent
    const totalResult = await Expense.aggregate([
      { $match: matchStage },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalSpent = totalResult.length > 0 ? totalResult[0].total : 0;

    // By category
    const byCategory = await Expense.aggregate([
      { $match: matchStage },
      { 
        $group: { 
          _id: '$category', 
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        } 
      },
      { $sort: { total: -1 } }
    ]);

    // By month
    const byMonth = await Expense.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json({
      totalSpent,
      byCategory: byCategory.map(cat => ({
        category: cat._id,
        total: cat.total,
        count: cat.count
      })),
      byMonth: byMonth.map(m => ({
        year: m._id.year,
        month: m._id.month,
        total: m.total,
        count: m.count
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/expenses/:id
// @desc    Get single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/expenses
// @desc    Create new expense
router.post('/', async (req, res) => {
  try {
    const { amount, date, note, category } = req.body;

    // Validation
    if (!amount || !date || !note || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const expense = new Expense({
      amount,
      date,
      note,
      category
    });

    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/expenses/:id
// @desc    Update expense
router.put('/:id', async (req, res) => {
  try {
    const { amount, date, note, category } = req.body;

    // Validation
    if (amount && amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update fields
    if (amount) expense.amount = amount;
    if (date) expense.date = date;
    if (note) expense.note = note;
    if (category) expense.category = category;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;