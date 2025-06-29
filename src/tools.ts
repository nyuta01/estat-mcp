import type { ToolArguments, EStatRequestParams } from './types.js';
import { ENDPOINTS } from './types.js';
import type { EStatAPIClient } from './api-client.js';

/**
 * Validates and formats surveyYears parameter for e-Stat API
 * Valid formats: yyyy, yyyymm, yyyymm-yyyymm
 * @param surveyYears - Input survey years string
 * @returns Formatted survey years string or undefined if invalid
 */
function validateSurveyYears(surveyYears: string): string | undefined {
  if (!surveyYears) return undefined;
  
  // Remove any whitespace
  const cleaned = surveyYears.trim();
  
  // Check if it's a single year (yyyy)
  if (/^\d{4}$/.test(cleaned)) {
    return cleaned;
  }
  
  // Check if it's year-month format (yyyymm)
  if (/^\d{6}$/.test(cleaned)) {
    const year = Number.parseInt(cleaned.substring(0, 4));
    const month = Number.parseInt(cleaned.substring(4, 6));
    if (month >= 1 && month <= 12) {
      return cleaned;
    }
  }
  
  // Check if it's a range format (yyyymm-yyyymm)
  if (/^\d{6}-\d{6}$/.test(cleaned)) {
    const [start, end] = cleaned.split('-');
    const startYear = Number.parseInt(start.substring(0, 4));
    const startMonth = Number.parseInt(start.substring(4, 6));
    const endYear = Number.parseInt(end.substring(0, 4));
    const endMonth = Number.parseInt(end.substring(4, 6));
    
    if (startMonth >= 1 && startMonth <= 12 && endMonth >= 1 && endMonth <= 12) {
      return cleaned;
    }
  }
  
  // Check if it's a year range format (yyyy-yyyy) and convert to yyyymm-yyyymm
  if (/^\d{4}-\d{4}$/.test(cleaned)) {
    const [startYear, endYear] = cleaned.split('-');
    // Convert to January of start year to December of end year
    return `${startYear}01-${endYear}12`;
  }
  
  // Invalid format
  return undefined;
}

export class ToolHandlers {
  constructor(private readonly apiClient: EStatAPIClient) {}

  async searchTables(args: ToolArguments | undefined): Promise<unknown> {
    if (!args?.search_word) {
      throw new Error("search_word is required");
    }

    // Validate and format surveyYears if provided
    let validatedSurveyYears: string | undefined;
    if (args.surveyYears) {
      validatedSurveyYears = validateSurveyYears(args.surveyYears);
      if (!validatedSurveyYears) {
        throw new Error(
          `Invalid surveyYears format: ${args.surveyYears}. Valid formats are: yyyy (e.g., '2020'), yyyymm (e.g., '202010'), or yyyymm-yyyymm (e.g., '202001-202012')`
        );
      }
    }

    const params: EStatRequestParams = {
      searchWord: args.search_word,
      ...(validatedSurveyYears && { surveyYears: validatedSurveyYears }),
      ...(args.openYears && { openYears: args.openYears }),
      ...(args.statsField && { statsField: args.statsField }),
      ...(args.statsCode && { statsCode: args.statsCode }),
      ...(args.searchKind && { searchKind: args.searchKind }),
      ...(args.startPosition && { startPosition: args.startPosition }),
      ...(args.limit && { limit: args.limit }),
    };

    return this.apiClient.request(ENDPOINTS.GET_STATS_LIST, params);
  }

  async getMetaInfo(args: ToolArguments | undefined): Promise<unknown> {
    if (!args?.stats_data_id) {
      throw new Error("stats_data_id is required");
    }

    const params: EStatRequestParams = {
      statsDataId: args.stats_data_id,
      ...(args.explanationGetFlg && { explanationGetFlg: args.explanationGetFlg }),
    };

    return this.apiClient.request(ENDPOINTS.GET_META_INFO, params);
  }

  async getStatsData(args: ToolArguments | undefined): Promise<unknown> {
    if (!args) {
      throw new Error("Arguments are required");
    }

    if (args.data_set_id && args.stats_data_id) {
      throw new Error(
        "Please provide either data_set_id OR stats_data_id, not both"
      );
    }

    if (!args.data_set_id && !args.stats_data_id) {
      throw new Error(
        "Please provide either data_set_id OR stats_data_id"
      );
    }

    const params: EStatRequestParams = {
      ...(args.data_set_id && { dataSetId: args.data_set_id }),
      ...(args.stats_data_id && { statsDataId: args.stats_data_id }),
      ...(args.startPosition && { startPosition: args.startPosition }),
      ...(args.limit && { limit: args.limit }),
      ...(args.sectionHeaderFlg && { sectionHeaderFlg: args.sectionHeaderFlg }),
      ...(args.replaceSpChars && { replaceSpChars: args.replaceSpChars }),
      ...(args.narrowDownArea && { narrowDownArea: args.narrowDownArea }),
    };

    return this.apiClient.request(ENDPOINTS.GET_STATS_DATA, params);
  }

  async refDataset(args: ToolArguments | undefined): Promise<unknown> {
    if (!args?.data_set_id) {
      throw new Error("data_set_id is required");
    }

    const params: EStatRequestParams = {
      dataSetId: args.data_set_id,
    };

    return this.apiClient.request(ENDPOINTS.REF_DATASET, params);
  }

  async getDataCatalog(args: ToolArguments | undefined): Promise<unknown> {
    // Validate and format surveyYears if provided
    let validatedSurveyYears: string | undefined;
    if (args?.surveyYears) {
      validatedSurveyYears = validateSurveyYears(args.surveyYears);
      if (!validatedSurveyYears) {
        throw new Error(
          `Invalid surveyYears format: ${args.surveyYears}. Valid formats are: yyyy (e.g., '2020'), yyyymm (e.g., '202010'), or yyyymm-yyyymm (e.g., '202001-202012')`
        );
      }
    }

    const params: EStatRequestParams = {
      ...(args?.search_word && { searchWord: args.search_word }),
      ...(validatedSurveyYears && { surveyYears: validatedSurveyYears }),
      ...(args?.startPosition && { startPosition: args.startPosition }),
      ...(args?.limit && { limit: args.limit }),
      ...(args?.dataType && { dataType: args.dataType }),
      ...(args?.catalogId && { catalogId: args.catalogId }),
      ...(args?.resourceId && { resourceId: args.resourceId }),
    };

    return this.apiClient.request(ENDPOINTS.GET_DATA_CATALOG, params);
  }
}