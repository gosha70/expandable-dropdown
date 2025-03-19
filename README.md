# Node Relationship Selection UI

This repository provides a **TypeScript + React** demonstration of a multi‐column, **expandable** dropdown for selecting database tables, fields, and foreign key relationships. It also supports **search** with highlighting of the relevant fields and **only** their ancestor paths.

---

## Table of Contents

- [Overview](#overview)
  - [Example Data Structure](#example-data-structure)
  - [Key Requirements](#key-requirements)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Build](#installation-and-build)
  - [Running the App](#running-the-app)
- [Usage](#usage)
  - [Accessing the UI](#accessing-the-ui)
  - [Expanding Relationships](#expanding-relationships)
  - [Searching](#searching)
- [Credits](#credits)

---

## Overview

This application showcases a **dropdown component** that renders database table relationships in multiple columns. Each time you expand a relationship node, a new column (card layout) appears to the right, listing the fields of the related table. There’s also a **search bar** that highlights any fields matching the search term—and highlights only their **direct** ancestry.

### Example Data Structure

We imagine three tables:

- **TableA**  
  - `id (PK)`
  - `field1`
  - `field2`
  - `fieldB (FK -> TableB)`

- **TableB**  
  - `id (PK)`
  - `field1`
  - `fieldC (FK -> TableC)`

- **TableC**  
  - `id (PK)`
  - `field2`

In this model, TableA relates to TableB, which in turn relates to TableC. The code (in `buildData.ts`) produces a hierarchical `ChoiceNode[]`, such as:

```
[ { label: "TableA", isGroupNode: true, ... },
  { label: "id", isGroupNode: false, ... },
  { label: "field1", isGroupNode: false, ... },
  { label: "field2", isGroupNode: false, ... },
  { label: "fieldB", isGroupNode: true, subNodes: [
      { label: "TableB", isGroupNode: true, ... },
      { label: "id", ... },
      { label: "field1", ... },
      { label: "fieldC", isGroupNode: true, subNodes: [
          { label: "TableC", ... },
          { label: "id", ... },
          { label: "field2", ... }
      ]}
  ]}
]
```

### Key Requirements

- **Top Node** (e.g. `[TableA]`) is not expandable/collapsible if it’s the first item in each column.  
- **Relationship fields** (`[fieldB]`, `[fieldC]`, etc.) can be expanded to reveal new columns.  
- **Search** for a particular field name (e.g. `"field2"`) highlights the matching node(s) and **only** their direct ancestors in the chain, without highlighting unrelated branches or sub‐columns.

---

## Project Structure

A minimal structure might look like:

```
.
├── package.json
├── tsconfig.json
├── vite.config.ts        // Vite config for building the React front end
├── src
│   ├── server.ts         // Express server
│   ├── buildData.ts      // Example data creation (ChoiceNode[] for TableA, B, C)
│   ├── choiceNode.ts     // ChoiceNode class definition
│   ├── search.ts         // highlightNodes, clearHighlight utility
│   ├── App.tsx           // Main React application
│   ├── ChoiceDropdown.tsx// Multi-column relationship dropdown component
│   └── index.html        // The HTML entry point for Vite
└── dist
    ├── server.js
    └── client
        └── index.html
```

---

## Getting Started

### Prerequisites

- **Node.js** (v14+ recommended) and **npm**  
- (Optional) A modern browser like Chrome or Firefox for development.

### Installation and Build

1. **Clone** the repo (or download the ZIP):
   ```bash
   git clone https://github.com/your-username/node-relationship-ui.git
   cd node-relationship-ui
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build** both server (TypeScript) and client (Vite):
   ```bash
   npm run build
   ```
   - This runs two steps:  
     - `npm run build:server` → compiles your Express server to `dist/server.js`.  
     - `npm run build:client` → uses Vite to bundle the React front end into `dist/client`.

### Running the App

```bash
npm start
```
- Starts the Node/Express server on `http://localhost:3000`.
- Serves the React UI (from `dist/client/index.html`) at the root path.
- Provides a JSON endpoint at `GET /api/choices` returning the example `ChoiceNode[]`.

---

## Usage

### Accessing the UI

- Open your browser to [http://localhost:3000/](http://localhost:3000/).  
- You should see a **Node Relationship Selection UI** page with a single search box and a multi-column “dropdown” area.

### Expanding Relationships

- The “top‐node” for each column (for example, `[TableA]` in the first column) is **not** expandable.  
- Relationship fields like `[fieldB]` or `[fieldC]` show a `>` or `<` icon to the **right** of the label. Click it to **expand** and open the next column listing the related table’s fields.

### Searching

- Type into the “Search fields…” box (e.g., **`field2`**).  
- Matching fields (and **only** their direct ancestor path) turn highlighted (usually a yellow color). This helps you quickly locate any occurrences of `field2` across all the tables.

**Example**: Searching for “field2” might highlight `field2` in TableA, plus the `[fieldB]` node that leads to TableB → `[fieldC]` → `[TableC]` → `field2`, each ancestor node also highlighted.

---

## Credits

- **Table and field data**: Provided as an illustrative example in `buildData.ts`.  
- **ChoiceNode** class: Defines the data structure for each table/relationship/field node.  
- **React + Vite**: Simplifies bundling and developing the front end.  
- **Express**: Serves both the JSON data and the client UI.  

Feel free to adapt or extend this sample to your own database introspection, advanced searching, or selection workflows!