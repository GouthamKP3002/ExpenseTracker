# 💰 Personal Expense Tracker

A **full-stack web application** for managing personal expenses with **advanced filtering, categorization**, and **comprehensive reporting** features.

---

## 🌐 Live Deployment

| Service | URL | Description |
|----------|-----|-------------|
| **Frontend (Vercel)** | [https://expense-tracker-sooty-omega-28.vercel.app](https://expense-tracker-sooty-omega-28.vercel.app) | Live web app |
| **Backend API (Render)** | [https://expensetracker-bqa0.onrender.com](https://expensetracker-bqa0.onrender.com) | REST API backend |

---

## 🩺 API Health Check

### Browser
```
https://expensetracker-bqa0.onrender.com/api/health
```

### cURL Command
```bash
curl https://expensetracker-bqa0.onrender.com/api/health
```

### Expected Response
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 📡 Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/summary` | Get expense summary |
| GET | `/api/expenses/:id` | Get single expense |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

---

## 🧪 Test API with cURL

### Get All Expenses
```bash
curl https://expensetracker-bqa0.onrender.com/api/expenses
```

### Get Summary
```bash
curl https://expensetracker-bqa0.onrender.com/api/expenses/summary
```

### Create Expense
```bash
curl -X POST https://expensetracker-bqa0.onrender.com/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "date": "2025-10-04",
    "note": "Lunch at restaurant",
    "category": "Food"
  }'
```

### Filter by Category
```bash
curl "https://expensetracker-bqa0.onrender.com/api/expenses?category=Food"
```

### Filter by Date Range
```bash
curl "https://expensetracker-bqa0.onrender.com/api/expenses?startDate=2025-10-01&endDate=2025-10-31"
```

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Deployment** | Vercel (Frontend) + Render (Backend) |

---

## ✨ Features

### ✅ Must-Have Features (All Implemented)

| Feature | Status | Description |
|---------|--------|-------------|
| **Add Expense** | ✅ | Create expenses with amount, date, note, and category |
| **View Expenses** | ✅ | Display all expenses in a clean, organized list |
| **Update Expense** | ✅ | Edit existing expense details |
| **Delete Expense** | ✅ | Remove expenses with confirmation |
| **Save Data** | ✅ | Persistent storage in MongoDB Atlas |
| **Validation** | ✅ | Client-side and server-side validation |
| **Error Handling** | ✅ | Comprehensive error messages and handling |

### ✅ Good-to-Have Features (All Implemented)

| Feature | Status | Description |
|---------|--------|-------------|
| **Categories** | ✅ | 8 predefined categories (Food, Travel, Bills, etc.) |
| **Summary Reports** | ✅ | Total spent, by category, by month |
| **Filters** | ✅ | Filter by category, date range, month/year |
| **UI Interface** | ✅ | Modern, responsive web interface |
| **Visual Reports** | ✅ | Progress bars and percentage breakdowns |

### 🎯 Additional Features Implemented

- ✨ **Real-time Updates** - Automatic refresh of summary when expenses change
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ⏳ **Loading States** - Smooth animations during data fetching
- 💬 **Success/Error Messages** - User-friendly notifications
- 🎨 **Color-coded Categories** - Visual distinction for expense types
- 📅 **Date Formatting** - User-friendly date display
- 🔢 **Character Counter** - Real-time feedback for note input
- 📌 **Sticky Summary** - Summary panel stays visible while scrolling

---

## 🏗️ Architecture

```
┌──────────────────────────────────────┐
│   Frontend (React + Vite)            │
│   Hosted on Vercel                   │
│   - UI Components                    │
│   - State Management                 │
└───────────────┬──────────────────────┘
                │ HTTPS/REST API
┌───────────────┴──────────────────────┐
│   Backend (Express.js)               │
│   Hosted on Render                   │
│   - API Routes                       │
│   - Business Logic                   │
│   - Validation                       │
└───────────────┬──────────────────────┘
                │ MongoDB Driver
┌───────────────┴──────────────────────┐
│   Database (MongoDB Atlas)           │
│   Cloud-hosted Database              │
│   - Expense Collection               │
└──────────────────────────────────────┘
```

---

## 💻 Local Development Setup

### Prerequisites

Before you begin, ensure you have:
- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** or **yarn** package manager
- ✅ **MongoDB Atlas Account** (Free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- ✅ **Git** (optional) - [Download](https://git-scm.com/)

---

### 📥 Step 1: Clone the Repository

```bash
# Using Git
git clone <your-repository-url>
cd expense-tracker

# Or download and extract the ZIP file
```

---

### 📦 Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

---

### 🗄️ Step 3: MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free M0 tier is sufficient)
3. Click **"Connect"** on your cluster
4. Choose **"Connect your application"**
5. Copy the connection string:
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/
   ```
6. Replace `<password>` with your database password
7. Add database name at the end:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
   ```

#### Configure Network Access

1. Go to **Network Access** in MongoDB Atlas
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

---

### ⚙️ Step 4: Environment Configuration

Create a `.env` file in the **root directory**:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri_here
NODE_ENV=development
```

**Example:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/expense-tracker
NODE_ENV=development
```

> ⚠️ **Important:** Replace `your_mongodb_atlas_uri_here` with your actual MongoDB connection string!

---

### ▶️ Step 5: Run the Application

```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- ✅ Backend server on `http://localhost:5000`
- ✅ Frontend on `http://localhost:5173`

---

### 🌐 Step 6: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📂 Project Structure

```
expense-tracker/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx      # Add/Edit expense form
│   │   │   ├── ExpenseList.jsx      # Display expenses
│   │   │   ├── ExpenseSummary.jsx   # Summary & reports
│   │   │   └── FilterBar.jsx        # Filter controls
│   │   ├── services/
│   │   │   └── api.js               # API communication
│   │   ├── App.jsx                  # Main component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                          # Backend (Express)
│   ├── models/
│   │   └── Expense.js               # Mongoose schema
│   ├── routes/
│   │   └── expenses.js              # API routes
│   ├── config/
│   │   └── db.js                    # Database config
│   └── server.js                    # Express server
├── .env                             # Environment variables
├── .gitignore
├── package.json                     # Root dependencies
└── README.md                        # This file
```

---

## 🔌 API Documentation

### Base URLs

| Environment | Base URL |
|-------------|----------|
| **Local** | `http://localhost:5000/api` |
| **Production** | `https://expensetracker-bqa0.onrender.com/api` |

---

### 1️⃣ Get All Expenses

**Endpoint:**
```http
GET /api/expenses
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | String | No | Filter by category |
| `startDate` | Date | No | Start date (YYYY-MM-DD) |
| `endDate` | Date | No | End date (YYYY-MM-DD) |
| `month` | Number | No | Month (1-12) |
| `year` | Number | No | Year (e.g., 2025) |

**Example Request:**
```bash
GET /api/expenses?category=Food&month=10&year=2025
```

**Response:**
```json
[
  {
    "_id": "670fa8e123456789abcdef12",
    "amount": 1250.50,
    "date": "2025-10-04T00:00:00.000Z",
    "note": "Grocery shopping at supermarket",
    "category": "Food",
    "createdAt": "2025-10-04T14:30:00.000Z",
    "updatedAt": "2025-10-04T14:30:00.000Z"
  }
]
```

---

### 2️⃣ Get Expense Summary

**Endpoint:**
```http
GET /api/expenses/summary
```

**Query Parameters:** Same as Get All Expenses

**Response:**
```json
{
  "totalSpent": 15000,
  "byCategory": [
    {
      "category": "Food",
      "total": 5000,
      "count": 10
    }
  ],
  "byMonth": [
    {
      "year": 2025,
      "month": 10,
      "total": 15000,
      "count": 15
    }
  ]
}
```

---

### 3️⃣ Create Expense

**Endpoint:**
```http
POST /api/expenses
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 500,
  "date": "2025-10-04",
  "note": "Lunch at restaurant",
  "category": "Food"
}
```

**Validation Rules:**

| Field | Rule |
|-------|------|
| `amount` | Required, must be > 0 |
| `date` | Required, valid date format |
| `note` | Required, max 200 characters |
| `category` | Required, must be valid category |

**Valid Categories:**
```
Food, Travel, Bills, Entertainment, Shopping, Health, Education, Other
```

---

### 4️⃣ Update Expense

**Endpoint:**
```http
PUT /api/expenses/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 600,
  "note": "Updated lunch cost"
}
```

> 💡 **Note:** All fields are optional. Only include fields you want to update.

---

### 5️⃣ Delete Expense

**Endpoint:**
```http
DELETE /api/expenses/:id
```

**Response:**
```json
{
  "message": "Expense deleted successfully",
  "id": "670fa8e123456789abcdef12"
}
```

---

## 📝 Usage Guide

### Adding an Expense

1. **Fill in the expense form:**
   - **Amount:** Enter amount (e.g., 500)
   - **Date:** Select date from calendar
   - **Category:** Choose from dropdown (Food, Travel, etc.)
   - **Note:** Enter description (max 200 chars)

2. **Click "Add Expense"**
3. ✅ See success message
4. ✅ Expense appears in list
5. ✅ Summary updates automatically

---

### Editing an Expense

1. **Click "Edit"** button on any expense
2. Form populates with existing data
3. Modify desired fields
4. **Click "Update Expense"**
5. ✅ Changes reflected immediately

---

### Filtering Expenses

Use the **Filter Bar** to set criteria:

| Filter | Description |
|--------|-------------|
| **Category** | Select specific category or "All" |
| **Date Range** | Set start and end dates |
| **Month/Year** | Select specific month and year |

**Click "Reset Filters"** to clear all filters

---

### Viewing Summary

The **summary panel** (right side) automatically shows:

- 💰 **Total Spent** - Sum of all expenses
- 📊 **By Category** - Breakdown with percentages and progress bars
- 📅 **By Month** - Monthly spending summary

---

## 🎯 Design Decisions & Assumptions

### Database Schema

```javascript
{
  amount: Number,      // Required, minimum 0
  date: Date,          // Required, defaults to current date
  note: String,        // Required, max 200 characters
  category: String,    // Enum: 8 predefined categories
  timestamps: true     // Auto-generated createdAt, updatedAt
}
```

---

### Key Assumptions

1. **🚨 Single User Application**
   - ❌ No user authentication implemented
   - ❌ All users share the same expense data
   - ❌ No user segregation or privacy
   - ✅ Suitable for personal use or demonstration

2. **💵 Currency**
   - All amounts in Indian Rupees (₹)
   - Decimal values supported (e.g., 1250.50)

3. **📁 Categories**
   - 8 predefined categories
   - Cannot be customized by users
   - Categories: `Food, Travel, Bills, Entertainment, Shopping, Health, Education, Other`

4. **📅 Date Handling**
   - Dates stored in UTC
   - Display formatted in local timezone
   - Date filters are inclusive

5. **💾 Data Persistence**
   - MongoDB Atlas cloud database
   - Data persists across sessions
   - Automatic backups by MongoDB Atlas

---

### Why These Technologies?

| Technology | Reason |
|------------|--------|
| **React + Vite** | Fast development with HMR, modern tooling |
| **Tailwind CSS** | Rapid UI development, utility-first approach |
| **Express.js** | Lightweight, flexible backend framework |
| **MongoDB** | Flexible NoSQL, perfect for JSON documents |
| **Vercel** | Free hosting, automatic deployments, CDN |
| **Render** | Free backend hosting, easy setup |

---

## ⚠️ Limitations & Future Enhancements

### 🚫 Current Limitations

| Limitation | Description |
|------------|-------------|
| ❌ **No User Authentication** | All expenses shared among all users |
| ❌ **No User Segregation** | No privacy or data separation |
| ❌ **No Recurring Expenses** | Cannot set up automatic entries |
| ❌ **No Budget Tracking** | No limits or alerts |
| ❌ **No Data Export** | Cannot export to CSV/PDF |
| ❌ **No Receipt Upload** | Cannot attach images |

---

### ✨ Planned Future Enhancements (Version 2.0)

#### 1. User Authentication
- 🔐 JWT-based authentication
- 👤 User registration and login
- 🔒 Password encryption (bcrypt)
- 🎯 Private expense data per user

#### 2. Advanced Features
- 🔄 Recurring expenses
- 💰 Budget tracking and alerts
- 📄 Export to CSV/PDF/Excel
- 📸 Receipt upload and storage
- 💱 Multi-currency support
- 📊 Data visualization with charts

#### 3. Mobile App
- 📱 React Native mobile app
- 📴 Offline mode support
- 🔔 Push notifications

#### 4. Collaboration
- 👥 Share expenses with family/roommates
- 💸 Split bills feature
- 👨‍👩‍👧‍👦 Group expense tracking

---

## 🧪 Testing

### Manual Testing Checklist

#### ✅ Create Expense
- [x] Add expense with valid data
- [x] Validation: amount = 0 (fails ✅)
- [x] Validation: negative amount (fails ✅)
- [x] Validation: no note (fails ✅)
- [x] Validation: note > 200 chars (fails ✅)

#### ✅ Update Expense
- [x] Edit and save expense
- [x] Cancel edit operation
- [x] Update with invalid data (fails ✅)

#### ✅ Delete Expense
- [x] Delete expense
- [x] Confirmation prompt appears

#### ✅ Filters
- [x] Filter by category
- [x] Filter by date range
- [x] Filter by month/year
- [x] Reset filters

#### ✅ Summary
- [x] Total calculation correct
- [x] Category breakdown accurate
- [x] Monthly summary correct
- [x] Percentages calculated properly

---

### API Testing Commands

```bash
# Health Check
curl https://expensetracker-bqa0.onrender.com/api/health

