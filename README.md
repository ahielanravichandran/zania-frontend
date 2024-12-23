# Project

Take-home challenge - Zania.ai (Frontend role)
[https://you.ashbyhq.com/Zania/assignment/5be52e9e-4116-4a76-9b23-8cbead4fc0c8](https://you.ashbyhq.com/Zania/assignment/5be52e9e-4116-4a76-9b23-8cbead4fc0c8)

## Project Structure

```
src/
├── components/     # React components
├── service/       # API and storage services
├── mocks/         # MSW handlers
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

## Running Locally

### Using Docker

1. Install Docker and Docker Compose
2. Run:

```bash
docker-compose down -v  # Clean up volumes
docker-compose up --build  # Rebuild and start
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Manual Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Development Journey

### Initial Approach

When I first approached this project, I focused on breaking it down into manageable components and identifying the core requirements. The key challenges were:

1. Implementing smooth drag-and-drop functionality
2. Managing state updates efficiently
3. Creating a reliable saving mechanism
4. Providing clear user feedback

### Technical Decisions

#### State Management

I chose to use React's built-in hooks instead of external state management libraries because:

- The application scope was focused and didn't require complex state sharing
- useState and useRef provided sufficient functionality for our needs
- It kept the bundle size smaller and the codebase simpler

#### Saving Strategy

The periodic saving mechanism was an interesting challenge. I implemented it with:

- A 5-second interval to balance responsiveness and performance
- Change detection to prevent unnecessary API calls
- Visual feedback (spinner and timestamp) to keep users informed
- Error handling for failed saves

#### Mock Service Worker

Using MSW was crucial for development because it:

- Allowed frontend development without a backend
- Provided a realistic API experience
- Made testing easier
- Will simplify the transition to a real backend

#### HTTP Client

- Implements Singleton pattern
- Type-safe requests using TypeScript generics
- Automatic JSON handling
- Bearer token support
- Custom header management

#### Card Service

- Abstracts API communication
- Provides type-safe methods
- Handles data transformation
- Singleton implementation

#### MSW Handlers

- Simulates REST API behavior
- Persists data in localStorage
- Proper HTTP status codes
- Error handling

### Data Flow

1. Component calls CardService method
2. CardService uses HttpClient
3. HttpClient makes request
4. MSW intercepts request
5. Handler processes request
6. Response flows back through chain
