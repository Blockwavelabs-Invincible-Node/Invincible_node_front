#!/usr/bin/env bash

DEPLOY_ROOT="/home/ubuntu/deploy-fe"
echo "[log] FE 배포 시작"

echo "[log] kill existed port"
sudo kill $(sudo lsof -t -i:3000)
sleep 5
echo "[log] start server in background"
sudo nohup npx serve -s $DEPLOY_ROOT/build 1>stdout.txt 2>stderr.txt &
sleep 3
echo "[log] 배포 종료"