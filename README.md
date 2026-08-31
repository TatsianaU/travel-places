# Travel Places

A React application for managing, exploring, filtering, and comparing travel destinations.

The project demonstrates a modern frontend architecture with server-state management, validated forms, reusable UI components, URL-based filtering, data tables, and efficient rendering of large datasets.

## Key Features

### Travel-place management

* Create, view, edit, and delete travel destinations
* Store the country, city, description, image, travel status, and visited year
* Validate forms with React Hook Form and Zod
* Display loading, error, empty, and success states
* Show user feedback through toast notifications

### Search and organization

* Search destinations by text
* Filter by country and travel status
* Sort by title, country, or visited year
* Add places to favorites
* Keep filter, sort, pagination, and view settings in URL parameters
* Reset invalid or outdated URL parameters safely

### Multiple views

* Switch between card and table layouts
* Configure visible table columns
* Paginate results
* Open individual destination pages
* Track recently viewed places
* Select and compare destinations

### Large-feed demonstration

The `/places/feed` page demonstrates three strategies for working with large collections:

* Manual “Load more” pagination
* Infinite scrolling with `IntersectionObserver`
* Virtualized rendering with overscan

The project includes a deterministic data-generation script that creates 2,000 travel posts for testing feed performance.

### User interface

* Light and dark themes
* Responsive layouts
* Skeletons and loading indicators
* Error states with retry actions
* Accessible labels and controls
* Custom popovers and reusable interface components

## Tech Stack

### Core

* React 19
* JavaScript
* Vite
* React Router

### Data and state management

* TanStack Query
* Zustand
* JSON Server
* URL search parameters
* Local storage

### Forms and validation

* React Hook Form
* Zod

### Tables and performance

* TanStack Table
* TanStack Virtual
* Intersection Observer API

### UI

* Radix UI Popover
* Lucide React
* CSS
* Tailwind CSS tooling

### Development tools

* ESLint
* Prettier

## Project Structure

```text
src/
├── api/          # Requests to the JSON Server API
├── components/   # Reusable interface components
├── data/         # Static data and travel-post configuration
├── features/     # Feature-specific state and data logic
├── hooks/        # Reusable React hooks
├── pages/        # Route-level components
├── App.jsx       # Application routes and shared layout
└── main.jsx      # Application entry point

scripts/
└── generate-travel-posts.mjs

docs/
└── Project notes and implementation exercises

db.json           # Development data for JSON Server
```

## Getting Started

### Requirements

* Node.js 20 or newer
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/TatsianaU/travel-places.git
cd travel-places
```

Install dependencies:

```bash
npm install
```

### Start the development API

Open the first terminal and run:

```bash
npm run serve:api
```

JSON Server will be available at:

```text
http://localhost:3001
```

### Start the frontend

Open a second terminal and run:

```bash
npm run dev
```

Vite will display the local application URL in the terminal.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run serve:api
```

Starts JSON Server on port `3001`.

```bash
npm run generate:travel-posts
```

Generates 2,000 deterministic travel-post records in `db.json`.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint.

## Main Routes

| Route              | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `/`                | Home page                                           |
| `/places`          | Searchable and filterable destination collection    |
| `/places/new`      | Create a destination                                |
| `/places/:id`      | Destination details                                 |
| `/places/:id/edit` | Edit a destination                                  |
| `/favorites`       | Favorite destinations                               |
| `/places/feed`     | Large-list loading and virtualization demonstration |
| `/about`           | Project information                                 |

## Current Status

The application is actively developed as a practical React project. It focuses on frontend architecture, API integration, state management, form validation, reusable components, and performance patterns for growing datasets.

