require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();


// Middleware
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://expense-tracker-sooty-omega-28.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/expenses', require('./routes/expenses'));

// Health check route
// Add this to your server.js file

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    api: {
      baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://expensetracker-bqa0.onrender.com/api' 
        : 'http://localhost:5000/api',
      documentation: {
        description: 'Personal Expense Tracker API - Manage your expenses with ease',
        endpoints: [
          {
            method: 'GET',
            path: '/api/health',
            description: 'Health check endpoint',
            authentication: 'None',
            parameters: [],
            response: {
              status: 'OK',
              message: 'Server is running'
            }
          },
          {
            method: 'GET',
            path: '/api/expenses',
            description: 'Get all expenses with optional filters',
            authentication: 'None',
            parameters: [
              {
                name: 'category',
                type: 'string',
                required: false,
                description: 'Filter by category (Food, Travel, Bills, Entertainment, Shopping, Health, Education, Other, All)',
                example: 'Food'
              },
              {
                name: 'startDate',
                type: 'date',
                required: false,
                description: 'Start date for filtering (YYYY-MM-DD)',
                example: '2025-10-01'
              },
              {
                name: 'endDate',
                type: 'date',
                required: false,
                description: 'End date for filtering (YYYY-MM-DD)',
                example: '2025-10-31'
              },
              {
                name: 'month',
                type: 'number',
                required: false,
                description: 'Month number (1-12)',
                example: '10'
              },
              {
                name: 'year',
                type: 'number',
                required: false,
                description: 'Year (e.g., 2025)',
                example: '2025'
              }
            ],
            exampleRequest: '/api/expenses?category=Food&month=10&year=2025',
            exampleResponse: [
              {
                _id: '670fa8e123456789abcdef12',
                amount: 1250.50,
                date: '2025-10-04T00:00:00.000Z',
                note: 'Grocery shopping at supermarket',
                category: 'Food',
                createdAt: '2025-10-04T14:30:00.000Z',
                updatedAt: '2025-10-04T14:30:00.000Z'
              }
            ]
          },
          {
            method: 'GET',
            path: '/api/expenses/summary',
            description: 'Get expense summary with totals by category and month',
            authentication: 'None',
            parameters: [
              {
                name: 'category',
                type: 'string',
                required: false,
                description: 'Filter by category',
                example: 'Food'
              },
              {
                name: 'month',
                type: 'number',
                required: false,
                description: 'Month number (1-12)',
                example: '10'
              },
              {
                name: 'year',
                type: 'number',
                required: false,
                description: 'Year',
                example: '2025'
              }
            ],
            exampleRequest: '/api/expenses/summary',
            exampleResponse: {
              totalSpent: 15000,
              byCategory: [
                {
                  category: 'Food',
                  total: 5000,
                  count: 10
                }
              ],
              byMonth: [
                {
                  year: 2025,
                  month: 10,
                  total: 15000,
                  count: 15
                }
              ]
            }
          },
          {
            method: 'GET',
            path: '/api/expenses/:id',
            description: 'Get a single expense by ID',
            authentication: 'None',
            parameters: [
              {
                name: 'id',
                type: 'string',
                required: true,
                description: 'Expense ID',
                example: '670fa8e123456789abcdef12'
              }
            ],
            exampleRequest: '/api/expenses/670fa8e123456789abcdef12',
            exampleResponse: {
              _id: '670fa8e123456789abcdef12',
              amount: 1250.50,
              date: '2025-10-04T00:00:00.000Z',
              note: 'Grocery shopping',
              category: 'Food',
              createdAt: '2025-10-04T14:30:00.000Z',
              updatedAt: '2025-10-04T14:30:00.000Z'
            }
          },
          {
            method: 'POST',
            path: '/api/expenses',
            description: 'Create a new expense',
            authentication: 'None',
            contentType: 'application/json',
            requestBody: {
              amount: {
                type: 'number',
                required: true,
                description: 'Expense amount (must be greater than 0)',
                example: 500
              },
              date: {
                type: 'date',
                required: true,
                description: 'Expense date (YYYY-MM-DD)',
                example: '2025-10-04'
              },
              note: {
                type: 'string',
                required: true,
                description: 'Expense description (max 200 characters)',
                example: 'Lunch at restaurant'
              },
              category: {
                type: 'string',
                required: true,
                description: 'Expense category',
                enum: ['Food', 'Travel', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'],
                example: 'Food'
              }
            },
            exampleRequest: {
              amount: 500,
              date: '2025-10-04',
              note: 'Lunch at restaurant',
              category: 'Food'
            },
            exampleResponse: {
              _id: '670fa8e123456789abcdef12',
              amount: 500,
              date: '2025-10-04T00:00:00.000Z',
              note: 'Lunch at restaurant',
              category: 'Food',
              createdAt: '2025-10-04T14:30:00.000Z',
              updatedAt: '2025-10-04T14:30:00.000Z'
            }
          },
          {
            method: 'PUT',
            path: '/api/expenses/:id',
            description: 'Update an existing expense',
            authentication: 'None',
            contentType: 'application/json',
            parameters: [
              {
                name: 'id',
                type: 'string',
                required: true,
                description: 'Expense ID',
                example: '670fa8e123456789abcdef12'
              }
            ],
            requestBody: {
              amount: {
                type: 'number',
                required: false,
                description: 'Updated expense amount',
                example: 600
              },
              date: {
                type: 'date',
                required: false,
                description: 'Updated expense date',
                example: '2025-10-05'
              },
              note: {
                type: 'string',
                required: false,
                description: 'Updated expense description',
                example: 'Updated lunch cost'
              },
              category: {
                type: 'string',
                required: false,
                description: 'Updated expense category',
                example: 'Food'
              }
            },
            exampleRequest: {
              amount: 600,
              note: 'Updated lunch cost'
            },
            exampleResponse: {
              _id: '670fa8e123456789abcdef12',
              amount: 600,
              date: '2025-10-04T00:00:00.000Z',
              note: 'Updated lunch cost',
              category: 'Food',
              createdAt: '2025-10-04T14:30:00.000Z',
              updatedAt: '2025-10-04T15:45:00.000Z'
            }
          },
          {
            method: 'DELETE',
            path: '/api/expenses/:id',
            description: 'Delete an expense',
            authentication: 'None',
            parameters: [
              {
                name: 'id',
                type: 'string',
                required: true,
                description: 'Expense ID',
                example: '670fa8e123456789abcdef12'
              }
            ],
            exampleRequest: '/api/expenses/670fa8e123456789abcdef12',
            exampleResponse: {
              message: 'Expense deleted successfully',
              id: '670fa8e123456789abcdef12'
            }
          }
        ],
        categories: [
          'Food',
          'Travel',
          'Bills',
          'Entertainment',
          'Shopping',
          'Health',
          'Education',
          'Other'
        ],
        errorCodes: [
          {
            code: 400,
            description: 'Bad Request - Invalid input data'
          },
          {
            code: 404,
            description: 'Not Found - Expense not found'
          },
          {
            code: 500,
            description: 'Internal Server Error - Server error occurred'
          }
        ]
      }
    },
    database: {
      status: 'Connected',
      type: 'MongoDB Atlas'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});