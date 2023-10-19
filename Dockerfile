FROM node:20-alpine3.17
RUN npm install pm2 -g
WORKDIR /app
COPY . .
RUN npm install
RUN npm install --prefix client
RUN npm run build --prefix client
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]