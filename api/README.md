# Directory For Vercel Deployment

Vercel configuration `vercel.json` in the root

```json
{
  "functions": {
    "api/bot.ts": {
      "maxDuration": 10
    },
    "api/serverless.ts": {
      "maxDuration": 10
    }
  },
  "outputDirectory": "app/dist",
  "rewrites": [
		{
			"source": "/service/(.*)",
			"destination": "api/serverless"
		}
	]
}
```

Two functions:
- `api/bot.ts` for bot server
- `api/serverless.ts` for backend, in `rewrites` when API is called for example `https://yoursite.app/service/v1/payments/generate-invoice`, then backend sees - `/service/v1/payments/generate-invoice`.
