# Use Node.js 22.20.0 as specified in .nvmrc
FROM node:22.20.0-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies using bun (faster than npm)
RUN npm install -g bun && bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "3000"]
