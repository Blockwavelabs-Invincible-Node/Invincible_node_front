#!/usr/bin/env bash

PROJECT_NAME="deploy-fe"
echo "> FE 배포"
cd /home/ubuntu/deploy-fe
sudo rm -rf node_modules/
sudo npm install
sudo npm run build
sudo kill $(sudo lsof -t -i:3000)
sudo nohup npx serve -s build


