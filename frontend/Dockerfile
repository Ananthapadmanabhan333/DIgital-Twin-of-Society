FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# We can run dev for local development or build for prod.
# For this deployable setup, let's run dev so we don't have to wait for next build locally,
# but we could also build.
CMD ["npm", "run", "dev"]
