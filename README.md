# Universal Link Inspector

Web frontend for validating Universal Links and App Links

## Usage

1. Start the development server (generates HTTPS URL with Cloudflared):

```bash
yarn dev:tunnel
```

2. Verify configuration files with the generated HTTPS URL:

- `https://your-url.trycloudflare.com/.well-known/apple-app-site-association`
- `https://your-url.trycloudflare.com/.well-known/assetlinks.json`

## Configuration Changes

Edit files in `public/.well-known/`:

- `apple-app-site-association`: iOS Universal Links configuration
- `assetlinks.json`: Android App Links configuration

## Features

- Real-time display of iOS/Android configuration content
- Automatic HTTPS URL generation with Cloudflared
- Direct editing and preview of configuration files
