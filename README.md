# Family Finance App

A comprehensive family personal accounting application built with Vue 3, Quasar Framework, Pinia, and Axios.

## Features

### 🔐 Authentication & Roles
- JWT-based authentication system
- Role-based access control:
  - **ADMIN**: Full access to manage members, accounts, transactions, and loans
  - **MEMBER**: Can manage their own transactions and view family finances
  - **VIEWER**: Read-only access to family financial data

### 📊 Dashboard
- Financial overview with total assets, liabilities, and net worth
- Monthly income/expense summaries
- Member balance overview
- Recent transaction history
- Interactive charts (ready for Chart.js integration)

### 💰 Accounts Management
- Create and manage multiple accounts (cash, bank)
- Support for different currencies
- Account balance tracking
- Member ownership assignment

### 📝 Transactions
- Track income, expenses, transfers, and loans
- Advanced filtering by type, member, and date range
- Mobile-friendly swipe actions
- Transaction categorization

### 💳 Loans Management
- Track given and received loans between family members
- Mark loans as repaid
- Loan status monitoring
- Net loan position calculation

### 👥 Member Management (Admin Only)
- Add/edit/delete family members
- Role assignment and management
- Member balance tracking
- Family financial overview

## Tech Stack

- **Frontend**: Vue 3 + Composition API
- **UI Framework**: Quasar Framework v2
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Routing**: Vue Router 4
- **Language**: TypeScript
- **Build Tool**: Vite

## Prerequisites

- Node.js 18+ 
- npm, yarn, or bun package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd family-finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Backend API URL
   VITE_API_BASE_URL=http://localhost:3000/api
   
   # App configuration
   VITE_APP_TITLE=Family Finance
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

## Project Structure

```
src/
├── components/          # Reusable Vue components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── accounts/       # Accounts management
│   ├── transactions/   # Transactions management
│   ├── loans/          # Loans management
│   └── members/        # Member management (admin)
├── stores/             # Pinia stores
│   ├── auth-store.ts   # Authentication state
│   ├── account-store.ts # Accounts state
│   ├── transaction-store.ts # Transactions state
│   ├── loan-store.ts   # Loans state
│   └── member-store.ts # Members state
├── services/           # API services
│   └── api.ts         # Axios configuration & endpoints
├── types/              # TypeScript interfaces
│   └── index.ts       # All app types
├── router/             # Vue Router configuration
│   ├── index.ts       # Router setup
│   ├── routes.ts      # Route definitions
│   └── guards.ts      # Route guards
└── layouts/            # Layout components
    └── MainLayout.vue # Main app layout
```

## API Integration

The app is designed to work with a NestJS backend. The API service (`src/services/api.ts`) includes:

- **Authentication endpoints**: Login, profile
- **Account management**: CRUD operations for accounts
- **Transaction management**: CRUD operations for transactions
- **Loan management**: CRUD operations for loans
- **Member management**: CRUD operations for family members
- **Dashboard data**: Financial summaries and statistics

### Backend API Structure

Expected backend endpoints:
```
POST   /api/auth/login
GET    /api/auth/profile
GET    /api/accounts
POST   /api/accounts
PUT    /api/accounts/:id
DELETE /api/accounts/:id
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
GET    /api/loans
POST   /api/loans
PUT    /api/loans/:id
DELETE /api/loans/:id
PATCH  /api/loans/:id/repay
GET    /api/members
POST   /api/members
PUT    /api/members/:id
DELETE /api/members/:id
GET    /api/dashboard/stats
GET    /api/dashboard/monthly-chart/:year/:month
```

## Demo Credentials

For testing purposes, the app includes demo credentials:

- **Admin**: `admin@family.com` / `admin123`
- **Member**: `member@family.com` / `member123`
- **Viewer**: `viewer@family.com` / `viewer123`

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Adding New Features

1. **Create types** in `src/types/index.ts`
2. **Add API endpoints** in `src/services/api.ts`
3. **Create/update stores** in `src/stores/`
4. **Add routes** in `src/router/routes.ts`
5. **Create page components** in `src/pages/`

### State Management

The app uses Pinia for state management with the following stores:

- **AuthStore**: User authentication and authorization
- **AccountStore**: Financial accounts management
- **TransactionStore**: Transaction data and filtering
- **LoanStore**: Loan tracking and management
- **MemberStore**: Family member management

## Mobile-First Design

The app is designed with mobile-first principles:

- Responsive grid system
- Touch-friendly interface
- Bottom navigation tabs
- Swipe actions for mobile
- Optimized for small screens

## Theme Support

- Light/Dark theme toggle
- Consistent color scheme
- Material Design components
- Customizable Quasar variables

## Security Features

- JWT token authentication
- Route guards based on user roles
- Automatic token refresh
- Secure API communication
- Role-based access control

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Environment Configuration

Set production environment variables:

```env
VITE_API_BASE_URL=https://your-production-api.com/api
NODE_ENV=production
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] Chart.js integration for financial charts
- [ ] Export functionality (PDF, CSV)
- [ ] Budget planning and tracking
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Mobile app (Capacitor/Cordova)
- [ ] Real-time updates
- [ ] Advanced reporting
- [ ] Integration with banking APIs
