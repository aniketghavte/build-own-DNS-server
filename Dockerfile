FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
RUN apt-get install -y dnsutils

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
 
RUN npm install

ENTRYPOINT [ "node", "src/server.js" ]