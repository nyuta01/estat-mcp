# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server that provides integration with Japan's e-Stat API, enabling language models to search and retrieve Japanese government statistical data. The project has been converted from Python to TypeScript.

## Common Development Commands

### Running the Server
```bash
# Build the project
npm run build

# Run the server
npm start

# Development mode with tsx
npm run dev

# Or via npx
npx estat-mcp-server
```

### Environment Setup
- Requires Node.js >=18.0.0
- Required environment variable: `E_STAT_APP_ID` (obtain from https://www.e-stat.go.jp/api/)

## Architecture

### Core Components

1. **MCP Server Implementation** (`src/server.ts`):
   - Built on @modelcontextprotocol/sdk
   - Provides 5 tools for e-Stat API interaction
   - Async architecture using native fetch API
   - Comprehensive error handling for timeouts and connection issues

2. **Available Tools**:
   - `search_e_stat_tables`: Search statistics by keyword and year
   - `get_e_stat_meta_info`: Retrieve table metadata
   - `get_specific_e_stat_data`: Get actual statistical data
   - `get_e_stat_ref_dataset`: Reference dataset filtering conditions
   - `get_e_stat_data_catalog`: Get catalog information

### API Integration
- Base URL: `https://api.e-stat.go.jp/rest/3.0/app/`
- Supports complex queries with AND/OR/NOT operators
- JSON response format with proper error handling

### Package Structure
```
src/
├── index.ts     # Entry point
└── server.ts    # Core server implementation
```

## Key Development Notes

- The server runs on stdio transport for MCP communication
- All API calls include the app_id parameter automatically
- Timeout handling is implemented with 30-second default using AbortController
- Error responses are properly formatted with detailed error messages
- TypeScript strict mode is enabled for type safety
- Uses ES modules (type: "module" in package.json)