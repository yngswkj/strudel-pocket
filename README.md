# Strudel Pocket

スマホで [Strudel](https://strudel.cc) を快適に操作するための非公式ラッパーです。
単一の HTML ファイルで動作し、ビルド不要でそのままブラウザで開けます。

**非公式プロジェクトです。** Strudel 本体は [uzu/strudel](https://codeberg.org/uzu/strudel) で開発されています。

## 使い方

- ブラウザで `index.html` を開く(Strudel 本体は CDN から読み込むためネット接続が必要)
- または GitHub Pages でホストされたものにアクセスする

## 主な機能

- **スマホ最適化エディタ**: ソフトキーボードを閉じさせない関数チップ・記号キー・カーソル移動キー
- **数値フェーダー**: コード中の数値をタップするとスライダーで動かせる(ライブコーディング向け)
- **再生/停止トグル**: 再生中の編集は自動で再評価。Undo/Redo 付き
- **キーボードショートカット**(PC): `Ctrl+Enter` 再生 / `Ctrl+.` 停止
- **視覚化**: `.pianoroll()` や `.scope()` をコード下の専用エリアに表示(複数可)
- **テーマ**: Pocket / greenText / archBtw(本家テーマの配色を移植)
- **サウンドプロファイル**: 軽量 / 本家相当を切り替え、追加サンプルマップを遅延登録
- **プリセットパターン集**と A/B/C/D スナップショット、自動保存(localStorage)
- **PWA 対応**: ホーム画面追加用の manifest とアプリシェルキャッシュ

## フォルダ構成

```
strudel-pocket/
├── assets/
│   └── icon.svg          # PWA/ブラウザ用アイコン
├── index.html            # アプリ本体(HTML + CSS + JS)
├── manifest.webmanifest  # PWA manifest
├── README.md
├── sw.js                 # Service Worker(アプリシェルのみキャッシュ)
└── LICENSE               # AGPL-3.0
```

Service Worker はアプリのシェルだけをキャッシュします。Strudel 本体やサンプル音源は外部 CDN から取得するため、初回再生や音源取得にはネット接続が必要です。サウンドプロファイルはサンプルマップを登録し、音声ファイル本体は必要になったタイミングで Strudel / superdough が取得します。

## ライセンス

[AGPL-3.0](LICENSE)。本プロジェクトは AGPL-3.0-or-later でライセンスされた
[Strudel](https://codeberg.org/uzu/strudel)(`@strudel/web`)を実行時に CDN から読み込んで利用しており、
テーマ配色の一部は本家リポジトリから移植しています。

サンプル音源は実行時に外部(GitHub / Strudel CDN)から読み込まれ、本リポジトリには含まれません。
