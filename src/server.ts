import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";

import type { ToolArguments } from './types.js';
import { EStatAPIClient } from './api-client.js';
import { ToolHandlers } from './tools.js';
import { TOOL_DEFINITIONS } from './tool-definitions.js';

dotenv.config();

export const createServer = () => {
  const apiClient = new EStatAPIClient(process.env.E_STAT_APP_ID);
  const toolHandlers = new ToolHandlers(apiClient);

  const server = new Server(
    {
      name: "estat-mcp",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOL_DEFINITIONS,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const toolArgs = args as ToolArguments | undefined;

    try {
      let result: unknown;

      switch (name) {
        case "search_e_stat_tables":
          result = await toolHandlers.searchTables(toolArgs);
          break;
        case "get_e_stat_meta_info":
          result = await toolHandlers.getMetaInfo(toolArgs);
          break;
        case "get_specific_e_stat_data":
          result = await toolHandlers.getStatsData(toolArgs);
          break;
        case "get_e_stat_ref_dataset":
          result = await toolHandlers.refDataset(toolArgs);
          break;
        case "get_e_stat_data_catalog":
          result = await toolHandlers.getDataCatalog(toolArgs);
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: error instanceof Error ? error.message : String(error),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  });

  return server;
};

export async function runServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}