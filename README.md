# Product Category API

A RESTful API for managing products and categories built with Node.js, Express, Prisma, and MySQL.

## Features

- Complete RESTful API for products and categories
- MySQL database with Prisma ORM
- Comprehensive error handling and validation
- Filtering products by category

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure your database connection in the `.env` file:

```
DATABASE_URL="mysql://username:password@localhost:3306/product_catalog"
PORT=3000
NODE_ENV=development
```

4. Initialize the database:

```bash
npx prisma migrate dev --name init
```

5. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:categoryId` - Get products by category
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Testing with Postman

Import the Postman collection from the `postman` directory to test all API endpoints.