# Get all expenses
curl https://expensetracker-bqa0.onrender.com/api/expenses

# Create expense
curl -X POST https://expensetracker-bqa0.onrender.com/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"amount":500,"date":"2025-10-04","note":"Test","category":"Food"}'

# Filter by category
curl "https://expensetracker-bqa0.onrender.com/api/expenses?category=Food"

# Get summary
curl https://expensetracker-bqa0.onrender.com/api/expenses/summary
```

---

## 📦 Available Scripts

### Root Directory

```bash
# Install all dependencies
npm install

# Start backend only
npm run server

# Start frontend only
npm run client

# Start both (development)
npm run dev

# Build frontend for production
npm run build

# Start production server
npm start
```

### Client Directory

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🐛 Troubleshooting

### Issue: Cannot connect to MongoDB

**Solution:**
1. Check `.env` file has correct `MONGODB_URI`
2. Verify IP whitelist in MongoDB Atlas
3. Ensure database user has correct permissions

---

### Issue: Port 5000 already in use

**Solution:**
```bash
# Kill the process
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env file
PORT=5001
```

---

### Issue: CORS errors in browser

**Solution:**
1. Ensure backend server is running
2. Check CORS configuration in `server.js`
3. Verify `API_URL` in frontend matches backend URL

---

### Issue: Frontend not loading

**Solution:**
1. Clear browser cache (Ctrl+Shift+R)
2. Check console for errors
3. Verify backend is accessible at `/api/health`
4. Check `vite.config.js` proxy settings

---

### Issue: Summary not updating

**Solution:**
1. Check browser console for errors
2. Verify API endpoints are responding
3. Hard refresh the page (Ctrl+Shift+R)
4. Check `refreshTrigger` prop is passed correctly

---

## 🔒 Security Considerations

### ✅ Current Implementation

- ✅ Input validation on frontend and backend
- ✅ MongoDB injection protection (Mongoose)
- ✅ CORS configured for specific origins
- ✅ Environment variables for sensitive data
- ✅ HTTPS in production (Vercel + Render)

### ❌ Not Implemented (For Future)

- ❌ User authentication/authorization
- ❌ Rate limiting
- ❌ API key authentication
- ❌ Request encryption
- ❌ XSS protection headers

---

## 📄 License

This project is created for **educational purposes** as part of an internship application for **Evaao**.

---

## 👨‍💻 Author

**Goutham**

---

## 🙏 Acknowledgments

- 🍃 **MongoDB Atlas** - Free cloud database hosting
- ▲ **Vercel** - Frontend hosting platform
- 🎨 **Render** - Backend hosting platform
- 🎯 **Tailwind CSS** - Utility-first CSS framework
- ⚛️ **React & Vite** - Excellent developer tools

---


<div align="center">

**Built with ❤️ using React, Express, MongoDB & Tailwind CSS**

[Live Demo](https://expense-tracker-sooty-omega-28.vercel.app) • [API Documentation](https://expensetracker-bqa0.onrender.com/api/health)

</div>