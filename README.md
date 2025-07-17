# Client & Project Management System (Next.js)

A modern, full-featured client and project management dashboard built with Next.js, React, and Tailwind CSS. This app provides secure authentication, robust client/project CRUD, and a responsive, user-friendly interface.

---

## 🚀 Features

- **Authentication**: JWT-based login, signup, and protected routes
- **Clients**: Add, view, edit, delete clients; see client details and their projects
- **Projects**: Add, view, edit, delete projects; assign to clients; see project details
- **Dashboard**: Quick stats for clients and projects
- **Responsive UI**: Mobile-first, with adaptive navigation and layouts
- **Role-based Access**: Admin-only actions for sensitive operations
- **API Integration**: Fully aligned with backend contract (see below)

---

## 🗂️ Folder Structure

```
src/
  app/
    auth/           # Auth pages (login, signup)
    clients/        # Client list, new, [id], [id]/edit
    projects/       # Project list, new, [id], [id]/edit
    dashboard/      # Dashboard page
    ...
  components/       # Reusable UI components (Layout, ProtectedRoute, etc.)
  contexts/         # React context (AuthContext)
  hooks/            # Custom hooks (use-toast, etc.)
  services/         # API service (axios wrapper)
  styles/           # Tailwind/global CSS
```

---

## 🛠️ Setup & Installation

### 1. **Clone the Repository**

```sh
git clone <repo-url>
cd <repo-folder>
```

### 2. **Install Dependencies**

```sh
npm install
# or
pnpm install
```

### 3. **Configure Environment Variables**

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Adjust the URL to match your backend.

### 4. **Run the Development Server**

```sh
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. **Build for Production**

```sh
npm run build
npm start
```

---

## 🔒 Authentication

- JWT-based, stored in localStorage
- `/auth/login` and `/auth/signup` endpoints
- Auth state managed in `AuthContext`
- Protected routes via `ProtectedRoute` component

---

## 👥 Clients

- **List:** `/clients` — view all clients
- **Add:** `/clients/new` — create a new client
- **Detail:** `/clients/[id]` — view client details and their projects
- **Edit:** `/clients/[id]/edit` — update client info
- **Delete:** from client list or detail page (admin only)

---

## 📁 Projects

- **List:** `/projects` — view all projects
- **Add:** `/projects/new` — create a new project (assign to client)
- **Detail:** `/projects/[id]` — view project details (name, description, status, deadline, client info)
- **Edit:** `/projects/[id]/edit` — update project info
- **Delete:** from project list or detail page (admin only)

---

## 🧩 Navigation & Layout

- Responsive navbar with dashboard, clients, projects
- User dropdown with logout
- Mobile-friendly: nav links stack, user dropdown stays accessible

---

## 🔗 API/Backend Alignment

All API calls and data structures match the backend contract:

- **Project:** `{ id, name, description, status, deadline, clientId, client: { id, name, email }, createdAt }`
- **Client:** `{ id, name, email, phone, ... }`
- **Auth:** `{ user, token }` on login/signup; `{ user }` on profile
- All endpoints require JWT in `Authorization` header (except login/signup)

---
