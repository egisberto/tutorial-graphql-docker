FROM node:15

# Bundle APP files
COPY package.json .
COPY yarn.lock .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install --production

# Copy files
COPY ./ .

# Start node.js
CMD ["node", "app.js"]