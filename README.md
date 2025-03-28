# Message Board Project

## Prerequisites

Before getting started, you'll need to have the following installed on your system:

### For all operating systems:

1. **Node.js** (v14 or higher recommended)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`
2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`
3. **PostgreSQL**
   - **Windows**:
     - Install Chocolatey package manager from [chocolatey.org](https://chocolatey.org/install)
     - Open Command Prompt as Administrator and run:
       ```bash
       choco install postgresql
       ```
     - Alternatively, you can download the installer from [postgresql.org](https://www.postgresql.org/download/windows)
     - After installation, verify PostgreSQL is in your PATH:
       ```bash
       psql --version
       ```
     - If you encounter issues, you may need to add PostgreSQL to your PATH manually.
   - **macOS**:
     - Install Homebrew from [brew.sh](https://brew.sh/)
     - Open Terminal and run:
       ```bash
       brew install postgresql
       ```
     - Verify installation: `psql --version`

### PostgreSQL User Setup

You need to have a `postgres` user. Verify this by running:

```bash
psql -U postgres
```

If you don't have a `postgres` user:

1. First log in as a superuser (replace `<your_superuser>` with your superuser name):

```bash
psql -U <your_superuser>
```

2. Then create the user:

```sql
CREATE ROLE postgres WITH SUPERUSER LOGIN PASSWORD 'your_password';
```

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Create the database and tables (see below for details):

```bash
npm run setup
```

3. Start the server:

```bash
npm start
```

4. Open your browser and navigate to:

```
http://localhost:8080
```

5. To clean up the database (you need to re-run `npm run setup` afterwards):

```bash
npm run cleanup
```

## Project Structure

### Root Files

- `package.json`: Contains project metadata and scripts (don't edit manually)
- `package-lock.json`: Auto-generated dependency tree (don't edit)
- `svr.js`: Main Express server file
- `setup-db.js`: Database initialization script
- `cleanup-db.js`: Database removal script

### Client Directory

These files are served to the client. You can add more files here as needed but ensure that `index.html` is the main entry point of your application. CSS goes here too.

- `index.html`: Main HTML page
- `index.js`: Client-side JavaScript

### Database Directory

This directory contains SQL files for database setup and management. You can add more SQL files here as needed but ensure that the main files are named as follows:

- `create-db.sql`: Creates the message_board database
- `create-tables.sql`: Defines the database schema
- `seed-data.sql`: Contains initial data
- `drop-db.sql`: Removes the database

## Notes

- The database is created from scratch each time you run `npm run setup`
- The database is named `message_board` and will persist between server restarts
- Run `npm run cleanup` before `npm run setup` to start fresh
