# syntax = docker/dockerfile:1

# Use a newer Node.js version (supports global File object)
ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# --- Build Stage ---
FROM base as build

# Install packages needed to build native node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install dependencies
COPY --link package-lock.json package.json ./
RUN npm ci

# Install additional packages (you already have cheerio)
RUN npm install cheerio

# Copy application source code
COPY --link . .


# --- Final Stage (Runtime) ---
FROM base

# Copy compiled app and node_modules from build stage
COPY --from=build /app /app

# Open the desired port
EXPOSE 8765

# Start your server
CMD [ "node", "app.js" ]
