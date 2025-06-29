# CLAUDE.md

This file provides guidance to Claude Code when working with this e-Stat MCP server.

## Project Overview

This is an MCP (Model Context Protocol) server that provides integration with Japan's e-Stat API, enabling AI tools to access Japanese government statistical data.

## Development Commands

### Basic Commands
```bash
# Build the project
pnpm run build

# Run the server
pnpm start

# Development mode
pnpm run dev

# Test functionality
pnpm test
```

### Environment Setup
- Requires Node.js >=18.0.0  
- Required environment variable: `E_STAT_APP_ID` (obtain from https://www.e-stat.go.jp/api/)

## Architecture

### Core Components
1. **MCP Server** (`src/server.ts`): Built on @modelcontextprotocol/sdk
2. **Tool Definitions** (`src/tool-definitions.ts`): 5 tools for e-Stat API
3. **API Client** (`src/api-client.ts`): HTTP client for e-Stat API

### Available Tools
- `search_e_stat_tables`: Search government statistics by keyword
- `get_e_stat_meta_info`: Get table metadata and structure
- `get_specific_e_stat_data`: Access numerical statistical data
- `get_e_stat_ref_dataset`: Explore dataset filtering options
- `get_e_stat_data_catalog`: Browse statistical files and databases

### Package Structure
```
src/
├── index.ts           # Entry point
├── server.ts          # MCP server implementation
├── tool-definitions.ts # Tool schemas
├── api-client.ts      # e-Stat API client
└── types.ts           # TypeScript types
```

## Key Notes
- Uses stdio transport for MCP communication
- Timeout handling with 30-second default
- TypeScript strict mode enabled
- ES modules (type: "module" in package.json)