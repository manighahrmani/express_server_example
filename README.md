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

1. Configure your database settings in `db-config.json`. The `database` field (e.g. `message_board`) is used consistently for setup and connection:

```json
{
  "user": "postgres",
  "host": "localhost",
  "database": "message_board",
  "password": "",
  "port": 5432
}
```

2. Install dependencies:

```bash
npm install
```

3. Create the database and tables:

```bash
npm run setup
```

4. Start the server:

```bash
npm start
```

5. Open your browser and navigate to:

```
http://localhost:8080
```

6. To clean up the database (you need to re-run `npm run setup` afterwards):

```bash
npm run cleanup
```

## Project Structure

### Root Files

- `db-config.json`: Editable database connection settings
- `package.json`: Contains project metadata and scripts
- `package-lock.json`: Auto-generated dependency tree
- `svr.js`: Main Express server file
- `README.md`: Project instructions and structure guide

### Client Directory

These files are served to the client. Ensure `index.html` is the entry point.

- `index.html`: Main HTML page
- `index.js`: Client-side JavaScript

### do-not-edit Directory

These files manage backend setup. Do not edit them.

- `db.js`: Database utilities and shared connection
- `setup-db.js`: Database initialisation script
- `cleanup-db.js`: Database removal script

### Database Directory

This directory contains SQL files for database setup and management.

- `create-db.sql`: Creates the message_board database
- `create-tables.sql`: Defines the schema
- `seed-data.sql`: Initial data
- `drop-db.sql`: Removes the database

## Notes

- The database is created from scratch each time you run `npm run setup`
- The `database` name is defined in `db-config.json` and used throughout
- Run `npm run cleanup` before `npm run setup` to start fresh

