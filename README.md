# e-Stat MCP Server (TypeScript)

MCP (Model Context Protocol) server for integrating with Japan's e-Stat API, enabling language models to search and retrieve Japanese government statistical data.

## Installation

```bash
npm install
```

## Setup

1. Get your e-Stat API key from https://www.e-stat.go.jp/api/
2. Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
# Edit .env and add your E_STAT_APP_ID
```

## Usage

### Build the project
```bash
npm run build
```

### Run the server
```bash
npm start
# or during development
npm run dev
```

### Run with MCP
```bash
npx @nyuta/estat-mcp
```

## Available Tools

The server provides 5 comprehensive tools for interacting with the e-Stat API:

### 1. **search_e_stat_tables** - Search Statistics Tables
- Search by keyword with AND/OR/NOT operators
- Filter by survey years, data release years
- Specify statistics field/code for targeted search
- Support for summary or detailed search results

### 2. **get_e_stat_meta_info** - Get Table Metadata
- Retrieve detailed metadata for statistics tables
- Option to include explanation information
- Table structure and category information

### 3. **get_specific_e_stat_data** - Get Statistical Data
- Retrieve actual numeric statistical data
- Support for dataset ID or statistics table ID
- Section header control and special character handling
- Area-specific data filtering (e.g., by prefecture)

### 4. **get_e_stat_ref_dataset** - Reference Dataset Conditions
- Get available filtering conditions for datasets
- Understand data structure before querying

### 5. **get_e_stat_data_catalog** - Get Data Catalog
- Browse available statistical files and databases
- Filter by data type (Excel, CSV, PDF)
- Search by catalog or resource ID

## Development

### Watch mode
```bash
npm run watch
```

### Clean build
```bash
npm run clean
npm run build
```

## Publishing to npm

### Interactive publish (recommended)
```bash
npm run publish:interactive
```

### Manual publish
```bash
# Build and publish
npm run prepublishOnly
npm run publish:npm

# Or with version bump
npm version patch  # or minor/major
npm publish --access public
```

## Architecture

- Built with TypeScript and MCP SDK
- Uses native fetch API for HTTP requests
- Implements comprehensive error handling for timeouts and connection issues
- Supports complex queries with AND/OR/NOT operators

## Requirements

- Node.js >= 18.0.0
- e-Stat API key (free registration required)

