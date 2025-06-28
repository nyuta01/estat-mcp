# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server that provides integration with Japan's e-Stat API, enabling language models to search and retrieve Japanese government statistical data. The project has been converted from Python to TypeScript.

## Common Development Commands

### Running the Server
```bash
# Build the project
pnpm run build

# Run the server
pnpm start

# Development mode with tsx
pnpm run dev

# Or via npx
npx @nyuta/estat-mcp
```

### Testing the Server
```bash
# Test all functionality
pnpm test

# Test specific tools
pnpm run test:search        # Search statistics tables
pnpm run test:metadata      # Get table metadata
pnpm run test:data          # Get statistical data

# Manual testing
node test/test-client.js [test-name]
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

2. **Available Tools** (based on e-Stat API 3.0):
   - `search_e_stat_tables`: Statistical Table Information Retrieval - Search government statistics by keyword with logical operators
   - `get_e_stat_meta_info`: Metadata Retrieval - Get comprehensive table structure and category information
   - `get_specific_e_stat_data`: Statistical Data Retrieval - Access numerical data with geographic filtering
   - `get_e_stat_ref_dataset`: Dataset Reference - Explore available filtering conditions and data structure
   - `get_e_stat_data_catalog`: Data Catalog Information Retrieval - Browse statistical files and databases

### API Integration
- Base URL: `https://api.e-stat.go.jp/rest/3.0/app/`
- Supports complex queries with AND/OR/NOT operators
- Multiple output formats: JSON, XML, CSV
- Geographic filtering capabilities (prefecture/municipality level)
- Comprehensive error handling and timeout management

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