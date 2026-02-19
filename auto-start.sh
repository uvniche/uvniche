#!/bin/bash

# Auto-start script for uvniche project
# - Installs dependencies if needed
# - Starts the dev server

set -e

echo "🚀 Starting uvniche development server..."

if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (npm install)..."
  npm install
fi

echo "🔥 Starting dev server (npm run dev)..."
npm run dev

