#!/bin/bash
rm -rf node_modules
npm install
npm cache clean --force
chmod +x node_modules/@babel/cli/bin/babel.js
npm run build
npm run typeorm migration:run
npm run dev
