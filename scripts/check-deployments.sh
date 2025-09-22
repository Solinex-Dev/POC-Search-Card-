#!/bin/bash

echo "🔍 Checking deployment status..."
echo ""

echo "📊 Vercel Deployment:"
curl -s -I https://search-card-finance-n00m89rhw-vanilaos-projects.vercel.app | head -3

echo ""
echo "📊 GitHub Pages Deployment:"
curl -s -I https://vanilao.github.io/POC-Search-Card/ | head -3

echo ""
echo "🔧 To enable GitHub Pages:"
echo "1. Go to: https://github.com/vanilao/POC-Search-Card/settings/pages"
echo "2. Under 'Source', select 'Deploy from a branch'"
echo "3. Select 'gh-pages' branch and '/ (root)' folder"
echo "4. Click 'Save'"
echo "5. Wait 2-3 minutes for deployment"

echo ""
echo "✅ Both deployments will then be available:"
echo "   - Vercel: https://search-card-finance-n00m89rhw-vanilaos-projects.vercel.app"
echo "   - GitHub Pages: https://vanilao.github.io/POC-Search-Card/"
