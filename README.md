# Project Setup Guide

This repository contains two applications:

- **Haupcar Web Frontend**
- **Haupcar API**

---

# Haupcar Web Frontend

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js

## Environment Variables

Create a `.env` file in the project root and add the following:

```env
VITE_HAUPCAR_API_BASE_URL=
```

## Installation

Install the project dependencies:

```bash
yarn install
```

## Run the Application

### Development

```bash
yarn dev
```

### Production

```bash
yarn start
```

### The application is running:

```text
http://localhost:5173
```

---

# Haupcar API

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js
- PostgreSQL

## Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
NODE_ENV=
PG_HOST=
PG_PORT=
PG_USER=
PG_PASSWORD=
PG_DATABASE_NAME=
```

## Installation

Install the project dependencies:

```bash
yarn install
```

## Run Database Migrations

Before starting the API for the first time (or after new migrations have been added), run:

```bash
yarn migrate:up
```

## Seed Sample Data (Optional)

To populate the database with mock data for development and testing, run:

```bash
yarn seed
```

## Run the Application

### Development

```bash
yarn dev
```

### Production

```bash
yarn start
```

### The application is running:

```text
http://localhost:3000
```
