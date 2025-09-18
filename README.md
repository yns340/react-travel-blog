# Travel Blog 🧳

A simple React travel blog app with routing and persistent storage.

---

## Description

This project is a travel blog application built with React. It features three pages using **React Router** for navigation, dynamic routes with `useParams`, and search functionality powered by URL query parameters (`useSearchParams`). Data is persisted in `localStorage` with a custom hook, and search input is debounced for performance optimization. Icons are imported from the **lucide-react** library.

---

## Features

- 3 separate pages with **React Router**
- Dynamic routes using `useParams`
- Search trips with URL query parameters (`useSearchParams`)
- Persistent data storage using `localStorage` via a custom hook
- Debounced search input with a custom `useDebounce` hook
- Icons via **lucide-react**
- Styling with TailwindCSS

---

## Technologies & Tools

- React (with functional components and hooks)
- React Router (basic routing, dynamic routes, search params)
- TailwindCSS for styling
- pnpm as package manager
- lucide-react for icons
- Custom hooks written in JavaScript (`useStorage.js`, `useDebounce.js`)

---

## Notes

This project is a learning exercise from my frontend internship focused on React Router, localStorage usage, and React fundamentals.
