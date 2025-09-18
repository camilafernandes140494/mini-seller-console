# Mini Seller Console

A lightweight console to manage and triage leads, and convert them into opportunities. Built with **React**, **TypeScript**, and **Tailwind CSS**. This project demonstrates a clean structure, responsive UI, and modern frontend best practices.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Architecture](#architecture)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Tech Stack](#tech-stack)  
- [Future Improvements](#future-improvements)  

---

## Project Overview

The Mini Seller Console is designed as a lightweight dashboard to manage **leads** and convert them into **opportunities**. This project focuses on **frontend architecture, state management, and UX considerations**, simulating API calls using local JSON data.

Key goals:  

- Display a searchable, sortable, and filterable list of leads  
- Show a detailed panel for each lead with inline editing  
- Convert leads into opportunities  
- Handle basic loading, empty, and error states  

---

## Features

### MVP Features

1. **Leads List**  
   - Load from `data/leads.json`  
   - Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`  
   - Search by name/company, filter by status, sort by score (desc)  

2. **Lead Detail Panel**  
   - Slide-over panel on row click  
   - Inline edit for `status` and `email` (with validation)  
   - Save/cancel with basic error handling  

3. **Convert to Opportunity**  
   - Button to convert a lead  
   - Opportunity fields: `id`, `name`, `stage`, `amount` (optional), `accountName`  
   - Display opportunities in a simple table  

4. **UX/States**  
   - Loading, empty, and simple error states  
   - Smooth handling of ~100 leads  

### Nice-to-Haves (Optional Implemented)  
- Persist filters/sorting in `localStorage`  
- Optimistic updates with rollback simulation  
- Responsive layout for desktop and mobile  

---

## Architecture

- **React + Vite** for fast development  
- **Tailwind CSS** for styling and responsive design  
- **TypeScript** for type safety  
- Local JSON used as the data source (`data/leads.json`)  
- Components organized as:
  - `components/LeadList.tsx`  
  - `components/LeadDetailPanel.tsx`  
  - `components/OpportunitiesTable.tsx`  
- Types defined in `types/lead.ts` and `types/opportunity.ts`  

---

## Getting Started

### Prerequisites

- Node.js >= 18.x  
- Yarn or npm  

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd mini-seller-console

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev


Usage

Open http://localhost:5173

Browse leads, edit details, and convert them into opportunities

Project Structure

src/
  components/
    LeadList.tsx
    LeadDetailPanel.tsx
    OpportunitiesTable.tsx
  data/
    leads.json
  pages/
    Dashboard.tsx
  types/
    lead.ts
    opportunity.ts
  App.tsx
  main.tsx

Tech Stack

React 18 + TypeScript

Vite (bundler)

Tailwind CSS (styling)

React Query / Zustand / Context API (optional for state management)

Local JSON + simulated latency with setTimeout

Future Improvements

Add pagination for leads

Full mobile-first responsive design

Add unit and integration tests (Jest + React Testing Library)

Implement drag & drop for reordering opportunities