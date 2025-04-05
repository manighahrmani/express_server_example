# Message Board Project

## Prerequisites

Before getting started, you'll need to have the following installed on your system:

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
   - **macOS**:
     - Install Homebrew from [brew.sh](https://brew.sh/)
     - Open Terminal and run:
       ```bash
       brew install postgresql
       ```
     - After installation, verify PostgreSQL is in your PATH:
       ```bash
       psql --version
       ```

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

You also need to have a database named `postgres` already in place. This is the default database created by PostgreSQL.

1. You can check if it exists by running:

```bash
psql -U postgres -l
```

2. If it doesn't exist, log in as a superuser and create it:

```bash
psql -U <your_superuser>
```

3. Then run the following command to create the database:

```sql
CREATE DATABASE postgres WITH OWNER postgres;
```

## Project Setup

1. Edit your database settings in `db-config.js`. The `database` field (e.g. `message_board`) is used consistently for setup and connection:

```js
export default {
  user: "postgres", // Your PostgreSQL username
  host: "localhost", // Your PostgreSQL host (usually localhost)
  database: "message_board", // The DB your app will use (make sure this doesn't exist yet)
  adminDatabase: "postgres", // The DB used when creating/dropping the app DB (make sure this exists)
  password: "", // Your PostgreSQL password (leave empty if no password)
  port: 5432, // Your PostgreSQL port (default is 5432)
};
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

### Files On the Root Directory

- `db-config.json`: Editable database connection settings
- `package.json`: Contains project metadata and scripts (Do not edit manually)
- `package-lock.json`: Auto-generated dependency tree (Do not edit)
- `server.js`: Editable main Express server file
- `README.md`: Project instructions and structure guide

### Client Directory (`client`)

These files are served to the client. Ensure `index.html` is the entry point.

- `index.html`: Editable main HTML page
- `index.js`: Editable client-side JavaScript

### Database Directory (`db`)

This directory contains SQL files for schema and seed data.

- `create-tables.sql`: Editable schema definition
- `seed-data.sql`: Editable initial data

### Do Not Edit Directory (`do-not-edit`)

These files manage backend setup. Do not edit them.

- `db.js`: Database utilities and shared connection (Do not edit)
- `setup-db.js`: Database initialisation script (Do not edit)
- `cleanup-db.js`: Database removal script (Do not edit)
