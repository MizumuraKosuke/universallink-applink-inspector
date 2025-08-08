# Universal Link Inspector

Universal Link と App Link の検証用 Web フロントエンド

## 使用方法

1. 開発サーバーを起動（Cloudflared でHTTPS URL生成）:
```bash
yarn dev:tunnel
```

2. 生成された HTTPS URL で設定ファイルを確認:
- `https://your-url.trycloudflare.com/.well-known/apple-app-site-association`
- `https://your-url.trycloudflare.com/.well-known/assetlinks.json`

## 設定変更

`public/.well-known/` 内のファイルを編集:
- `apple-app-site-association`: iOS Universal Links設定
- `assetlinks.json`: Android App Links設定

## 機能

- iOS/Android 設定内容のリアルタイム表示
- Cloudflared による HTTPS URL 自動生成
- 設定ファイルの直接編集とプレビュー