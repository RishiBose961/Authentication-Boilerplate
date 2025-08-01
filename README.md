# Authentication Boilerplate

A comprehensive, production-ready authentication boilerplate that eliminates the repetitive setup of common authentication features. Get your app up and running with secure authentication in minutes, not hours.

## 🚀 Features

- **Complete Authentication Flow**: Sign up, sign in, password reset, email verification
- **Multiple Authentication Methods**: Email/password, social logins
- **Security Best Practices**: JWT tokens, password hashing, rate limiting
- **Database Integration**: Pre-configured with popular databases (PostgreSQL, MongoDB, MySQL)
- **Testing Suite**: Comprehensive test coverage for all authentication flows

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (with MongoDB and MySQL alternatives)
- **Authentication**: JWT, Passport.js
- **Validation**: Zod
- **Testing**: vitest, Supertest

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Database (PostgreSQL,MongoDB Compass recommended)

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/RishiBose961/Auth-Boilerplate
   cd auth-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run server
   ```

Your authentication API is now running at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/auth/me` - User profile


## 🔧 Configuration


### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-jwt-secret
REDIS_URL=your-redis-url (for session storage)
```

## 🧪 Testing

Run the test suite to ensure everything works correctly:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔐 Security Features

- **Password Security**: hashing with salt rounds
- **JWT Security**: Short-lived access tokens with refresh token rotation
- **Rate Limiting**: Configurable rate limits on sensitive endpoints
- **Input Validation**: Comprehensive request validation with ZOD
- **CORS Protection**: Configurable CORS settings

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Save hours of development time and focus on building your core features!** ⚡