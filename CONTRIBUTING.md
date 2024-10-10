# Local Development with Discord API Mock

For local development, we use a mock of the Discord API to simulate interactions without requiring a Discord bot token. This improves the developer experience and eliminates security concerns related to token management.

## Setup

1. Clone the repository and install dependencies as usual.
2. No Discord bot token is required for local development.
3. The mock API is automatically used in non-production environments.

## Switching between Mock and Real API

- The mock API is used by default in development environments.
- To use the real Discord API locally (requires a bot token):
  1. Set `NODE_ENV=production` in your `.env` file.
  2. Add your Discord bot token as `DISCORD_BOT_TOKEN` in the `.env` file.

## Customizing Mock Data

To add or modify mock data, edit the JSON object in `src/mocks/discordData.json`.

## Contributing

When submitting pull requests, there's no need to include any Discord bot tokens or real API interactions. The CI/CD pipeline will handle testing with the mock API.
