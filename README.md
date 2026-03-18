# HMCTS Dev Test Frontend

This is the frontend application for the HMCTS case management system, built as a Node.js Express application using the GOV.UK Design System.

## 🛠 Tech Stack

- **Node.js**: The runtime environment.
- **Express**: The web framework for routing and middleware.
- **Nunjucks**: Templating engine for rendering views.
- **GOV.UK Design System (GDS)**: Consistent UI components and styling.
- **TypeScript**: Ensuring type safety across the codebase.
- **Yarn (PnP)**: Package management with Plug'n'Play for efficiency.
- **Jest & Supertest**: For unit and route testing.
- **Axios**: For communicating with the Backend API.

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- Corepack enabled (`corepack enable`)

### Running the Application

#### Local Development

1. **Install dependencies**:
   ```bash
   corepack yarn install
   ```

2. **Build assets**:
   ```bash
   corepack yarn build
   ```

3. **Start the development server**:
   ```bash
   corepack yarn start:dev
   ```

#### Using Docker

You can also run the application using Docker, which is useful for consistent environments:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:4000`.

## ✨ Features

- **Task Dashboard**: View all tasks with status and priority indicators.
- **Pagination**: Navigate through tasks (10 per page).
- **Task Management**: Create, edit, and delete tasks.
- **User Integration**: Assign tasks to specific users.
- **Error Handling**: User-friendly error messages when the API is unavailable.

## 🧪 Testing

I have implemented comprehensive unit and route tests to ensure reliability.

### Running Tests

```bash
# Run unit tests (apiClient, etc.)
corepack yarn test:unit

# Run route tests (Page rendering and flows)
corepack yarn test:routes

# Run all tests
corepack yarn test
```

## 🏗 Build & Lint Commands

- `corepack yarn build`: Build the frontend assets.
- `corepack yarn lint`: Run ESLint and Stylelint.
- `corepack yarn lint:fix`: Automatically fix linting issues.
