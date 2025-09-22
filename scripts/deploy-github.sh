#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

# Build the project
echo "📦 Building the project..."
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ GitHub Pages deployment completed!"
echo "🔗 Your app should be available at: https://vanilao.github.io/POC-Search-Card/"
