# Employee Management System

A full-stack web application for managing companies, departments, and employees with role-based access control and employee onboarding workflow.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Approach & Implementation](#approach--implementation)
5. [Setup Instructions](#setup-instructions)
6. [Task Completion Checklist](#task-completion-checklist)
7. [Security Measures](#security-measures)
8. [API Documentation](#api-documentation)
9. [Assumptions & Considerations](#assumptions--considerations)

---

## Overview

This Employee Management System provides a comprehensive solution for managing organizational data including companies, departments, and employees. The system features:

- **CRUD Operations** for Companies, Departments, and Employees
- **Role-Based Access Control** (Admin, Manager, Employee)
- **Employee Onboarding Workflow** with status transitions
- **Automated Calculations** for counts and days employed
- **RESTful API** with JWT authentication
- **Modern React Frontend** with responsive UI
- **API Documentation** via Swagger/OpenAPI

---

## Technology Stack

### Backend
- **Framework**: Django 6.0+
- **REST API**: Django REST Framework (DRF)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **API Documentation**: drf-spectacular (Swagger/OpenAPI)
- **Database**: SQLite3 (development)
- **CORS**: django-cors-headers
- **Filtering**: django-filter

### Frontend
- **Framework**: React 19.2
- **Build Tool**: Vite
- **Routing**: React Router DOM 7.13
- **State Management**: TanStack Query (React Query) 5.90
- **Forms**: React Hook Form 7.71
- **HTTP Client**: Axios 1.13
- **Styling**: Tailwind CSS 4.1

---

## Project Structure

```
employeeManagment/
├── backend/
│   └── app/
│       ├── accounts/          # User authentication & authorization
│       ├── companies/          # Company management
│       ├── departments/        # Department management
│       ├── employees/          # Employee management
│       ├── dashboard/          # Dashboard analytics
│       └── empManagement/      # Django project settings
├── frontend/
│   └── app/
│       └── src/
│           ├── api/           # API service functions
│           ├── auth/          # Authentication context & hooks
│           ├── components/    # Reusable UI components
│           ├── features/      # Feature-based pages
│           └── pages/         # Auth pages (Login, Register)
└── README.md
```

---

## Approach & Implementation

### Backend Architecture

#### 1. **Models Design**
- **User Model**: Custom user model extending `AbstractUser` with role field (ADMIN, MANAGER, EMPLOYEE)
- **Company Model**: Stores company information with auto-calculated department and employee counts
- **Department Model**: Linked to company with unique constraint on (company, name)
- **Employee Model**: Comprehensive employee data with status workflow and auto-calculated days employed

#### 2. **Business Logic Implementation**

**Automated Calculations:**
- Company department/employee counts updated via Django signals (`post_save`, `post_delete`)
- Department employee counts updated automatically
- Employee days employed calculated based on `hired_on` date when status is HIRED

**Workflow Management:**
- Employee status transitions enforced in serializer validation
- Allowed transitions:
  - `APPLICATION_RECEIVED` → `INTERVIEW_SCHEDULED` or `NOT_ACCEPTED`
  - `INTERVIEW_SCHEDULED` → `HIRED` or `NOT_ACCEPTED`
- `hired_on` date required when transitioning to HIRED status

**Data Validation:**
- Email format validation
- Mobile number regex validation (`^\+?\d{9,15}$`)
- Department-Company relationship validation
- Required field validation at serializer level

#### 3. **API Design**
- RESTful API using Django REST Framework ViewSets
- Pagination: 10 items per page (configurable)
- Filtering: Company, Department, Status (for employees)
- Search: Name, Email, Designation (for employees)
- Ordering: Created date, Days employed (for employees)

#### 4. **Security Implementation**
- JWT-based authentication (access token: 60 minutes, refresh token: 5 days)
- Role-based permissions:
  - `IsAdmin`: Only ADMIN role
  - `IsManager`: ADMIN or MANAGER roles
- Protected endpoints require authentication
- CORS configured for frontend origin

### Frontend Architecture

#### 1. **State Management**
- React Query for server state management
- Context API for authentication state
- Local state for form inputs and UI state

#### 2. **Component Structure**
- Feature-based organization
- Reusable UI components (Button, Input, Loader)
- Layout components (AppLayout, Navbar, Sidebar)

#### 3. **Form Handling**
- React Hook Form for form validation
- Client-side validation matching backend requirements
- Error handling with user-friendly messages

#### 4. **API Integration**
- Centralized axios instance with interceptors
- Automatic token injection
- 401 error handling (redirect to login)
- Consistent error message display

#### 5. **User Experience**
- Loading states for async operations
- Error boundaries and fallback UI
- Confirmation dialogs for destructive actions
- Responsive design with Tailwind CSS

---

## Setup Instructions

### Prerequisites

- **Python**: 3.10 or higher
- **Node.js**: 18.x or higher
- **npm** or **yarn**: Latest version
- **Git**: For cloning the repository

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend/app
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

   The `requirements.txt` includes all necessary packages:
   - Django and Django REST Framework
   - JWT authentication
   - API documentation (drf-spectacular)
   - CORS headers
   - Environment variable management (python-decouple)

4. **Configure environment variables:**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env file with your settings (optional for development)
   # The .env file contains default values that work for development
   ```

   **Note**: The `.env` file is already created with default development values. For production, update the `SECRET_KEY` and set `DEBUG=False`.

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional, for admin access):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server:**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend/app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in `frontend/app/`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:3000` (or the port shown in terminal)

### Initial Setup

1. **Register a user:**
   - Navigate to `/register`
   - Create an account with role ADMIN or MANAGER (required for CRUD operations)
   - Employee role has limited access

2. **Login:**
   - Navigate to `/login`
   - Use registered credentials

3. **Access the application:**
   - Dashboard shows summary statistics
   - Navigate through Companies, Departments, and Employees sections
   - Create, view, edit, and delete records as per your role permissions

---

## Task Completion Checklist

### Backend Requirements

#### Models ✅
- [x] User Accounts model (username, email, role)
- [x] Company model (name, departments_count, employees_count)
- [x] Department model (company FK, name, employees_count)
- [x] Employee model (company FK, department FK, status, name, email, mobile, address, designation, hired_on, days_employed)

#### Validations & Business Logic ✅
- [x] Required field validation
- [x] Email format validation
- [x] Mobile number format validation
- [x] Auto-calculate company departments count
- [x] Auto-calculate company employees count
- [x] Auto-calculate department employees count
- [x] Auto-calculate employee days employed
- [x] Department-Company relationship validation
- [x] Cascading deletion handling (PROTECT on ForeignKeys)
- [x] Error handling with appropriate status codes

#### Workflow (Bonus) ✅
- [x] Employee onboarding workflow implemented
- [x] Status stages: Application Received, Interview Scheduled, Hired, Not Accepted
- [x] Transition validation in serializer
- [x] Status transition restrictions enforced

#### Security & Permissions ✅
- [x] Role-based access control (ADMIN, MANAGER, EMPLOYEE)
- [x] JWT authentication implemented
- [x] Permission classes: IsAdmin, IsManager
- [x] Protected endpoints require authentication

#### APIs ✅
- [x] RESTful API for all models
- [x] Company: GET (list, detail)
- [x] Department: GET (list, detail)
- [x] Employee: POST, GET, PATCH, DELETE
- [x] Secure data handling
- [x] RESTful conventions followed
- [x] API documentation via Swagger/OpenAPI

#### Testing (Bonus) ⚠️
- [ ] Unit tests (not implemented)
- [ ] Integration tests (not implemented)
- **Note**: Test files exist but tests are not written

#### Logging (Bonus) ⚠️
- [ ] Logging implementation (not implemented)
- **Note**: Django default logging is available but custom logging not added

### Frontend Requirements

#### User Interface ✅
- [x] Login Page with authentication
- [x] Company Management:
  - [x] List Companies Page (view, edit, delete)
  - [x] View Company Page
  - [x] Create Company Page
  - [x] Edit Company Page
- [x] Department Management:
  - [x] List Departments Page (view, edit, delete)
  - [x] View Department Page
  - [x] Create Department Page
  - [x] Edit Department Page
- [x] Employee Management:
  - [x] List Employees Page (view, edit, delete)
  - [x] Create Employee Page
  - [x] Edit Employee Page
  - [x] View Employee Page
- [x] Simple, organized, clean UI
- [x] Navigation between sections

#### User Account Management (Bonus) ✅
- [x] View User Account Page
- [x] Edit User Account Page

#### Summary Dashboard (Bonus) ✅
- [x] Dashboard showing analytics (Companies, Departments, Employees, Hired Employees)

#### Validations ✅
- [x] Required field validation
- [x] Email format validation
- [x] Mobile number format validation
- [x] Department filtered by selected company
- [x] User-friendly error messages

#### Employee Report (Bonus) ✅
- [x] Employee Report page showing hired employees
- [x] Displays: Name, Email, Mobile, Position, Hired On, Days Employed, Company, Department

#### API Integration ✅
- [x] Frontend integrated with backend API
- [x] All features use provided APIs
- [x] Authentication handled throughout
- [x] Error handling from API responses
- [x] Loading states and user-friendly messages

---

## Security Measures

### Authentication & Authorization

1. **JWT Authentication:**
   - Access tokens expire after 60 minutes
   - Refresh tokens expire after 5 days
   - Tokens stored in localStorage (frontend)
   - Automatic token refresh handling

2. **Role-Based Access Control:**
   - **ADMIN**: Full access to all resources
   - **MANAGER**: Access to Companies, Departments, and Employees CRUD
   - **EMPLOYEE**: Limited access (can view own account)
   - Permission checks at viewset level

3. **Protected Endpoints:**
   - All CRUD endpoints require authentication
   - Unauthorized requests return 401 status
   - Frontend redirects to login on 401

### Data Protection

1. **Input Validation:**
   - Server-side validation for all inputs
   - Email format validation
   - Mobile number regex validation
   - Required field checks

2. **Data Integrity:**
   - Foreign key constraints (PROTECT on delete)
   - Unique constraints (Company name, Department (company, name))
   - Department-Company relationship validation

3. **CORS Configuration:**
   - Restricted to frontend origin (`http://localhost:3000`)
   - Prevents unauthorized cross-origin requests

4. **Password Security:**
   - Django's built-in password validators
   - Minimum length enforcement
   - Password hashing (Django default)

### Security Considerations

- **Development Mode**: `DEBUG=True` and insecure `SECRET_KEY` are for development only
- **Production Recommendations:**
  - Set `DEBUG=False`
  - Use environment variables for `SECRET_KEY`
  - Configure proper `ALLOWED_HOSTS`
  - Use HTTPS
  - Implement rate limiting
  - Add CSRF protection for state-changing operations
  - Use secure password storage (already implemented via Django)

---

## API Documentation

### Accessing API Documentation

The API documentation is available via Swagger UI:

**URL**: `http://localhost:8000/api/docs/`

This provides interactive API documentation where you can:
- View all available endpoints
- See request/response schemas
- Test API endpoints directly
- View authentication requirements

### API Endpoints Overview

#### Authentication (`/api/auth/`)
- `POST /api/auth/login/` - Login (returns JWT tokens)
- `POST /api/auth/refresh/` - Refresh access token
- `POST /api/auth/register/` - Register new user
- `GET /api/auth/me/` - Get current user info
- `PATCH /api/auth/me/` - Update current user

#### Companies (`/api/companies/`)
- `GET /api/companies/` - List all companies (paginated)
- `POST /api/companies/` - Create company
- `GET /api/companies/{id}/` - Get company details
- `PATCH /api/companies/{id}/` - Update company
- `DELETE /api/companies/{id}/` - Delete company

**Permissions**: Requires ADMIN or MANAGER role

#### Departments (`/api/departments/`)
- `GET /api/departments/` - List all departments (paginated)
- `GET /api/departments/?company={company_id}` - Filter by company
- `POST /api/departments/` - Create department
- `GET /api/departments/{id}/` - Get department details
- `PATCH /api/departments/{id}/` - Update department
- `DELETE /api/departments/{id}/` - Delete department

**Permissions**: Requires ADMIN or MANAGER role

#### Employees (`/api/employees/`)
- `GET /api/employees/` - List all employees (paginated)
- `GET /api/employees/?page={page}&search={query}` - Pagination and search
- `GET /api/employees/?company={id}&department={id}&status={status}` - Filtering
- `POST /api/employees/` - Create employee
- `GET /api/employees/{id}/` - Get employee details
- `PATCH /api/employees/{id}/` - Update employee
- `DELETE /api/employees/{id}/` - Delete employee

**Permissions**: Requires ADMIN or MANAGER role

**Query Parameters:**
- `page`: Page number (default: 1)
- `search`: Search in name, email, designation
- `company`: Filter by company ID
- `department`: Filter by department ID
- `status`: Filter by status

#### Dashboard (`/api/dashboard/`)
- `GET /api/dashboard/` - Get summary statistics

**Response:**
```json
{
  "companies": 4,
  "departments": 5,
  "employees": 3,
  "hired_employees": 0
}
```

**Permissions**: Requires authentication

### Authentication

All endpoints (except login and register) require JWT authentication:

**Header:**
```
Authorization: Bearer {access_token}
```

### Response Format

**Success Response (List):**
```json
{
  "count": 10,
  "next": "http://localhost:8000/api/companies/?page=2",
  "previous": null,
  "results": [...]
}
```

**Success Response (Detail):**
```json
{
  "id": "uuid",
  "name": "Company Name",
  ...
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "detail": "Detailed error information"
}
```

---

## Assumptions & Considerations

### Assumptions Made

1. **User Roles:**
   - ADMIN and MANAGER have full CRUD access
   - EMPLOYEE role has limited access (can view own account)
   - Role assignment during registration

2. **Workflow:**
   - Employee workflow is linear (Application → Interview → Hired/Not Accepted)
   - Once HIRED or NOT_ACCEPTED, no further transitions allowed
   - `hired_on` date is required only when status is HIRED

3. **Data Relationships:**
   - Departments belong to one company
   - Employees belong to one company and one department
   - Department must belong to the selected company

4. **Deletion:**
   - PROTECT on ForeignKeys prevents deletion if related records exist
   - User must delete employees before deleting departments/companies

5. **Calculations:**
   - Counts updated automatically via signals
   - Days employed calculated only for HIRED employees
   - Calculations happen on save

6. **Pagination:**
   - Default page size: 10 items
   - Frontend handles pagination for employees
   - Companies and departments may have pagination but typically small datasets

### Considerations

1. **Development vs Production:**
   - Current setup is for development
   - Production requires:
     - Environment variables for sensitive data
     - Proper database (PostgreSQL recommended)
     - HTTPS configuration
     - Security hardening

2. **Performance:**
   - SQLite suitable for development/small deployments
   - For production, consider PostgreSQL
   - Add database indexes for frequently queried fields
   - Implement caching for dashboard statistics

3. **Testing:**
   - Test files exist but tests not implemented
   - Recommended: Add unit tests for models, serializers, views
   - Add integration tests for API endpoints
   - Add frontend component tests

4. **Error Handling:**
   - Basic error handling implemented
   - Consider more granular error messages
   - Add logging for production debugging

5. **UI/UX:**
   - Basic responsive design implemented
   - Consider adding loading skeletons
   - Add toast notifications for better feedback
   - Implement optimistic updates

6. **Future Enhancements:**
   - Add bulk operations
   - Export functionality (CSV, PDF)
   - Advanced filtering and sorting
   - Email notifications
   - File uploads for employee documents
   - Audit logging

---

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure backend CORS settings include frontend URL
   - Check `CORS_ALLOWED_ORIGINS` in settings.py

2. **Authentication Errors:**
   - Verify JWT token is valid and not expired
   - Check token storage in localStorage
   - Ensure token is sent in Authorization header

3. **Empty Lists:**
   - Verify user has correct role (ADMIN/MANAGER)
   - Check API endpoint URLs
   - Verify backend server is running

4. **Database Errors:**
   - Run migrations: `python manage.py migrate`
   - Check database file permissions
   - Verify models are correctly defined

5. **Frontend Build Errors:**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Verify environment variables are set

---

## Contact & Support

For issues or questions regarding this implementation, please refer to:
- API Documentation: `http://localhost:8000/api/docs/`
- Django Admin: `http://localhost:8000/admin/` (if superuser created)

---

## License

This project is developed as a task submission. All rights reserved.

---

**Last Updated**: February 2026
