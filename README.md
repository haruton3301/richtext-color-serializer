# Rich Text Color Serializer

スプレッドシートや文書の色付きテキストをXMLタグに変換するWebアプリケーション

## 🌟 機能

- **色付きテキストの自動検出**: クリップボードからリッチテキストを解析し、色情報を抽出
- **カスタム色マッピング**: 特定の色を任意のXMLタグにマッピング
- **自動色タグ生成**: マッピングされていない色は自動的に `<color="#hex">` タグを生成
- **設定の永続化**: LocalStorageを使用してマッピング設定を保存
- **レスポンシブデザイン**: 秋をテーマにした美しいUI
- **TypeScript**: 完全な型安全性

## 🚀 デモ

1. **テストデータ読み込み** ボタンでサンプルデータを試す
2. **色マッピング設定** で独自のルールを追加
3. **クリップボードから貼り付け** でExcel/Googleスプレッドシートのテキストを変換

## 📋 使用例

### 入力（色付きテキスト）

```
通常のテキスト [緑色] 更新済み [赤色] エラー
```

### 出力（XMLタグ）

```xml
通常のテキスト <updated>更新済み</updated> <color="#dc2626">エラー</color>
```

## 🛠 技術スタック

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Code Quality**: ESLint + Prettier
- **Storage**: Browser LocalStorage

## 🏁 セットアップ

### 前提条件

- Node.js 18+
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/[YOUR_USERNAME]/richtext-color-serializer.git
cd richtext-color-serializer

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### ビルド

```bash
# 本番用ビルド
npm run build

# ビルドをプレビュー
npm run preview
```

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── ColorMappingForm.tsx
│   └── TextProcessor.tsx
├── hooks/              # カスタムフック
│   ├── useColorMappingForm.ts
│   └── useLocalStorage.ts
├── utils/              # ユーティリティ関数
│   ├── clipboardParser.ts
│   ├── colorUtils.ts
│   ├── errorHandling.ts
│   ├── serializer.ts
│   └── validation.ts
├── constants.ts        # 定数定義
├── types.ts           # TypeScript型定義
└── App.tsx            # メインアプリ
```

## ⚙ 設定

### デフォルト色マッピング

初期設定では以下のマッピングが含まれています：

| 色        | タグ        |
| --------- | ----------- |
| `#34a853` | `<updated>` |

### カスタムマッピングの追加

1. **色 (16進)** フィールドに色コードを入力（例：`#ff0000`）
2. **タグ名** フィールドにタグ名を入力（例：`error`）
3. **マッピング追加** ボタンをクリック

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# TypeScriptチェック + ビルド
npm run build

# コード品質チェック
npm run lint

# コード整形
npm run format

# 整形チェック（CIで使用）
npm run format:check
```

## 📝 使用方法

### 1. クリップボードからの変換

1. Excel、Googleスプレッドシート等で色付きテキストをコピー
2. **クリップボードから貼り付け** ボタンをクリック
3. 変換結果が **シリアル化出力** セクションに表示
4. **コピー** ボタンで結果をクリップボードにコピー

### 2. テストデータでの確認

1. **テストデータ読み込み** ボタンをクリック
2. サンプルの色付きテキストで動作を確認
3. 色マッピングの追加・削除を試す

## 🤝 貢献

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👤 作成者

**haruton3301**

---

_🤖 Generated with [Claude Code](https://claude.ai/code)_
