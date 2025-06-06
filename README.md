# SunCommunity Monorepo

This is a **TurboRepo-based monorepo** built with **Next.js**, **Tailwind CSS**, and **PNPM Workspaces**, supporting multiple apps (`admin`, `web`) and shared packages (`lib`, `ui`).

---

## 📁 Project Structure

```
.
├── apps/              # Application code (Next.js apps)
│   ├── admin/         # Admin dashboard app
│   └── web/           # Main user-facing website
├── packages/          # Shared packages
│   ├── lib/           # Shared business logic, types, utilities
│   └── ui/            # Reusable UI components (React + Tailwind)
├── tailwind.config.ts # Tailwind config (shared)
├── turbo.json         # Turborepo pipeline config
├── pnpm-workspace.yaml
```

---

## 🛠️ Tech Stack

- **Monorepo Tooling:** TurboRepo
- **Package Manager:** PNPM
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run All Apps

To start all apps and packages in development mode using Turborepo:

```bash
pnpm dev
```

### 4. Run Individual Apps

You can also run apps separately:

- **Web App (User-facing)**

```bash
pnpm --filter web dev
```

- **Admin App**

```bash
pnpm --filter admin dev
```

---

## 🌐 Accessing the Applications

- Web App: [http://localhost:3000](http://localhost:3000)
- Admin App: [http://localhost:3001](http://localhost:3001) _(adjust if custom port is used)_

Each app can be deployed independently and mapped to custom domains:

- `https://suncommunity.in/` → `apps/web`
- `https://admin.suncommunity.in/` → `apps/admin`

---

## 📦 Shared Packages

### `packages/lib`

- Business logic
- Mock data
- Shared types and utilities

### `packages/ui`

- Tailwind-styled reusable components like `Button`, `Card`, etc.

To use in an app:

```tsx
import { Button } from "@suncommunity/ui";
```

---

## 🎨 Styling with Tailwind

Tailwind is configured globally in the root `tailwind.config.ts` and used across apps and UI components.

Each app includes:

- `postcss.config.mjs`
- `globals.css`

No need to redefine Tailwind setup in each package.

---

## 🧪 Linting & Formatting

Run lint checks across the workspace:

```bash
pnpm lint
```

(Each app and package has its own `eslint.config.mjs`)

---

## 📦 Build

To build all apps and packages:

```bash
pnpm build
```

To build a specific app:

```bash
pnpm --filter web build
```

---

## 🧭 Turborepo Caching

Turbo optimizes builds and dev time using intelligent caching and task pipelining defined in `turbo.json`.

---

## 🧑‍💻 Contributing

1. Make changes in the appropriate app or package.
2. Use `pnpm dev` to verify your changes.
3. Push to a feature branch and open a PR.

---

## 📄 License

MIT

---

## 💬 Questions?

Reach out at: [support@suncommunity.in](mailto:support@suncommunity.in)
