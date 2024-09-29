FROM node:20

# Çalışma dizini
WORKDIR /usr/app

#copy package.json ve package-lock.json files
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files
COPY . .

COPY ./src/utils/swagger.json ./dist/src/utils/swagger.json

# run build command
RUN npm run build

# open port 3000
EXPOSE 3000

# run the app
CMD ["node", "dist/src/index.js"]
