# e-Stat MCP Server

An MCP (Model Context Protocol) server that provides integration with Japan's e-Stat API, enabling AI tools to access Japanese government statistical data.

## Quick Start

```bash
# Set API key (get from https://www.e-stat.go.jp/api/)
export E_STAT_APP_ID=your_api_key_here

# Search for population statistics
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_e_stat_tables","arguments":{"search_word":"人口","limit":3}}}' | npx @nyuta/estat-mcp

# Get table metadata  
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_e_stat_meta_info","arguments":{"stats_data_id":"0000150041"}}}' | npx @nyuta/estat-mcp

# Get actual data
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_specific_e_stat_data","arguments":{"stats_data_id":"0000150041","limit":5}}}' | npx @nyuta/estat-mcp
```

## Development
```bash
# Build
pnpm run build

# Run
pnpm start

# Development mode
pnpm run dev
```

## Available Tools

The server provides 5 tools for e-Stat API access:

### 1. search_e_stat_tables
Search statistics tables by keyword.

**Parameters:**
- `search_word` (required): Search keyword (supports AND/OR/NOT)
- `surveyYears`: Target period (yyyy, yyyymm, or range)
- `statsField`: Statistical field code (e.g., '02' for population)
- `limit`: Number of results (default: 10)

### 2. get_e_stat_meta_info
Get metadata for a statistics table.

**Parameters:**
- `stats_data_id` (required): Statistics table ID
- `explanationGetFlg`: Include explanations ('Y'/'N')

### 3. get_specific_e_stat_data
Get actual statistical data.

**Parameters:**
- `data_set_id` OR `stats_data_id` (required): Data identifier
- `narrowDownArea`: Geographic area codes
- `limit`: Number of records (default: 10)

### 4. get_e_stat_ref_dataset
Explore dataset structure and filtering options.

**Parameters:**
- `data_set_id` (required): Dataset identifier

### 5. get_e_stat_data_catalog
Browse data catalog and downloadable files.

**Parameters:**
- `search_word`: Search keyword
- `dataType`: File format filter ('XLS', 'CSV', 'PDF')
- `limit`: Number of results (default: 10)

## Testing

### Basic Functionality Test
```bash
# Test all functionality
pnpm test
```

## Publishing to npm

```bash
# Version bump
pnpm version patch  # or minor/major

# Build and publish
pnpm run prepublishOnly
pnpm run publish:npm
```

## Requirements

- Node.js >= 18.0.0
- e-Stat API key (free registration required)

## License

MIT