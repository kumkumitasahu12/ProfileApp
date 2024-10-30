# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY WebUI/package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire application code to the container
COPY WebUI ./

# Build the Angular application
RUN npm run build --prod

# Install a lightweight server to serve the app
RUN npm install -g http-server

# Expose the port the app runs on
EXPOSE 8080

# Command to run the server
CMD ["http-server", "dist/web-ui", "-p", "8080"]
