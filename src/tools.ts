import { ToolArguments, EStatRequestParams, ENDPOINTS } from './types.js';
import { EStatAPIClient } from './api-client.js';

export class ToolHandlers {
  constructor(private readonly apiClient: EStatAPIClient) {}

  async searchTables(args: ToolArguments | undefined): Promise<unknown> {
    if (!args?.search_word) {
      throw new Error("search_word is required");
    }

    const params: EStatRequestParams = {
      searchWord: args.search_word,
      ...(args.surveyYears && { surveyYears: args.surveyYears }),
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
    const params: EStatRequestParams = {
      ...(args?.search_word && { searchWord: args.search_word }),
      ...(args?.surveyYears && { surveyYears: args.surveyYears }),
      ...(args?.startPosition && { startPosition: args.startPosition }),
      ...(args?.limit && { limit: args.limit }),
      ...(args?.dataType && { dataType: args.dataType }),
      ...(args?.catalogId && { catalogId: args.catalogId }),
      ...(args?.resourceId && { resourceId: args.resourceId }),
    };

    return this.apiClient.request(ENDPOINTS.GET_DATA_CATALOG, params);
  }
}