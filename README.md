# TalentAI Backend Milestone 1 Learning Guide

This README is a concept map for the backend foundation implemented in Milestone 1. Use it as a prompt/reference for ChatGPT to learn each topic deeply.

## Milestone Completed

Milestone 1 focused on building a production-ready backend foundation for TalentAI using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Refresh tokens
- HttpOnly cookies
- Security middleware
- Centralized config
- Centralized error handling
- Validation
- Audit logging

## Concepts To Learn Deeply

### 1. Backend Project Architecture

Study these concepts:

- Clean Architecture
- Layered Architecture
- Separation of Concerns
- Routes vs Controllers vs Services
- Models vs DTOs vs Validators
- Utility modules
- Middleware pipeline
- Configuration management

Files related to this:

- `server/app.js`
- `server/index.js`
- `server/routes/`
- `server/controllers/`
- `server/services/`
- `server/models/`
- `server/middlewares/`
- `server/utils/`
- `server/config/`
- `server/constants/`

Suggested prompt:

```text
Explain layered backend architecture in Node.js/Express using routes, controllers, services, models, validators, middlewares, utils, configs, and constants. Explain why business logic should not be inside routes.
```

### 2. Express Application Setup

Study these concepts:

- Express app instance
- Middleware order
- Route mounting
- Health check endpoints
- Separating `app.js` from `index.js`
- Server startup lifecycle
- Graceful configuration validation before startup

Files related to this:

- `server/app.js`
- `server/index.js`

Suggested prompt:

```text
Explain why production Express apps separate app.js from index.js. Explain middleware order, route mounting, and health check endpoints.
```

### 3. Environment Configuration

Study these concepts:

- Environment variables
- `.env` files
- Centralized config object
- Required env validation
- Development vs production config
- Secure defaults

Files related to this:

- `server/config/app.config.js`
- `server/config/connectDB.js`

Suggested prompt:

```text
Teach me environment variable management in production Node.js apps. Explain centralized config, env validation, secure defaults, and development vs production settings.
```

### 4. MongoDB And Mongoose

Study these concepts:

- MongoDB connection lifecycle
- Mongoose schemas
- Mongoose models
- Schema indexes
- Unique indexes
- Timestamps
- `select: false`
- Instance methods
- Pre-save hooks
- `toJSON` transformation

Files related to this:

- `server/config/connectDB.js`
- `server/models/user.model.js`
- `server/models/auditLog.model.js`

Suggested prompt:

```text
Explain Mongoose schemas, models, indexes, pre-save hooks, instance methods, select:false fields, timestamps, and toJSON transformations using a User model example.
```

### 5. Authentication

Study these concepts:

- Register flow
- Login flow
- Google auth flow
- Logout flow
- Current user flow
- Password hashing
- Credential validation
- Authentication vs authorization

Files related to this:

- `server/routes/auth.route.js`
- `server/controllers/auth.controller.js`
- `server/services/auth.service.js`
- `server/middlewares/isAuth.js`
- `server/controllers/user.controller.js`

Suggested prompt:

```text
Explain a production authentication flow in Express using register, login, logout, current-user, bcrypt password hashing, JWT access tokens, refresh tokens, and HttpOnly cookies.
```

### 6. JWT Access Tokens

Study these concepts:

- JWT payload
- JWT signing
- JWT verification
- Access token expiry
- Stateless authentication
- Token claims
- Why access tokens should be short-lived

Files related to this:

- `server/utils/token.js`
- `server/middlewares/isAuth.js`
- `server/config/app.config.js`

Suggested prompt:

```text
Explain JWT access tokens in detail: payload, signing, verification, expiration, token claims, stateless auth, and security risks.
```

### 7. Refresh Tokens And Session Management

Study these concepts:

- Refresh token rotation
- Refresh token hashing
- Refresh token expiry
- Token versioning
- Session invalidation
- Logout invalidation
- Storing refresh token hash in database
- Why refresh tokens should be protected more carefully than access tokens

Files related to this:

- `server/services/auth.service.js`
- `server/utils/token.js`
- `server/utils/session.js`
- `server/models/user.model.js`

Suggested prompt:

```text
Explain refresh token rotation, hashed refresh tokens, token versioning, session invalidation, and secure logout in an Express + MongoDB app.
```

### 8. Cookies

Study these concepts:

- HttpOnly cookies
- Secure cookies
- SameSite cookies
- Cookie path
- Cookie maxAge
- Access token cookie vs refresh token cookie
- Cookie-based auth vs localStorage auth

Files related to this:

- `server/utils/cookieOptions.js`
- `server/controllers/auth.controller.js`

Suggested prompt:

```text
Explain secure cookie-based authentication using HttpOnly, Secure, SameSite, maxAge, and path. Compare cookies with localStorage for JWT storage.
```

### 9. Password Security

Study these concepts:

- bcrypt
- Password hashing
- Salt rounds
- Why passwords are never stored in plain text
- Password comparison
- Pre-save hooks for password hashing

Files related to this:

- `server/models/user.model.js`
- `server/services/auth.service.js`

Suggested prompt:

```text
Explain bcrypt password hashing in Node.js with Mongoose pre-save hooks and password comparison during login.
```

### 10. Authorization And RBAC

Study these concepts:

- Role-Based Access Control
- User roles
- Authorization middleware
- Candidate, recruiter, admin roles
- Authentication middleware before authorization middleware

Files related to this:

- `server/constants/roles.js`
- `server/middlewares/authorizeRoles.js`
- `server/middlewares/isAuth.js`

Suggested prompt:

```text
Explain RBAC in Express apps. Show how authentication middleware and role authorization middleware work together.
```

