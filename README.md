# Strudel Pocket

スマホで [Strudel](https://strudel.cc) を快適に操作するための非公式ラッパーです。
単一の HTML ファイルで動作し、ビルド不要でそのままブラウザで開けます。

**非公式プロジェクトです。** Strudel 本体は [uzu/strudel](https://codeberg.org/uzu/strudel) で開発されています。

## 使い方

- ブラウザで `index.html` を開く(Strudel 本体は CDN から読み込むためネット接続が必要)
- または GitHub Pages でホストされたものにアクセスする

## 主な機能

- **スマホ最適化エディタ**: ソフトキーボードを閉じさせない関数チップ・記号キー・カーソル移動キー
- **入力補助**: 自動インデント、Tabインデント、引用符補完、`Ctrl+/` と `//` キーのコメント切替
- **数値フェーダー**: コード中の数値をタップするとスライダーで動かせる(ライブコーディング向け)
- **再生設定**: 再生中の自動更新ON/OFF、BPMスライダー、非アクティブ時停止/バックグラウンド再生切替
- **キーボードショートカット**(PC): `Ctrl+Enter` 再生 / `Ctrl+.` 停止
- **視覚化**: `.pianoroll()` や `.scope()` をコード下の専用エリアに表示(複数可)。テーマ色とアクティブ音符ハイライトに対応
- **テーマ**: Pocket / greenText / archBtw(本家テーマの配色を移植)
- **サウンドマップ**: 本家相当の追加サンプルマップを起動時に登録
- **General MIDI SoundFont**: ローカルの固定GMマップから `gm_cello` / `gm_viola` / `gm_contrabass` などの `gm_*` 音色を登録
- **サウンド検索**: 設定 > サウンドで音色を検索し、タップ試聴・長押しコピーからエディタへ貼付
- **サンプルキャッシュ**: 一度取得した許可済みサンプルを再利用し、ドロワーから件数確認・削除
- **曲ライブラリ**: 作成した曲を IndexedDB に保存・呼び出し。テーマと A/B/C/D スナップも保持し、JSON 書き出し・読み込み・共有リンクに対応
- **プリセットパターン集**と A/B/C/D スナップショット、自動保存(localStorage)
- **PWA 対応**: ホーム画面追加用の manifest とアプリシェルキャッシュ

## UI 方針

機能追加時はメイン画面を散らかさず、設定・管理・詳細表示は既存ドロワー内へ収めます。
判断基準は [docs/ui-policy.md](docs/ui-policy.md) を参照してください。

## フォルダ構成

```
strudel-pocket/
├── assets/
│   ├── icon.svg          # PWA/ブラウザ用アイコン
│   └── gm-soundfonts.json # General MIDI SoundFont音色マップ
├── index.html            # アプリ本体(HTML + CSS + JS)
├── manifest.webmanifest  # PWA manifest
├── README.md
├── sw.js                 # Service Worker(アプリシェル + サンプルキャッシュ)
└── LICENSE               # AGPL-3.0
```

Service Worker はアプリシェルをキャッシュし、HTML は更新を優先して取得します。Strudel 本体、SoundFont補助モジュール、固定GMマップも一度オンラインで取得すると再利用されます。起動時にサンプルマップを登録し、音声ファイル本体は必要になったタイミングで Strudel / superdough が取得します。一度取得した許可済みサンプル(Strudel CDN / GitHub raw / jsDelivr / WebAudioFont data)は Cache Storage に保存され、ドロワーから件数確認と削除ができます。

## ライセンス

[AGPL-3.0](LICENSE)。本プロジェクトは AGPL-3.0-or-later でライセンスされた
[Strudel](https://codeberg.org/uzu/strudel)(`@strudel/web`)を実行時に CDN から読み込んで利用しており、
テーマ配色の一部は本家リポジトリから移植しています。

サンプル音源は実行時に外部(GitHub / Strudel CDN)から読み込まれ、本リポジトリには含まれません。
