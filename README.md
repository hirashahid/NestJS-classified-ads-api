
# Classified Ads Project

This is a classified ads project designed to provide a platform for users to post, browse, and manage classified advertisements. Whether you're looking to sell items, advertise services, or search for classified listings, our platform makes it easy to connect with potential buyers and sellers.

## Table of Contents
- [Features](#features)
- [Technology](#technology)
- [Installation](#installation)
- [Verify Installation](#verify-installation)
- [Cloning the Repository](#cloning-the-repository)
- [Running the app](#running-the-app)
- [Test](#test)


## Features

- User-friendly interface for posting and managing classified ads.
- Advanced search and filter options to find relevant listings.
- Secure user authentication and authorization.
- Messaging system for communication between buyers and sellers.
- Categories and tags to organize and discover ads.
- Location-based search to find ads in your area.
- Responsive design for seamless browsing on various devices.

## Technology
- [Node.js](https://nodejs.org/) (v16.14.2)
- [PostgreSQL](https://www.postgresql.org/) (v15.4)
- [pnpm](https://pnpm.js.org/) (v8.7.1) (Package Manager)
  
## Installation

Follow the platform-specific instructions below to set up your environment:

### Windows

1. **Node.js**:
   - Download and install Node.js version 16.14.2 from [nodejs.org](https://nodejs.org/).

2. **PostgreSQL**:
   - Download and install PostgreSQL version 15.4 for Windows from [postgresql.org](https://www.postgresql.org/download/windows/).
   - During installation, make note of the PostgreSQL password you set for the default 'postgres' user, as you'll need it later.

### macOS

1. **Node.js**:
   - Install [Homebrew](https://brew.sh/), if not already installed.
   - Install Node.js version 16.14.2 using Homebrew:
     ```bash
     brew install node@16
     ```

2. **PostgreSQL**:
   - Install PostgreSQL version 15.4 using Homebrew:
     ```bash
     brew install postgresql@15
     ```
   - Follow the instructions provided by Homebrew to start the PostgreSQL service.

### Linux (Ubuntu)

1. **Node.js**:
   - Install Node.js version 16.14.2 using NodeSource's Node.js repository:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```

2. **PostgreSQL**:
   - Install PostgreSQL version 15.4 on Ubuntu:
     ```bash
     sudo apt-get install postgresql-15
     ```
   - Follow the prompts during installation to set the 'postgres' user password.

## Verify Installation

To verify that Node.js and PostgreSQL are correctly installed, run the following commands:

- **Node.js**:
  ```bash
  node -v

- **PostgreSQL**:
  ```bash
  psql --version

## Cloning the Repository

To get a local copy of this project up and running, follow these steps:

1. Open your terminal or command prompt.

2. Navigate to the directory where you want to store the project:
   ```bash
   cd /path/to/your/directory

3. Clone the repository by running the following command:
   ```bash
   git clone https://github.com/Lead-Squad/classified-ads-api.git

4. Once the cloning process is complete, navigate to the project's directory:
   ```bash
   cd classified-ads-api

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
