FROM node:18.16.0

RUN mkdir -p /root/workspace
COPY . /root/workspace/
WORKDIR /root/workspace
RUN npm install
RUN npm run build
EXPOSE 3000
CMD npm start