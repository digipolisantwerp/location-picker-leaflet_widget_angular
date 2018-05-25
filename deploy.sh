#!/usr/bin/env bash

cd ./location-picker-smart-widget/
npm run packagr
cd  ../location-picker-widget-demo-app/
npm install ../location-picker-smart-widget/dist.tgz
ng serve --port 4301
