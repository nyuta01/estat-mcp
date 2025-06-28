# e-Stat MCP Server

An MCP (Model Context Protocol) server that provides seamless integration with Japan's e-Stat API, enabling AI language models to search and retrieve Japanese government statistical data. This project has been converted from Python to TypeScript for better performance and maintainability.

## Installation

```bash
pnpm install
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
pnpm run build
```

### Run the server
```bash
pnpm start
# or during development
pnpm run dev
```

### Run as MCP Server
```bash
npx @nyuta/estat-mcp
```

The server runs on stdio transport for MCP communication and automatically includes authentication parameters for API calls.

## Available Tools

The server provides 5 comprehensive tools for interacting with the e-Stat API 3.0:

### 1. **search_e_stat_tables** - Statistical Table Information Retrieval
Search and discover statistics tables from Japan's government statistical database.

**Key Features:**
- Search by keyword with logical operators (AND/OR/NOT)
- Filter by survey years and data release periods
- Target specific statistical fields (e.g., population, economy)
- Control search results with summary or detailed output
- Pagination support with configurable limits

**Parameters:**
- `search_word` (required): Search keyword with operator support
- `surveyYears`: Target period (yyyy, yyyymm, or range)
- `statsField`: Statistical field codes (e.g., '02' for population)
- `searchKind`: '1' for summary, '2' for detailed results

### 2. **get_e_stat_meta_info** - Metadata Retrieval
Retrieve comprehensive metadata for specific statistics tables.

**Key Features:**
- Complete table structure information
- Category and classification details
- Optional explanation text retrieval
- Data dictionary and field descriptions

**Parameters:**
- `stats_data_id` (required): Target statistics table ID
- `explanationGetFlg`: Include explanations ('Y'/'N')

### 3. **get_specific_e_stat_data** - Statistical Data Retrieval
Access actual numerical statistical data with flexible filtering options.

**Key Features:**
- Retrieve data by dataset ID or statistics table ID
- Geographic filtering (prefecture, municipality level)
- Configurable section headers and special character handling
- Pagination for large datasets
- Multiple output formats (JSON, CSV, XML)

**Parameters:**
- `data_set_id` OR `stats_data_id` (required): Data identifier
- `narrowDownArea`: Geographic area codes (e.g., '13000' for Tokyo)
- `sectionHeaderFlg`: Include/exclude section headers
- `replaceSpChars`: Handle special characters

### 4. **get_e_stat_ref_dataset** - Dataset Reference
Explore available filtering conditions and data structure before querying.

**Key Features:**
- Available filter categories and codes
- Data dimensions and hierarchies
- Valid parameter combinations
- Dataset structure analysis

**Parameters:**
- `data_set_id` (required): Target dataset identifier

### 5. **get_e_stat_data_catalog** - Data Catalog Information Retrieval
Browse and search the comprehensive catalog of available statistical resources.

**Key Features:**
- Search across files, databases, and resources
- Filter by data format (Excel, CSV, PDF)
- Browse by catalog and resource IDs
- Discover available statistical surveys and datasets

**Parameters:**
- `search_word`: Keyword search with logical operators
- `dataType`: Filter by format ('XLS', 'CSV', 'PDF')
- `catalogId`/`resourceId`: Direct catalog access

## Development

### Watch mode
```bash
pnpm run watch
```

### Clean build
```bash
pnpm run clean
pnpm run build
```

### Testing

Test the MCP server functionality with the built-in test client:

```bash
# Run all tests
pnpm test

# Run specific tests
pnpm run test:list-tools    # List available tools
pnpm run test:search        # Search statistics tables
pnpm run test:metadata      # Get table metadata
pnpm run test:data          # Get statistical data
pnpm run test:ref           # Reference dataset conditions
pnpm run test:catalog       # Browse data catalog
```

**Manual Testing:**
```bash
# Build first
pnpm run build

# Run individual tests
node test/test-client.js list-tools
node test/test-client.js search-tables
node test/test-client.js get-metadata
```

## Publishing to npm

### Interactive publish (recommended)
```bash
pnpm run publish:interactive
```

### Manual publish
```bash
# Build and publish
pnpm run prepublishOnly
pnpm run publish:npm

# Or with version bump
pnpm version patch  # or minor/major
pnpm publish --access public
```

## Architecture

### Core Components

- **MCP Server Implementation**: Built on @modelcontextprotocol/sdk with async architecture
- **API Integration**: Uses native fetch API with base URL `https://api.e-stat.go.jp/rest/3.0/app/`
- **Error Handling**: Comprehensive timeout and connection error handling with 30-second default timeout using AbortController
- **Type Safety**: TypeScript strict mode enabled with ES modules support

### Package Structure
```
src/
├── index.ts     # Entry point
└── server.ts    # Core server implementation
```

### Key Features
- Supports complex queries with AND/OR/NOT operators
- JSON response format with proper error handling
- All API calls automatically include authentication parameters
- Timeout handling implemented for reliable communication

## Requirements

- Node.js >= 18.0.0
- e-Stat API key (free registration required)

