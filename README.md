# aludka

Project about ludomanics

## Getting Started

1. Create `.env` file at the root of project

| Variable   | Example Value           | Description                                  |
| ---------- | ----------------------- | -------------------------------------------- |
| `TON_CENTER_API_CLIENT_KEY`  | `f2408569bec6bbfb4161e0780****************994ea3e8fee8fbf53e8a2f16`   | **Required**. The base URL for the API.                    |


2. Install dependencies:
   ```bash
   pnpm install
   ```

## Run app in the development mode:

For front:
```bash
pnpm run front:dev
```

For server:
```bash
pnpm run server:dev
```

Deployment to Vercel in Dev Mode:
```bash
pnpm run vercel:dev
```

## Deployment
   Example for local, available on `http://localhost:3000`:

   ```bash
   TON_CENTER_API_CLIENT_KEY=f2408569bec6bbfb4161e0780****************994ea3e8fee8fbf53e8a2f16 docker compose up --build
   ```
