FROM node:alpine
# set the working direction
WORKDIR /app
ENV HOST 0.0.0.0
ENV PORT 80
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 80
# start app
CMD ["npm", "--max_old_space_size=128","start"]