FROM node:18-bullseye

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean any existing installations
RUN rm -rf node_modules package-lock.json

# Install dependencies with verbose logging
RUN npm install --verbose

# Rebuild esbuild to match Linux environment
RUN npm rebuild esbuild

# Optional: manually install Rollup native binary (if needed)
RUN npm install @rollup/rollup-linux-x64-gnu --save-optional --verbose

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Start the app with verbose logging
CMD ["npm", "run", "dev", "--verbose"]
