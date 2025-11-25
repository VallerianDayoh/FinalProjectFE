# Prompt for Lovable / AI Code Generator

**Role:** Expert Senior React Developer & UI/UX Designer.
**Task:** Build a complete, production-ready Digital Marketing Agency website.
**Tech Stack:** Vite, React, Tailwind CSS, React Router DOM, Axios, Lucide React (icons).
**Backend:** `json-server` (mock REST API).

## Project Overview
Create a modern, high-converting marketing agency website named "Elevate Digital". The site requires a public landing page to display services and an Admin Dashboard to manage these services (CRUD).

## Design Requirements (Aesthetics)
- **Theme:** Modern, Premium, Tech-forward.
- **Color Palette:** Deep Indigo/Violet primary, Slate/Gray text, White background with subtle gradients.
- **UI Elements:** Glassmorphism effects, soft shadows (`shadow-lg`), rounded corners (`rounded-xl`), and responsive grid layouts.
- **Responsiveness:** Fully responsive for Mobile, Tablet, and Desktop.

## Functional Requirements (CRUD)
You must implement full CRUD operations for the **"Services"** entity.
The API endpoint will be: `http://localhost:3000/services`

1.  **READ (GET):**
    - Fetch and display all services on the **Home Page** (Public view).
    - Fetch and display all services in a Table/List on the **Admin Dashboard**.
2.  **CREATE (POST):**
    - A form in the Admin area to add a new service.
    - Fields: `title` (string), `description` (text), `price` (string), `icon` (string/select).
3.  **UPDATE (PUT):**
    - Ability to edit an existing service's details from the Admin Dashboard.
    - Pre-fill the form with existing data.
4.  **DELETE (DELETE):**
    - Button to remove a service from the Admin Dashboard with a confirmation check.

## Architecture & File Structure
Use a clean, component-based architecture.
```text
src/
  ├── components/       # Reusable UI components
  │   ├── Button.jsx
  │   ├── Input.jsx
  │   ├── ServiceCard.jsx
  │   ├── Navbar.jsx
  │   └── Footer.jsx
  ├── pages/            # Main Page Views
  │   ├── Home.jsx      # Public Landing Page
  │   ├── AdminDashboard.jsx # List of services + Actions
  │   └── ServiceForm.jsx    # Add/Edit Form (Reusable)
  ├── services/
  │   └── api.js        # Axios setup & API functions (getServices, deleteService, etc.)
  ├── App.jsx           # Routing setup
  └── main.jsx
```

## Step-by-Step Implementation Instructions for the AI

### Step 1: Setup & Dependencies
- Initialize a Vite + React project.
- Install: `react-router-dom`, `axios`, `lucide-react`, `clsx`, `tailwind-merge`.
- Setup Tailwind CSS configuration.

### Step 2: Database (`db.json`)
Create a `db.json` file in the root with this initial data:
```json
{
  "services": [
    {
      "id": "1",
      "title": "SEO Optimization",
      "description": "Boost your organic traffic with our data-driven SEO strategies.",
      "price": "$500/mo",
      "icon": "Search"
    },
    {
      "id": "2",
      "title": "Social Media Marketing",
      "description": "Engage your audience across all major social platforms.",
      "price": "$300/mo",
      "icon": "Share2"
    },
    {
      "id": "3",
      "title": "Content Creation",
      "description": "High-quality content that resonates with your target audience.",
      "price": "$100/article",
      "icon": "PenTool"
    }
  ]
}
```

### Step 3: API Service (`src/services/api.js`)
Create a centralized API file using Axios to handle all HTTP requests to `http://localhost:3000`.

### Step 4: Components
- **Navbar**: Responsive navigation with links to Home and Admin.
- **ServiceCard**: A beautiful card component to display service info on the Home page.
- **Button**: A reusable button component with variants (primary, secondary, danger).

### Step 5: Pages Implementation
- **Home.jsx**: A Hero section (Title: "Grow Your Business with Elevate", Subtitle, CTA Button) followed by a "Our Services" grid section fetching data from `db.json`.
- **AdminDashboard.jsx**: A table view of all services. Columns: Title, Price, Actions (Edit, Delete). Includes a "Add New Service" button.
- **ServiceForm.jsx**: A form to handle both Creating and Editing services. If an ID is present in the URL, it acts as "Edit", otherwise "Create".

### Step 6: Routing (`App.jsx`)
Setup routes:
- `/` -> Home
- `/admin` -> AdminDashboard
- `/admin/add` -> ServiceForm (Create mode)
- `/admin/edit/:id` -> ServiceForm (Edit mode)

## Important Constraints
- **NO Placeholders**: The code must be complete and functional.
- **Error Handling**: Handle API errors gracefully (e.g., show an alert if the server is down).
- **Styling**: Ensure the design is "Marketing" quality—visually appealing, good whitespace, and typography.

---
**User Instruction:**
1. Copy the prompt above.
2. Paste it into Lovable.
3. Run `npx json-server db.json --port 3000` in a separate terminal to start the backend before testing the app.
