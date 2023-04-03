#!/bin/bash
npm install
npm cache clean --force
chmod +x node_modules/@babel/cli/bin/babel.js
npm run build
npm run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run
npm run dev
