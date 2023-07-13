# Stage 1 - Build the React App
FROM node:16-alpine as react-build
WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm install && npm cache clean --force
COPY ./client .
RUN npm run build && rm -rf node_modules

# Stage 2 - the Node.js server with Socket.IO
FROM node:16-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install --only=prod && npm cache clean --force
COPY . .
COPY --from=react-build /app/client/build ./client/build

# Set environment variables
ENV NODE_ENV=production
ENV buildTag=1.0

# Expose port
EXPOSE 3000

CMD [ "node", "server.js" ]
