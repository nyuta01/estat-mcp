export const TOOL_DEFINITIONS = [
  {
    name: "search_e_stat_tables",
    description:
      "Search statistics tables from e-Stat API by keyword and year. " +
      "Returns a list of matching statistics tables. " +
      "キーワードと年度で政府統計表を検索します。",
    inputSchema: {
      type: "object",
      properties: {
        search_word: {
          type: "string",
          description:
            "Search keyword for statistics (supports AND/OR/NOT operators). " +
            "統計の検索キーワード（AND/OR/NOT演算子対応）",
        },
        surveyYears: {
          type: "string",
          description:
            "Target year/month in format yyyy, yyyymm, or yyyymm-yyyymm. " +
            "対象年月（yyyy、yyyymm、yyyymm-yyyymm形式）",
        },
        startPosition: {
          type: "number",
          description:
            "Start position for data retrieval (default: 1). " +
            "データ取得開始位置（デフォルト: 1）",
          default: 1,
        },
        limit: {
          type: "number",
          description:
            "Number of items to retrieve (default: 100). " +
            "取得件数（デフォルト: 100）",
          default: 100,
        },
        openYears: {
          type: "string",
          description:
            "Data release year/month in format yyyy, yyyymm, or yyyymm-yyyymm. " +
            "データ公開年月（yyyy、yyyymm、yyyymm-yyyymm形式）",
        },
        statsField: {
          type: "string",
          description:
            "Statistics field code (e.g., '02' for population). " +
            "統計分野コード（例：人口なら'02'）",
        },
        statsCode: {
          type: "string",
          description:
            "Statistics code for specific statistical surveys. " +
            "特定の統計調査コード",
        },
        searchKind: {
          type: "string",
          description:
            "Search type: '1' for summary, '2' for details (default: '1'). " +
            "検索種別：'1'=要約、'2'=詳細（デフォルト：'1'）",
        },
      },
      required: ["search_word"],
    },
  },
  {
    name: "get_e_stat_meta_info",
    description:
      "Get metadata information for a specific statistics table from e-Stat API. " +
      "Returns detailed metadata including table structure and categories. " +
      "特定の統計表のメタ情報を取得します。",
    inputSchema: {
      type: "object",
      properties: {
        stats_data_id: {
          type: "string",
          description:
            "Statistics table ID. " +
            "統計表ID",
        },
        explanationGetFlg: {
          type: "string",
          description:
            "Flag to get explanations: 'Y' to include, 'N' to exclude (default: 'N'). " +
            "説明情報取得フラグ：'Y'=取得、'N'=非取得（デフォルト：'N'）",
        },
      },
      required: ["stats_data_id"],
    },
  },
  {
    name: "get_specific_e_stat_data",
    description:
      "Get specific statistical data (numeric values) from e-Stat API. " +
      "Use either data_set_id OR stats_data_id (not both). " +
      "特定の統計データ（数値）を取得します。",
    inputSchema: {
      type: "object",
      properties: {
        data_set_id: {
          type: "string",
          description:
            "Dataset ID (use this OR stats_data_id). " +
            "データセットID（stats_data_idとは排他的）",
        },
        stats_data_id: {
          type: "string",
          description:
            "Statistics table ID (use this OR data_set_id). " +
            "統計表ID（data_set_idとは排他的）",
        },
        startPosition: {
          type: "number",
          description:
            "Start position for data retrieval (default: 1). " +
            "データ取得開始位置（デフォルト: 1）",
          default: 1,
        },
        limit: {
          type: "number",
          description:
            "Number of items to retrieve (default: 100). " +
            "取得件数（デフォルト: 100）",
          default: 100,
        },
        sectionHeaderFlg: {
          type: "number",
          description:
            "Section header flag: 1 to include section headers, 2 to exclude (default: 1). " +
            "項目名出力フラグ：1=出力、2=非出力（デフォルト：1）",
        },
        replaceSpChars: {
          type: "number",
          description:
            "Replace special characters: 1 to replace, 2 to keep (default: 2). " +
            "特殊文字置換フラグ：1=置換、2=非置換（デフォルト：2）",
        },
        narrowDownArea: {
          type: "string",
          description:
            "Area code to narrow down results (e.g., '13000' for Tokyo). " +
            "地域絞込みコード（例：東京都なら'13000'）",
        },
      },
      oneOf: [
        { required: ["data_set_id"] },
        { required: ["stats_data_id"] },
      ],
    },
  },
  {
    name: "get_e_stat_ref_dataset",
    description:
      "Reference dataset filtering conditions from e-Stat API. " +
      "Returns available filtering options for the dataset. " +
      "データセットのフィルタリング条件を参照します。",
    inputSchema: {
      type: "object",
      properties: {
        data_set_id: {
          type: "string",
          description:
            "Dataset ID. " +
            "データセットID",
        },
      },
      required: ["data_set_id"],
    },
  },
  {
    name: "get_e_stat_data_catalog",
    description:
      "Get statistics file and database catalog information from e-Stat API. " +
      "Returns available data files and database information. " +
      "統計ファイル・データベースのカタログ情報を取得します。",
    inputSchema: {
      type: "object",
      properties: {
        search_word: {
          type: "string",
          description:
            "Search keyword (supports AND/OR/NOT operators). " +
            "検索キーワード（AND/OR/NOT演算子対応）",
        },
        surveyYears: {
          type: "string",
          description:
            "Target year/month in format yyyy, yyyymm, or yyyymm-yyyymm. " +
            "対象年月（yyyy、yyyymm、yyyymm-yyyymm形式）",
        },
        startPosition: {
          type: "number",
          description:
            "Start position for data retrieval (default: 1). " +
            "データ取得開始位置（デフォルト: 1）",
          default: 1,
        },
        limit: {
          type: "number",
          description:
            "Number of items to retrieve (default: 100). " +
            "取得件数（デフォルト: 100）",
          default: 100,
        },
        dataType: {
          type: "string",
          description:
            "Data type: 'XLS' for Excel files, 'CSV' for CSV files, 'PDF' for PDF files. " +
            "データ種別：'XLS'=Excel、'CSV'=CSV、'PDF'=PDF",
        },
        catalogId: {
          type: "string",
          description:
            "Catalog ID for specific data catalog. " +
            "特定のデータカタログID",
        },
        resourceId: {
          type: "string",
          description:
            "Resource ID for specific data resource. " +
            "特定のデータリソースID",
        },
      },
      required: [],
    },
  },
] as const;