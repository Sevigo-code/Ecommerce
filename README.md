# Plant Store with Disease Diagnosis

A modern e-commerce application for plants with an integrated plant disease diagnosis tool. Built with React, TypeScript, and Material-UI.

## Features

- Browse and purchase plants
- Filter products by category
- Shopping cart functionality
- Plant disease diagnosis tool
- Responsive design
- Modern UI with Material-UI components

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd plant-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
plant-store/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Redux store and slices
│   ├── styles/        # SCSS styles
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Router
- Material-UI
- SASS
- Vite

## API Integration

The application uses the following APIs:
- FakeStore API for product data
- (Optional) Plant.id API for plant disease diagnosis

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License 