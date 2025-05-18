## 🏥 Doctor's Portal - Full Stack Application

This project is a Full Stack Application for a Doctor's Portal built with **Next.js (App Router)** for the frontend and backend. It allows patients to view doctor information and blogs, and provides an admin panel for doctors to create, edit, and manage their blog posts.

---

## 🗂️ **Folder Structure**

```
culinary-medicine-website/
├── app
│   ├── api            # Next.js API Routes (server-side logic)
│   ├── admin          # Admin portal for CRUD operations
│   ├── blogs          # Blog listing and details pages
│   ├── components     # Shared React components
│   ├── services       # API calls and service logic
│   └── types          # TypeScript types
│
├── node_modules
├── package.json
├── turbo.json
├── tsconfig.json
└── README.md
```

- **api**: All backend API routes for blogs, users, etc.
- **admin**: Admin portal to manage blogs.
- **blogs**: Blog listing and detail pages.
- **components**: Reusable components.
- **services**: Services for API interactions.
- **types**: Type definitions for TypeScript.

---

## 🚀 **Getting Started**

### 1️⃣ **Clone the repository**

```bash
git clone <repository-url>
cd <repository-name>
```

### 2️⃣ **Install dependencies**

```bash
yarn install
```

If you are using npm:

```bash
npm install
```

### 3️⃣ **Run the application**

**To run the application:**

```bash
yarn dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ **Available Scripts**

| Script       | Description                               |
| ------------ | ----------------------------------------- |
| `yarn dev`   | Runs the application in development mode  |
| `yarn build` | Builds the application for production     |
| `yarn start` | Starts the application in production mode |
| `yarn lint`  | Runs the linter to check for code issues  |

---

## 💡 **Tech Stack**

- **Next.js (App Router)** - Full-stack application (frontend + backend)
- **TypeScript** - Type Safety
- **Turborepo** - Monorepo management
- **React** - UI Components

---

## ✅ **Next Steps**

- Implement **Admin CRUD Pages** (`admin/page.tsx`) for blog management.
- Setup **Database Connection** (MongoDB or PostgreSQL) for real-time data.
- Implement **Authentication & Authorization** for admin access.

Feel free to reach out for more information!

---

> Crafted with ❤️ using Next.js and TypeScript.
