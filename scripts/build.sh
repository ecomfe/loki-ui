#!/usr/bin/env bash
set -e

echo "node: $(node -v)"
echo "npm $(npm --version)"
npm i pnpm -g
echo "npm: $(pnpm -v)"
NODE_ENV=development pnpm install --frozen-lockfile
NODE_ENV=production pnpm docs:build

cp -r docs-dist output
