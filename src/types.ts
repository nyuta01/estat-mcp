export interface ToolArguments {
  // 共通パラメータ
  search_word?: string;
  surveyYears?: string;
  startPosition?: number;
  limit?: number;
  
  // 統計表・データ識別子
  stats_data_id?: string;
  data_set_id?: string;
  
  // 統計表情報取得用
  openYears?: string;
  statsField?: string;
  statsCode?: string;
  searchKind?: string;
  
  // 統計データ取得用
  sectionHeaderFlg?: number;
  replaceSpChars?: number;
  narrowDownArea?: string;
  
  // データカタログ用
  dataType?: string;
  catalogId?: string;
  resourceId?: string;
  
  // メタ情報取得用
  explanationGetFlg?: string;
}

export interface EStatError {
  error: string;
  status?: string;
  details?: string;
}

export interface EStatRequestParams extends Record<string, string | number | undefined> {
  // 共通パラメータ
  searchWord?: string;
  surveyYears?: string;
  startPosition?: number;
  limit?: number;
  
  // 統計表・データ識別子
  statsDataId?: string;
  dataSetId?: string;
  
  // 統計表情報取得用
  openYears?: string;
  statsField?: string;
  statsCode?: string;
  searchKind?: string;
  
  // 統計データ取得用
  sectionHeaderFlg?: number;
  replaceSpChars?: number;
  narrowDownArea?: string;
  
  // データカタログ用
  dataType?: string;
  catalogId?: string;
  resourceId?: string;
  
  // メタ情報取得用
  explanationGetFlg?: string;
}

export const ENDPOINTS = {
  GET_STATS_LIST: 'getStatsList',
  GET_META_INFO: 'getMetaInfo',
  GET_STATS_DATA: 'getStatsData',
  REF_DATASET: 'refDataset',
  GET_DATA_CATALOG: 'getDataCatalog',
} as const;

export type EndpointName = typeof ENDPOINTS[keyof typeof ENDPOINTS];