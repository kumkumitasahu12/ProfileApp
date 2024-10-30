FROM node:18
WORKDIR /app
COPY ./WebUI/package*.json ./
RUN npm install
COPY ./WebUI ./
RUN npm run build
CMD ["npx", "http-server", "dist/web-ui"]
