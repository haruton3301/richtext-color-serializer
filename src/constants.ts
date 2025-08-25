export const DEFAULT_COLOR = '#000000';
export const LOCAL_STORAGE_KEY = 'richtext-color-mappings';

export const VALIDATION_MESSAGES = {
  INVALID_HEX_COLOR: '有効な16進カラーコードを入力してください（例：#ff0000）',
  EMPTY_TAG_NAME: 'タグ名を入力してください',
  INVALID_TAG_NAME:
    'タグ名は英字で始まり、英数字とハイフンのみ使用できます',
} as const;

export const ERROR_MESSAGES = {
  CLIPBOARD_ACCESS:
    'クリップボードにアクセスできません。クリップボードの権限を許可してください。',
  UNKNOWN_ERROR: '不明なエラーが発生しました',
} as const;

export const UI_TEXT = {
  TITLE: 'Rich Text Color Serializer',
  DESCRIPTION:
    'スプレッドシートや文書の色付きテキストをXMLタグに変換します。カスタム色マッピングの設定や自動色検出が使用できます。',
  COLOR_MAPPING_TITLE: '色マッピング設定',
  RICH_TEXT_PROCESSOR_TITLE: 'リッチテキスト処理',
  SERIALIZED_OUTPUT_TITLE: 'シリアル化出力',
  BUTTONS: {
    ADD_MAPPING: 'マッピング追加',
    PASTE_FROM_CLIPBOARD: 'クリップボードから貼り付け',
    PROCESSING: '処理中...',
    LOAD_TEST_DATA: 'テストデータ読み込み',
    COPY: 'コピー',
    REMOVE: '削除',
  },
  FORM_LABELS: {
    COLOR_HEX: '色 (16進)',
    TAG_NAME: 'タグ名',
  },
  PLACEHOLDERS: {
    COLOR: '#ff0000',
    TAG_NAME: 'important',
  },
  CURRENT_MAPPINGS: '現在のマッピング',
} as const;
