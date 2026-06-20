# Company Portal - Employee Management System

A comprehensive Angular-based web application for managing employees, departments, projects, and tasks within an organization. The Company Portal provides role-based access control, admin dashboard, and enterprise-level features for human resources management.

## 📋 Overview

**Company Portal** is a modern, responsive web application built with Angular 21 that enables organizations to:
- Manage employees and their information
- Organize employees by departments
- Track projects and project assignments
- Manage tasks and work assignments
- Maintain user roles and permissions
- Access admin dashboard for system management

## 🎯 Key Features

- **Employee Management**: Create, read, update, and delete employee records with detailed information
- **Department Management**: Organize employees into logical departments
- **Project Management**: Create and manage projects with employee assignments
- **Task Management**: Track tasks associated with projects and employees
- **User Management**: Manage user accounts and access permissions
- **Admin Dashboard**: Centralized administration interface for system oversight
- **Authentication & Authorization**: Secure login with role-based access control (RBAC)
- **Responsive Design**: Mobile-friendly UI built with Angular Material
- **Real-time Updates**: RxJS-powered reactive state management

## 🛠 Tech Stack

- **Frontend Framework**: Angular 21.0.4
- **UI Component Library**: Angular Material 21.0.5
- **State Management**: RxJS 7.8.0
- **Styling**: SCSS
- **Testing**: Vitest (Unit Tests)
- **Build Tool**: Angular CLI 21.0.4
- **TypeScript**: 5.9.2
- **Package Manager**: npm 10.9.0
- **Layout**: Angular CDK (Component Dev Kit)

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin module and dashboard
│   │   ├── dashboard/         # Admin dashboard components
│   │   └── users/             # User management components
│   ├── auth/                  # Authentication module
│   ├── pages/                 # Main application pages
│   │   ├── employees/         # Employee management page
│   │   ├── departments/       # Department management page
│   │   ├── projects/          # Project management page
│   │   └── tasks/             # Task management page
│   ├── services/              # Business logic and API services
│   │   ├── auth/              # Authentication service
│   │   ├── employees/         # Employee service
│   │   ├── departments/       # Department service
│   │   ├── project/           # Project service
│   │   ├── tasks/             # Task service
│   │   ├── users/             # User service
│   │   └── snackbar/          # Notification service
│   ├── guards/                # Route guards for authorization
│   ├── interceptors/          # HTTP interceptors
│   ├── dialogs/               # Reusable dialog components
│   ├── model/                 # Data models and interfaces
│   ├── app.routes.ts          # Application routing configuration
│   ├── app.config.ts          # Application configuration
│   ├── app.ts                 # Root component
│   └── app.scss               # Global styles
├── main.ts                    # Application entry point
├── index.html                 # HTML template
└── styles.scss                # Global stylesheet
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v10.9.0 or higher)
- Angular CLI 21.0.4

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd company-portal-ui/company-portal
```

2. Install dependencies:
```bash
npm install
```

## 💻 Development

### Start Development Server

To start a local development server:

```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200/`. The application automatically reloads whenever you modify any source files.

### Code Generation

Angular CLI includes powerful code scaffolding tools. To generate a new component:

```bash
ng generate component component-name
# or shorthand
ng g c component-name
```

For a complete list of available schematics (components, directives, pipes, services, etc.):

```bash
ng generate --help
```

## 🏗 Building

### Build for Production

To build the project for production:

```bash
npm run build
# or
ng build
```

Build artifacts are stored in the `dist/` directory. The production build optimizes your application for performance and speed.

### Watch Mode

To build in watch mode during development:

```bash
npm run watch
```

## ✅ Testing

### Unit Tests

Execute unit tests with the [Vitest](https://vitest.dev/) test runner:

```bash
npm test
# or
ng test
```

### End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🔧 Configuration

### Environment Setup

Configure environment-specific settings in the `src/environments/` directory:

- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment

Update API endpoints and other configuration variables based on your deployment environment.

### Application Routes

Routes are configured in [app.routes.ts](src/app/app.routes.ts) using Angular's standalone routing API. Key routes include:

- `/login` - Authentication page
- `/dashboard` - Main dashboard
- `/employees` - Employee management
- `/departments` - Department management
- `/projects` - Project management
- `/tasks` - Task management
- `/admin` - Admin panel (requires admin role)

### Authentication Guards

Route protection is handled by guards in the `src/app/guards/` directory. These guards enforce:
- User authentication requirements
- Role-based access control (Admin, User, etc.)
- Token validation

## 🔐 Security Features

- **Authentication**: Secure login mechanism with session management
- **Authorization**: Role-based access control (RBAC) on routes and components
- **HTTP Interceptors**: Automatic token attachment to requests
- **Guard Protection**: Route guards prevent unauthorized access

## 📡 API Integration

The application communicates with a backend API through services located in `src/app/services/`. Each service handles:
- HTTP requests/responses
- Data transformation
- Error handling
- Caching

### Available Services

| Service | Purpose |
|---------|---------|
| `auth.ts` | Authentication and login |
| `employees/` | Employee CRUD operations |
| `departments/` | Department management |
| `project/` | Project management |
| `tasks/` | Task management |
| `users/` | User account management |

## 📦 Dependencies

### Core Dependencies
- `@angular/core` - Angular framework
- `@angular/common` - Common Angular utilities
- `@angular/forms` - Form handling and validation
- `@angular/router` - Client-side routing
- `@angular/material` - Material Design components
- `rxjs` - Reactive programming library

### Development Dependencies
- `@angular/cli` - Angular command-line tools
- `typescript` - TypeScript compiler
- `vitest` - Unit testing framework

## 🐛 Troubleshooting

### Port Already in Use

If port 4200 is already in use, specify a different port:
```bash
ng serve --port 4300
```

### Dependency Issues

Clear the node_modules and reinstall:
```bash
rm -r node_modules package-lock.json
npm install
```

### Build Errors

Clean the build cache and rebuild:
```bash
ng build --configuration development --poll 2000
```

## 📝 Code Style and Conventions

- **Prettier**: Code formatting (configured in `package.json`)
- **TypeScript**: Strict mode enabled
- **Naming**: Use camelCase for variables/functions, PascalCase for classes/components
- **File Organization**: Group by feature in separate directories

## 🚢 Deployment

### Building for Production

```bash
npm run build
```

### Deployment Options

The compiled application in the `dist/` directory can be deployed to:
- Web servers (Apache, Nginx, IIS)
- Cloud platforms (Azure, AWS, Google Cloud)
- CDN services
- Docker containers

## 📚 Additional Resources

- [Angular Official Documentation](https://angular.dev)
- [Angular CLI Commands](https://angular.dev/tools/cli)
- [Angular Material Components](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

This project is part of the Company Portal system. For licensing information, please contact your organization.

## 🤝 Contributing

When contributing to this project:

1. Create a feature branch from `main`
2. Follow the code style conventions
3. Write tests for new features
4. Ensure all tests pass before submitting a pull request
5. Update documentation as needed

## 📞 Support

For support or questions regarding the Company Portal application, please contact the development team or create an issue in the project repository.
