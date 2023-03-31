#!/bin/bash
rm -rf node_modules
npm install
npm run typeorm migration:run
npm run dev
