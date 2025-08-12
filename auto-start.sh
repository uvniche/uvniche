#!/bin/bash

# Auto-start script for uvniche project
# This script automatically installs dependencies and starts the dev server

echo "🚀 Starting uvniche development server..."

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🔥 Starting dev server with Turbopack..."
npm run dev
