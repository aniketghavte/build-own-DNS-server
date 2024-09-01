# Implementing DNS Server from Scratch

This repository contains the code to build a DNS server from scratch. The DNS server is containerized using Docker for easy setup and deployment.

## Getting Started

If you are a newbie to DNS learn [`what is DNS How it Works`](https://medium.com/@aniketghavte/mongodb-aggregation-pipelines-dbdcac9d3a49)


### Prerequisites

- Docker installed on your machine. You can download Docker from [here](https://www.docker.com/products/docker-desktop).
-- Or
- You can Run it into your local machine directly but there might be some issue of firewall or port so its better to run it on docker

### Clone the Repository

First, clone the repository to your local machine:

```sh
git clone https://github.com/yourusername/dns-server.git
cd dns-server
```

### Set up the MongoDBURI in .env file if you are using DB to demonstrate

```sh
MONGO_URI=YOUR-MONOGO-URI
```

### Build and Run the Docker Container

Build the Docker image:
```sh
docker build -t dns-server .
```

Run the Docker container:
```sh
docker run -d -p 53:53 dns-server
```

### Verify the DNS Server
You can verify that the DNS server is running by using the dig command run this command on docker container terminal:
```sh
dig @localhost example.com
```


