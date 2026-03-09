# TravelWishlist

A React front-end application for DIG 4503 — Midterm Project.

Browse destinations, save places to `localStorage`, attach personal notes and ratings, and organize trips by region — all without a backend.

---

## Tech Stack

- **React 19** via Vite
- **CSS custom properties** (no external UI library)
- `localStorage` for all persistence
- Regex-based form validation (no third-party validation library)

---

## Project Plan

The project is split into five feature steps, each building on the last.

---

### Step 1 — Authentication (Sign Up / Login)

**Goal:** Users can create an account and log back in. Credentials are stored in `localStorage`.

**Implementation details:**
- `/signup` route with controlled form fields: username, email, password, confirm password
- Regex validation rules applied on submit and on blur:
  - Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Password: minimum 8 characters, at least one digit and one uppercase letter
- Passwords are hashed client-side with a simple algorithm (SHA-256 via `crypto.subtle`) before storage
- On success, redirect to `/dashboard`
- `/login` route validates credentials against stored records
- Auth state held in React context (`AuthContext`); persisted across page refreshes via `localStorage`

**Files to create:**
```
src/context/AuthContext.jsx
src/pages/SignUpPage.jsx
src/pages/LoginPage.jsx
src/components/FormField.jsx
```

---

### Step 2 — Destination Browser

**Goal:** Display a browsable grid of destinations with search and filter controls.

**Implementation details:**
- Static destination data lives in `src/data/destinations.js` (50+ entries with name, region, country, image URL, description, tags)
- `DestinationCard` component shows thumbnail, name, country, and a "Save" toggle button
- Search bar filters by name or country (case-insensitive)
- Region filter buttons (Africa, Americas, Asia, Europe, Oceania) narrow the grid
- Results count shown dynamically
- Saved state is read from `localStorage` so the heart icon reflects existing wishlist items

**Files to create:**
```
src/data/destinations.js
src/pages/BrowsePage.jsx
src/components/DestinationCard.jsx
src/components/SearchBar.jsx
src/components/RegionFilter.jsx
```

---

### Step 3 — Wishlist & localStorage Persistence

**Goal:** Users can save and remove destinations; the wishlist survives page refreshes.

**Implementation details:**
- Custom hook `useWishlist` wraps all `localStorage` read/write logic
  - `addToWishlist(destination)` — stores full destination object keyed by `id`
  - `removeFromWishlist(id)` — removes entry
  - `isWishlisted(id)` — returns boolean
- `/wishlist` route lists saved destinations in a responsive grid
- Empty state with call-to-action to browse destinations
- Optimistic UI: toggle is instant, storage write happens asynchronously

**Files to create:**
```
src/hooks/useWishlist.js
src/pages/WishlistPage.jsx
```

---

### Step 4 — Notes & Star Ratings

**Goal:** Each wishlisted destination can have a personal note and a 1–5 star rating.

**Implementation details:**
- Clicking a wishlist card opens a `DestinationDetailModal`
- Modal contains:
  - Read-only destination info (name, country, description)
  - Textarea for free-text notes (max 500 characters, character counter shown)
  - Interactive star rating widget (click to set, hover to preview)
  - "Save" button writes note + rating back to the wishlist entry in `localStorage`
- Notes and ratings appear as a summary on the wishlist card (truncated to 80 chars)
- Rating displayed as filled/empty star icons

**Files to create:**
```
src/components/DestinationDetailModal.jsx
src/components/StarRating.jsx
```

---

### Step 5 — Trip Organization

**Goal:** Users can create named trips and assign wishlisted destinations to them.

**Implementation details:**
- `/trips` route lists all user-created trips stored in `localStorage`
- "New Trip" modal: name field (required, max 40 chars) + optional description
- Each trip displays a cover (first destination's image or placeholder), name, destination count
- Drag-and-drop (via native HTML5 DnD API) to reorder destinations inside a trip
- A destination can belong to multiple trips
- Trips are stored as `{ id, name, description, destinationIds: [] }` in `localStorage`
- Delete trip confirmation dialog before removal

**Files to create:**
```
src/pages/TripsPage.jsx
src/components/TripCard.jsx
src/components/TripModal.jsx
src/hooks/useTrips.js
```

---

## Running the App

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
npm run preview
```

---

## Folder Structure (planned)

```
src/
├── assets/
├── components/
│   ├── DestinationCard.jsx
│   ├── DestinationDetailModal.jsx
│   ├── FormField.jsx
│   ├── RegionFilter.jsx
│   ├── SearchBar.jsx
│   ├── StarRating.jsx
│   ├── TripCard.jsx
│   └── TripModal.jsx
├── context/
│   └── AuthContext.jsx
├── data/
│   └── destinations.js
├── hooks/
│   ├── useTrips.js
│   └── useWishlist.js
├── pages/
│   ├── BrowsePage.jsx
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignUpPage.jsx
│   ├── TripsPage.jsx
│   └── WishlistPage.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```
