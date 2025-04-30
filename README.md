# Bun.js Backend Application

A modern, high-performance backend application built with Bun.js and TypeScript, featuring authentication, user management, and API documentation.

## Features

- 🚀 Built with [Bun.js](https://bun.sh/) for high performance
- 📝 TypeScript for type safety and better developer experience
- 🔐 Authentication system with JWT
- 👥 User management
- 📊 Database integration with Drizzle ORM
- 🔄 Redis caching
- 📚 Swagger API documentation
- 🛠️ Modular architecture with MVC pattern

## Prerequisites

- [Bun](https://bun.sh/) installed on your system
- PostgreSQL database
- Redis server

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up your environment variables (create a `.env` file based on `.env.example`)

## Database Setup

The project uses Drizzle ORM for database management. To set up your database:

1. Update database configuration in `drizzle.config.ts`
2. Run migrations:
   ```bash
   bun run migrate
   ```

## Running the Application

Development mode:
```bash
bun run dev
```

Production mode:
```bash
bun run start
```

## Project Structure

```
src/
├── config/         # Application configuration
├── controllers/    # Request handlers
├── dto/           # Data Transfer Objects
├── lib/           # Database and Redis setup
├── middleware/    # Custom middleware
├── models/        # Data models
├── plugins/       # Application plugins
├── routes/        # API routes
├── services/      # Business logic
└── utils/         # Utility functions
```

## API Documentation

The API documentation is available via Swagger UI when the application is running:
```
http://localhost:<PORT>/docs
```

## Testing

You can test the API endpoints using the provided `test-api.http` file with REST Client.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.