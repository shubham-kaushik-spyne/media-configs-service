#!/bin/bash
imageName=node-sails-boilerplate
containerName=node-sails-boilerplate

sudo docker build -t $imageName  . -f ./dev.Dockerfile

echo Delete old container...
sudo docker rm -f $containerName

echo Run new container...
sudo docker run -d -p 2221:1337 --name $containerName --restart unless-stopped $imageName

# docker-compose up -d --scale transaction-credit-service=1