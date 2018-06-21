#!/usr/bin/env bash

cd ./location-picker-smart-widget/
yarn run packagr
cd  ../location-picker-widget-demo-app/
yarn add file:./../location-picker-smart-widget/dist.tgz
ng serve --port 4301 --open