### 11. Request Validation

Study these concepts:

- Joi validation
- Schema-based validation
- Sanitized validated values
- Rejecting invalid input early
- Validation in controllers
- `stripUnknown`

Files related to this:

- `server/validators/auth.validator.js`
- `server/controllers/auth.controller.js`

Suggested prompt:

```text
Explain request validation in Express using Joi. Explain abortEarly, stripUnknown, validation schemas, and why validation should happen before business logic.
```

### 12. Centralized Error Handling

Study these concepts:

- Custom error classes
- Operational errors
- Express error middleware
- Async error handling
- Normalizing Mongoose errors
- HTTP status codes
- Error response format

Files related to this:

- `server/utils/AppError.js`
- `server/utils/asyncHandler.js`
- `server/middlewares/errorHandler.js`
- `server/middlewares/notFound.js`

Suggested prompt:

```text
Explain centralized error handling in Express using custom AppError, asyncHandler, notFound middleware, and errorHandler middleware.
```

### 13. Security Middleware

Study these concepts:

- Helmet
- CORS
- Rate limiting
- Auth endpoint rate limiting
- MongoDB injection prevention
- XSS sanitization
- HPP protection
- Compression
- Trust proxy

Files related to this:

- `server/middlewares/security.js`
- `server/middlewares/rateLimiters.js`
- `server/middlewares/mongoSanitize.js`

Suggested prompt:

```text
Explain production Express security middleware: Helmet, CORS, rate limiting, MongoDB injection sanitization, XSS sanitization, HPP protection, compression, and trust proxy.
```

### 14. CSRF Protection

Study these concepts:

- CSRF attacks
- Cookie-based authentication CSRF risk
- CSRF token cookie
- `x-csrf-token` header
- Safe HTTP methods
- Excluding auth bootstrap routes
- SameSite cookies and CSRF

Files related to this:

- `server/middlewares/csrfProtection.js`

Suggested prompt:

```text
Explain CSRF protection for cookie-based authentication in Express. Explain CSRF token cookies, x-csrf-token headers, safe methods, and SameSite cookies.
```

### 15. Audit Logging

Study these concepts:

- Audit logs
- Security event logging
- Actor ID
- Action
- Resource
- IP address
- User agent
- Metadata
- Why audit logs should not break user requests

Files related to this:

- `server/models/auditLog.model.js`
- `server/services/audit.service.js`
- `server/middlewares/auditLogger.js`

Suggested prompt:

```text
Explain audit logging in production backend systems. Cover actorId, action, resource, IP address, user agent, metadata, indexes, and failure-safe logging.
```

### 16. API Response Design

Study these concepts:

- Consistent success responses
- Consistent error responses
- HTTP status codes
- Response helper utilities
- Avoiding duplicated response code

Files related to this:

- `server/utils/apiResponse.js`
- `server/middlewares/errorHandler.js`

Suggested prompt:

```text
Explain consistent API response design in Express apps, including success response helpers, error response format, and HTTP status codes.
```

### 17. Logging

Study these concepts:

- Structured logging
- Log levels
- Development logs vs production logs
- Morgan request logs
- JSON logs
- Avoiding sensitive data in logs

Files related to this:

- `server/utils/logger.js`
- `server/middlewares/security.js`

Suggested prompt:

```text
Explain structured logging in Node.js backend apps. Cover log levels, JSON logs, request logs with Morgan, and sensitive data safety.
```

### 18. Rate Limiting

Study these concepts:

- API rate limiting
- Auth-specific rate limiting
- AI endpoint rate limiting
- Abuse prevention
- Brute force protection
- Rate limit windows
- Standard rate limit headers

Files related to this:

- `server/middlewares/rateLimiters.js`
- `server/routes/auth.route.js`

Suggested prompt:

```text
Explain rate limiting in Express using express-rate-limit. Cover global API limits, auth endpoint limits, AI endpoint limits, brute force protection, and rate limit headers.
```

## Dependencies Added

Study what each package does:

- `bcryptjs`
- `compression`
- `cors`
- `dotenv`
- `express`
- `express-rate-limit`
- `express-xss-sanitizer`
- `helmet`
- `hpp`
- `joi`
- `jsonwebtoken`
- `mongoose`
- `morgan`
- `cookie-parser`

Suggested prompt:

```text
Explain what each dependency does in a production Node.js Express backend: bcryptjs, compression, cors, dotenv, express, express-rate-limit, express-xss-sanitizer, helmet, hpp, joi, jsonwebtoken, mongoose, morgan, and cookie-parser.
```

## Recommended Learning Order

1. Express app architecture
2. MongoDB and Mongoose
3. Request validation
4. Password hashing
5. JWT access tokens
6. Refresh tokens
7. Cookies
8. Auth middleware
9. RBAC
10. Centralized error handling
11. Security middleware
12. CSRF protection
13. Audit logging
14. Logging and observability
15. Rate limiting

## Master Prompt For ChatGPT

Use this prompt to study the whole milestone:

```text
I am building a production-ready MERN backend called TalentAI. Milestone 1 implemented Express architecture with routes, controllers, services, models, validators, middlewares, utils, configs, JWT access tokens, refresh token rotation, HttpOnly cookies, bcrypt password hashing, Mongoose models, RBAC, Joi validation, Helmet, CORS, rate limiting, MongoDB injection sanitization, XSS sanitization, HPP protection, CSRF protection, centralized error handling, structured logging, and audit logging.

Teach me every concept deeply, one by one, with examples. Start from backend architecture and wait for me to say next before moving to the next concept.
```

