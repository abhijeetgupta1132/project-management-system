# Project Management System

A full-stack web application to manage projects and tasks built with Node.js, Express, MySQL and React.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React.js
- **Database:** MySQL

## Features

- Create, view and delete projects
- Create, update and delete tasks
- Filter tasks by status (todo, in-progress, done)
- Sort tasks by due date
- Set task priority (low, medium, high)
- Pagination for projects
- Input validation and error handling

## Project Structure

```
project-management-system/
├── server.js
├── db.js
├── .env
├── routes/
│   ├── projects.js
│   └── tasks.js
└── frontend/
    └── src/
        ├── App.js
        ├── App.css
        └── components/
            ├── ProjectList.js
            └── TaskList.js
```

## Setup Instructions

### Prerequisites

- Node.js installed
- MySQL installed
- Git installed

### Step 1 - Clone the repository

```bash
git clone https://github.com/YOURUSERNAME/project-management-system.git
cd project-management-system
```

### Step 2 - Install backend dependencies

```bash
npm install
```

### Step 3 - Setup database

Open MySQL and run:

```sql
CREATE DATABASE project_management;
USE project_management;

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo','in-progress','done') DEFAULT 'todo',
    priority ENUM('low','medium','high') DEFAULT 'low',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### Step 4 - Configure environment variables

Create a `.env` file in root folder:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=project_management
PORT=3000
```

### Step 5 - Start backend server

```bash
node server.js
```

Server runs on http://localhost:3000

### Step 6 - Install and start frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3001

## API Documentation

### Projects

| Method | Endpoint      | Description                      |
| ------ | ------------- | -------------------------------- |
| POST   | /projects     | Create a new project             |
| GET    | /projects     | Get all projects with pagination |
| GET    | /projects/:id | Get single project               |
| DELETE | /projects/:id | Delete a project                 |

### Tasks

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| POST   | /projects/:project_id/tasks | Create a new task           |
| GET    | /projects/:project_id/tasks | Get all tasks for a project |
| PUT    | /:id/tasks/update           | Update task status          |
| DELETE | /:id/tasks/delete           | Delete a task               |

### Query Parameters

| Parameter | Description            | Example                         |
| --------- | ---------------------- | ------------------------------- |
| page      | Page number            | /projects?page=1                |
| limit     | Items per page         | /projects?limit=10              |
| status    | Filter tasks by status | /projects/1/tasks?status=todo   |
| sort      | Sort tasks by field    | /projects/1/tasks?sort=due_date |

## Example API Requests

### Create a project

```json
POST /projects
{
  "name": "Website Redesign",
  "description": "Redesign the company website"
}
```

### Create a task

```json
POST /projects/1/tasks
{
  "title": "Design homepage",
  "description": "Create mockups for homepage",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-05-20"
}
```

### Update task status

```json
PUT /1/tasks/update
{
  "status": "in-progress"
}
```

## Screenshots

See screenshots folder for UI screenshots.

## Author

Abhijeet Gupta
