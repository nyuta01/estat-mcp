export const TOOL_DEFINITIONS = [
  {
    name: "search_e_stat_tables",
    description:
      "Statistical Table Information Retrieval API - Search and discover statistics tables from Japan's e-Stat API 3.0. " +
      "Returns comprehensive list of matching government statistical tables with metadata. " +
      "政府統計表情報取得API - キーワードと条件で政府統計表を検索・発見します。",
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
            "Number of items to retrieve (default: 10). " +
            "取得件数（デフォルト: 10）",
          default: 10,
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
        collectArea: {
          type: "string",
          description:
            "Geographic collection area code for targeted data collection. " +
            "データ収集対象地域コード",
        },
        lang: {
          type: "string",
          description:
            "Language selection: 'J' for Japanese, 'E' for English (default: 'J'). " +
            "言語選択：'J'=日本語、'E'=英語（デフォルト：'J'）",
        },
      },
      required: ["search_word"],
    },
  },
  {
    name: "get_e_stat_meta_info",
    description:
      "Metadata Retrieval API - Get comprehensive metadata information for specific statistics tables from e-Stat API 3.0. " +
      "Returns detailed table structure, categories, classifications, and data dictionary. " +
      "メタ情報取得API - 特定の統計表の詳細なメタ情報を取得します。",
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
        lang: {
          type: "string",
          description:
            "Language selection: 'J' for Japanese, 'E' for English (default: 'J'). " +
            "言語選択：'J'=日本語、'E'=英語（デフォルト：'J'）",
        },
      },
      required: ["stats_data_id"],
    },
  },
  {
    name: "get_specific_e_stat_data",
    description:
      "Statistical Data Retrieval API - Get specific numerical statistical data from e-Stat API 3.0. " +
      "Supports hierarchical filtering, geographic narrowing, and flexible data extraction. " +
      "Use either data_set_id OR stats_data_id (not both). " +
      "統計データ取得API - 特定の統計データ（数値）を取得します。",
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
            "Number of items to retrieve (default: 10). " +
            "取得件数（デフォルト: 10）",
          default: 10,
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
        lang: {
          type: "string",
          description:
            "Language selection: 'J' for Japanese, 'E' for English (default: 'J'). " +
            "言語選択：'J'=日本語、'E'=英語（デフォルト：'J'）",
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
      "Dataset Reference API - Reference dataset filtering conditions and structure from e-Stat API 3.0. " +
      "Returns available filtering options, dimensions, hierarchies, and valid parameter combinations. " +
      "データセット参照API - データセットのフィルタリング条件と構造を参照します。",
    inputSchema: {
      type: "object",
      properties: {
        data_set_id: {
          type: "string",
          description:
            "Dataset ID. " +
            "データセットID",
        },
        lang: {
          type: "string",
          description:
            "Language selection: 'J' for Japanese, 'E' for English (default: 'J'). " +
            "言語選択：'J'=日本語、'E'=英語（デフォルト：'J'）",
        },
      },
      required: ["data_set_id"],
    },
  },
  {
    name: "get_e_stat_data_catalog",
    description:
      "Data Catalog Information Retrieval API - Get comprehensive statistics file and database catalog from e-Stat API 3.0. " +
      "Browse and discover available statistical resources, files, and databases with detailed metadata. " +
      "統計ファイル・データベースカタログ情報取得API - 統計リソースの包括的なカタログ情報を取得します。",
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
            "Number of items to retrieve (default: 10). " +
            "取得件数（デフォルト: 10）",
          default: 10,
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
        lang: {
          type: "string",
          description:
            "Language selection: 'J' for Japanese, 'E' for English (default: 'J'). " +
            "言語選択：'J'=日本語、'E'=英語（デフォルト：'J'）",
        },
      },
      required: [],
    },
  },
] as const;