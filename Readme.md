# Implementing DNS Server from Scratch

This repository contains the code to build a DNS server from scratch. The DNS server is containerized using Docker for easy setup and deployment.

## Getting Started

### Learn
If you are a newbie to DNS learn [`what is DNS How it Works`](https://medium.com/@aniketghavte/mongodb-aggregation-pipelines-dbdcac9d3a49)

See the Types of DNS Query [`go through`](https://github.com/aniketghavte/build-own-DNS-server/blob/main/src/types.js)

See the Classes used in DNS Query [`go through`](https://github.com/aniketghavte/build-own-DNS-server/blob/main/src/classes.js)

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
- DNS server run's on port 53 by default!
```sh
docker run -d -p 53:53 dns-server
```

### Verify the DNS Server
You can verify that the DNS server is running by using the dig command run this command on docker container terminal:
```sh
dig @localhost example.com
```

## Deplyment to AWS ec2 for the Actual-Usecase

### Step 1: Launch an EC2 Instance

    1. Log in to your AWS Management Console.
    2. Navigate to the EC2 Dashboard.
    3. Click on "Launch Instance".
    4. Choose an Amazon Machine Image (AMI). We recommend using an Ubuntu Server AMI.
    5 .Choose an instance type. A t2.micro instance should be sufficient for testing purposes.
    6 .Configure instance details as needed.
    7. Add storage if necessary.
    8. Configure security group:
        Add a rule to allow inbound traffic on port 53 (UDP) for DNS.
        Add a rule to allow inbound traffic on port 22 (TCP) for SSH.
    9. Review and launch the instance.

### Step 2: Connect to Your EC2 Instance
    - By using SSH or AWS Console

### Step 3: Install Docker on EC2 Instance
```sh
sudo apt-get update
sudo apt-get install -y docker.io
```

### Step 4: Clone the Repository on EC2 Instance
```sh
git clone https://github.com/yourusername/dns-server.git
cd dns-server
```

### Step 5: Build and Run the Docker Container on EC2 Instance

Build the Docker image:
```sh
sudo docker build -t dns-server .
```

Run the Docker container:
```sh
sudo docker run -p 53:53 dns-server
```

### Step 6: Configuring Your Nameserver Domain

To configure your domain (e.g., ns2.aniketghavte.xyz) to point to your DNS server:

1. Log in to your domain registrar's website.
2. Navigate to the DNS management section.
3. Add a new A record:
    Name: ns2
    Type: A
    Value: Your EC2 instance's public IP address
4. Save the changes.

This will ensure that ns2.aniketghavte.xyz points to your EC2 instance's port 53, where your DNS server is running.












