FROM node:18-alpine

WORKDIR /frontend

# Enable Corepack and set correct Yarn version
RUN corepack enable && corepack prepare yarn@3.8.2 --activate

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Build and Start server
CMD ["sh", "-c", "yarn build && yarn start"]
