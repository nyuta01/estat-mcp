import type { EStatError, EndpointName } from './types.js';

const E_STAT_BASE_URL = "https://api.e-stat.go.jp/rest/3.0/app/json/";
const REQUEST_TIMEOUT = 600000;

export class EStatAPIClient {
  private readonly appId: string;

  constructor(appId: string | undefined) {
    if (!appId) {
      throw new Error("E_STAT_APP_ID environment variable is not set");
    }
    this.appId = appId;
  }

  async request(
    endpoint: EndpointName,
    params: Record<string, string | number | undefined>
  ): Promise<unknown> {
    const url = this.buildURL(endpoint, params);

    try {
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        return this.createErrorResponse(
          `HTTP error! status: ${response.status}`,
          String(response.status)
        );
      }

      return await response.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  private buildURL(
    endpoint: string,
    params: Record<string, string | number | undefined>
  ): URL {
    const url = new URL(`${E_STAT_BASE_URL}${endpoint}`);
    url.searchParams.append("appId", this.appId);

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    }

    return url;
  }

  private async fetchWithTimeout(url: URL): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url.toString(), {
        signal: controller.signal,
        headers: {
          "Accept": "*/*",
          "User-Agent": "estat-mcp/1.0",
        },
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private handleError(error: unknown): EStatError {
    const err = error as { name: string; code: string; message: string };
    
    if (err.name === "AbortError") {
      return this.createErrorResponse(
        "Request timeout. Please try again.",
        "timeout"
      );
    }

    if (err.code === "ENOTFOUND" || err.code === "ECONNREFUSED") {
      return this.createErrorResponse(
        "Cannot connect to e-Stat API. Please check your internet connection.",
        "connection_error"
      );
    }

    return this.createErrorResponse(
      `Error occurred: ${err.message || String(error)}`,
      "unknown_error",
      String(error)
    );
  }

  private createErrorResponse(
    error: string,
    status: string,
    details?: string
  ): EStatError {
    return { error, status, ...(details && { details }) };
  }
}