# USDT King - Premium Stablecoin Platform

A modern, secure USDT trading platform built with Next.js, featuring AI-powered algorithmic trading and comprehensive admin management.

## 🚀 Features

- **Modern Landing Page** - Professional design with green/gold theme
- **Wallet Integration** - BEP-20 network support
- **Admin Dashboard** - Complete transaction management system
- **Secure Authentication** - JWT-based auth with bcrypt password hashing
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Real-time Updates** - Live transaction status updates

## 🛠 Tech Stack

- **Frontend**: Next.js 15.3.2, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui Components
- **Backend**: Next.js API Routes, PostgreSQL
- **Authentication**: JWT, bcrypt
- **Database**: PostgreSQL with connection pooling

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd usdt-king
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   
   **Option A: Local PostgreSQL**
   ```bash
   # Install PostgreSQL locally
   # Create database
   createdb usdt_king
   
   # Run schema
   psql -d usdt_king -f src/server/schema.sql
   ```
   
   **Option B: Docker PostgreSQL**
   ```bash
   # Run PostgreSQL in Docker
   docker run --name usdt-postgres \
     -e POSTGRES_DB=usdt_king \
     -e POSTGRES_USER=username \
     -e POSTGRES_PASSWORD=password \
     -p 5432:5432 \
     -d postgres:13
   
   # Run schema
   docker exec -i usdt-postgres psql -U username -d usdt_king < src/server/schema.sql
   ```

4. **Environment Configuration**
   
   Update `.env.local` with your database credentials:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/usdt_king
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

5. **Create Default Admin**
   ```sql
   -- Connect to your database and run:
   INSERT INTO admins (username, email, password_hash) 
   VALUES (
     'admin', 
     'samadmehboob80@gmail.com', 
     '$2b$10$hash_of_Dan98990'  -- You'll need to hash this
   );
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Visit: http://localhost:8000

## 🔐 Default Admin Credentials

- **Email**: samadmehboob80@gmail.com
- **Password**: Dan98990

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   └── admin/
│       ├── page.tsx          # Admin login
│       └── dashboard.tsx     # Admin dashboard
├── components/ui/            # Shadcn/ui components
├── server/
│   ├── schema.sql           # Database schema
│   └── api/
│       ├── auth.ts          # User authentication
│       └── admin.ts         # Admin operations
└── lib/
    └── utils.ts             # Utility functions
```

## 🎯 Key Features

### Landing Page
- Modern hero section with gradient design
- USDT holdings showcase
- BEP-20 deposit modal
- Top holdings rankings
- Featured USDT portfolio display
- Responsive footer with navigation

### Admin Dashboard
- Transaction management (deposits/withdrawals)
- User management system
- System notices and announcements
- Withdrawal pause/resume controls
- Deposit address management
- Real-time status updates

### Security Features
- JWT token authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation and sanitization
- CORS protection

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Docker
```dockerfile
# Dockerfile included for containerized deployment
docker build -t usdt-king .
docker run -p 8000:8000 usdt-king
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth` - User registration/login
- `POST /api/admin` - Admin authentication

### Admin Operations
- `POST /api/admin` - Various admin actions:
  - `approveWithdrawal`
  - `cancelWithdrawal`
  - `approveDeposit`
  - `cancelDeposit`
  - `releaseNotice`
  - `pauseWithdrawals`
  - `editDepositAddress`

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize components in `src/components/ui/`

### Branding
- Update logo and colors in components
- Modify metadata in `src/app/layout.tsx`
- Change deposit address in landing page

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env.local
   - Ensure database exists

2. **Admin Login Failed**
   - Verify admin exists in database
   - Check password hash generation
   - Confirm JWT_SECRET is set

3. **Port Already in Use**
   ```bash
   # Kill process on port 8000
   fuser -k 8000/tcp
   # Or use different port
   PORT=3000 npm run dev
   ```

## 📝 Development Notes

- Currently using mock data for demonstration
- Database operations are simulated
- Real PostgreSQL integration ready for production
- All components are responsive and accessible

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: samadmehboob80@gmail.com
- Create an issue in the repository
- Check the troubleshooting section above

---

**Built with ❤️ using Next.js and modern web technologies**
