# Branchify

Branchify automatically provisions isolated development environments based on Git branches.  
When a developer switches branches, the appropriate environment configuration is loaded and a dedicated environment instance is created.

This allows developers to work on multiple features simultaneously without configuration conflicts.

---

## Problem

Modern development teams frequently work with multiple branches such as:

main
staging/*
feature/*

Each branch may require different:

- environment variables
- database instances
- runtime configurations
- ports or services

Managing these manually can lead to:

- configuration conflicts
- accidental production usage
- broken development setups

---

## Solution

Branchify automates environment management by:

1. Detecting Git branch changes using Git hooks
2. Mapping branches to environments (dev / staging / prod)
3. Loading the correct environment configuration
4. Provisioning an isolated environment via a backend service
5. Persisting environment state using MongoDB

---

## Architecture

Developer
   |
   | git checkout feature/login
   v
Git Hook (post-checkout)
   |
   v
switch-env.sh
   |
   |-- detects branch type
   |-- loads environment configuration
   |-- calls backend API
          |
          v
Express Backend
   |
   |-- provisions environment
   |-- allocates port
   |-- generates database
          |
          v
MongoDB
(persistent environment storage)

---

## Project Structure
```
branchify/
│
├── client/
│   └── frontend UI
│
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── manager/
│   │   │   └── envManager.js
│   │   └── models/
│   │       └── Environment.js
│   │
│   ├── server.js
│   └── package.json
│
├── scripts/
│   ├── branchify.sh
│   ├── install.sh
│   └── switch-env.sh
│
├── tasks.md
└── README.md
```
---

## Features

Automatic Environment Switching

Branchify detects branch changes and loads the appropriate environment configuration automatically.

Example:

git checkout feature/login

Branchify detects the branch and loads the development configuration.

---

Branch-Based Environment Mapping

Branch Pattern        Environment
--------------------------------
main                  production
staging/*             staging
feature/*             development

---

Environment Provisioning

When a branch is used for the first time, Branchify:

- creates a dedicated environment
- assigns a unique port
- generates a database name
- stores environment metadata

Example:

feature/login
port: 3002
database: feature_login_db

---

Persistent Environment Storage

Environment metadata is stored in MongoDB.

Example record:

{
  branch: "feature_login",
  port: 3002,
  dbName: "feature_login_db",
  status: "running",
  pid: 4123
}

---

## Installation

Clone the repository:

git clone https://github.com/<your-username>/branchify.git

Install server dependencies:

cd server
npm install

Start MongoDB.

Start the backend server:

node server.js

---

## Using Branchify in Another Repository

Install Branchify into your project:

./scripts/install.sh <path-to-your-repository>

This creates:

.branchify/
  environments/
    dev/.env
    staging/.env
    prod/.env

---

## Configure Environments

Edit environment configurations:

.branchify/environments/dev/.env
.branchify/environments/staging/.env
.branchify/environments/prod/.env

Example:

NODE_ENV=development
MONGO_URL=mongodb://localhost/dev_db
API_SECRET=my-secret

---

## Usage

Switch branches normally:

git checkout feature/payment

Branchify will automatically:

- detect the branch
- load the correct configuration
- create an environment
- assign a database and port

---

## Example

git checkout feature/frontend

Output:

Current Git Branch: feature/frontend
Mapped Environment: dev
Applying environment configuration...
Environment created

Environment created:

port: 3002
database: feature_frontend_db

---

## CLI Commands

Show environments:

./branchify.sh status

Delete environment for a branch:

./branchify.sh delete <branch>

Example:

./branchify.sh delete feature_login

---

## Technologies Used

Bash — CLI automation  
Git Hooks — branch detection  
Node.js — backend orchestration  
Express.js — API layer  
MongoDB — persistent storage  
Node IPC — environment manager communication

---

## Future Improvements

Possible improvements include:

- Cross-platform CLI support (Linux / Mac / Windows)
- Docker-based environment isolation
- Automatic backend startup
- Environment dashboard UI
- npm-installable CLI tool
- Preview deployments per branch

---

## Inspiration

Branchify draws inspiration from modern DevOps systems such as:

- Vercel Preview Environments
- Heroku Review Apps
- Docker Compose development environments

---

## License

MIT License
