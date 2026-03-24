# Project Tracker UI

## Overview

This project is a frontend application built using React and TypeScript. It implements a multi-view project tracker with Kanban, List, and Timeline views using a shared dataset. All views update instantly without re-fetching data.

---

## Features

### Three Views

* Kanban View with four columns: To Do, In Progress, In Review, Done
* List View with sortable table
* Timeline View showing tasks on a time axis

---

### Kanban Board

* Tasks displayed as cards inside columns
* Each card shows:

  * Title
  * Assignee initials
  * Priority
  * Due date
* Overdue tasks highlighted
* Column task count displayed
* Columns scroll independently

---

### List View

* Tasks displayed in table format
* Sorting supported for:

  * Title
  * Priority
  * Due date
* Column headers toggle sort direction
* Inline status update using dropdown

---

### Timeline View

* Tasks shown as horizontal bars
* Based on start date and due date
* Today marked with a vertical line
* Tasks without start date shown as single-day markers
* Horizontal scrolling supported

---

### Custom Drag and Drop

* Implemented without any external library
* Cards can be moved between columns
* Placeholder maintains layout
* Invalid drop returns card to original position

---

### Virtual Scrolling

* Implemented manually for performance
* Only visible rows rendered with buffer
* Supports large datasets (500+ tasks)

---

### Data Generator

* Generates 500+ tasks with:

  * Random titles
  * Assignees
  * Priorities
  * Statuses
  * Dates
* Includes overdue tasks and tasks without start date

---

## Tech Stack

* React with TypeScript
* Zustand for state management
* CSS for styling

---

## Setup Instructions

1. Clone the repository
   git clone <repository-link>

2. Navigate to project
   cd project-tracker

3. Install dependencies
   npm install

4. Run the application
   npm start

---

## State Management

Zustand is used for managing global state. It allows sharing task data across all views efficiently without prop drilling.

---

## Virtual Scrolling Approach

Only visible rows in the viewport are rendered along with a buffer. This reduces DOM size and improves performance for large datasets.

---

## Drag and Drop Approach

Drag-and-drop is implemented using native browser events. A placeholder is used to prevent layout shifts, and the dragged element follows the cursor.

---

## Performance

The application is optimized to maintain smooth performance with large datasets and meets the required Lighthouse performance score.

---

## Explanation

The most challenging part was implementing drag-and-drop without using any external library while maintaining layout stability. Virtual scrolling also required careful handling of scroll position and rendering. With more time, the code structure and performance optimizations can be further improved.

---
