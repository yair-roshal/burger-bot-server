# Burger Bot Server

This is the server component of the Burger Bot project.

## Description

The Burger Bot Server handles the backend logic and API for the Burger Bot application. It manages orders, inventory, and communication with the client-side interface.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Usage

To start the server, use:

```bash
pm2 start ts-node --name "burger_01" -- -P tsconfig.json ./server/server.ts
```

## Configuration

The server configuration can be found in `ecosystem.config.ts`.

## Dependencies

For a full list of dependencies, please refer to the `package.json` file.

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).