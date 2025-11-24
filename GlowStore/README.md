# Beauty Glow - Skincare Marketplace

A professional skincare product management application built with React and powered by a JSON server backend.

## Features

- View all skincare products with detailed information
- Add new products to the inventory
- Edit existing products
- Professional UI with Tailwind CSS
- Responsive design for all devices
- Real-time data synchronization

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Backend**: JSON Server (mock API)
- **Package Manager**: npm

## Project Structure

```
web/
├── public/
│   ├── produk/           # Product images
│   └── vite.svg
├── src/
│   ├── components/       # Reusable UI components
│   ├── services/         # API service functions
│   ├── App.jsx          # Main application component
│   └── index.css        # Global styles
├── db.json              # Mock database
└── server.js            # JSON server configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm package manager

### Installation

1. Clone or navigate to the project directory
2. Install dependencies:
```bash
npm install
```

### Running the Application

The application requires both frontend and backend servers to run:

#### Option 1: Run both simultaneously (Recommended)
```bash
npm run dev:full
```
This command starts both the JSON server (backend) on port 3001 and the React app (frontend) on port 5173.

#### Option 2: Run servers separately
1. Start the JSON server (backend):
```bash
npm run server
```

2. In a new terminal, start the React application:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the JSON server backend
- `npm run dev:full` - Start both servers simultaneously
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint checks

## API Endpoints

The application uses a JSON server backend with the following endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product
- `POST /products` - Create a new product
- `PUT /products/:id` - Update an existing product
- `DELETE /products/:id` - Delete a product

## Data Model

The application manages skincare products with the following fields:

- `id` (string) - Unique identifier
- `name` (string) - Product name
- `description` (string) - Product description
- `price` (number) - Product price in USD
- `category` (string) - Product category
- `image` (string) - Product image path
- `rating` (number) - Average product rating
- `stock` (number) - Available stock quantity

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue in the repository.
