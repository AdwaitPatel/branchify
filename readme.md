# Branchify

Branchify is a branch-aware environment orchestration tool for Node.js applications. It automatically provisions isolated development environments for each Git branch by generating branch-specific databases, assigning unique runtime ports, and managing application processes.

Inspired by modern preview deployment systems, Branchify brings structured environment isolation to local development workflows.

---

## Overview

Modern teams frequently work with multiple feature branches simultaneously. Shared databases and ports often lead to:

- Configuration conflicts  
- Broken development environments  
- Data overlap between branches  

Branchify solves this by automatically mapping:

> **One Git branch → One isolated environment**

Each branch receives:

- A unique database name  
- A unique runtime port  
- Independent process lifecycle  
- Environment metadata tracking  

Branchify integrates with Git hooks to detect branch changes and provision environments automatically.

---

## Core Concepts

### Branch-Aware Provisioning

When a developer switches to a branch:

```bash
git checkout feature-login
```

Branchify automatically:

- Detects the branch name  
- Generates a branch-specific database  
- Assigns an available port  
- Starts the application with overridden environment variables  
- Stores environment metadata  

---

### Environment Isolation

Each branch runs independently with:

- Separate database instance (MongoDB, PostgreSQL, or MySQL)  
- Dedicated runtime port  
- Independent process ID  
- Isolated configuration context  

This prevents data collisions and runtime conflicts during parallel development.

---

## Architecture

High-level workflow:

```
Git Branch Change
        ↓
Git Hook Triggered (post-checkout)
        ↓
Branchify CLI Executes
        ↓
Provision Database + Port
        ↓
Start Application Process
        ↓
Store Metadata in Control Database
        ↓
Expose Status via API
        ↓
Display in Dashboard
```

---

## Features

### MVP Features

- Detect current Git branch  
- Generate branch-specific database names  
- Assign dynamic available ports  
- Start application with overridden environment variables  
- Track process ID and status  
- Stop running environments  
- Local metadata storage  

### v1.0 Features

- Automatic Git hook installation  
- Express control API  
- React-based dashboard  
- MongoDB control database  
- Database adapters (MongoDB, PostgreSQL, MySQL)  
- Environment lifecycle management  
- Process tracking and recovery  
- Log management  
- Environment cleanup on branch deletion  
<!--
---

## Installation

Install globally:

```bash
npm install -g branchify
```

Or use via npx:

```bash
npx branchify init
```

---

 ## CLI Commands

Initialize Branchify:

```bash
branchify init
```

Synchronize current branch environment:

```bash
branchify sync
```

Start environment manually:

```bash
branchify start
```

Stop current environment:

```bash
branchify stop
```

List all environments:

```bash
branchify list
```

Delete environment:

```bash
branchify delete <branch-name>
``` -->

---

## Configuration

Branchify reads your base `.env` file and derives branch-specific configurations at runtime.

Example base configuration:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=app_db
DB_TYPE=postgres
PORT=3000
```

For a branch named `feature-login`, Branchify generates:

```env
DB_NAME=feature_login_db
PORT=3002
```

The original `.env` file remains unchanged.

---

## Supported Databases

Branchify is database-agnostic.

### MongoDB

- Database auto-created on first write  
- No explicit provisioning required  

### PostgreSQL / MySQL

- Executes `CREATE DATABASE`  
- Runs existing migrations  
- Uses shared credentials  

---

## Data Model (Control Database)

Example environment metadata:

```json
{
  "branch": "feature-login",
  "port": 3002,
  "dbName": "feature_login_db",
  "status": "running",
  "pid": 8231,
  "createdAt": "2026-02-17T10:00:00Z",
  "updatedAt": "2026-02-17T10:05:00Z"
}
```

---

## Dashboard

Branchify includes a web dashboard for:

- Viewing active environments  
- Monitoring status  
- Viewing assigned ports  
- Restarting environments  
- Deleting environments  
- Viewing logs  

The dashboard communicates with the Express API to retrieve real-time environment state.

---

## Use Cases

- Parallel feature development  
- Preventing database conflicts  
- Testing multiple branches simultaneously  
- Isolated debugging sessions  
- Structured local DevOps workflows  

---

## Why Branchify

Traditional development workflows share a single database and runtime environment across all branches. This leads to:

- Accidental data pollution  
- Configuration conflicts  
- Difficult parallel testing  
- Fragile staging environments  

Branchify introduces structured isolation without requiring containers or complex infrastructure.

---

## Roadmap

- Advanced log streaming  
- Docker-based environment provisioning  
- Cloud deployment integration  
- Team-based multi-user support  
- Environment analytics and usage tracking  

---

## License

MIT License

---
