#!/bin/bash

# NPM publish script for @nyuta/estat-mcp

set -e

echo "🚀 Publishing @nyuta/estat-mcp to npm..."

# Check if logged in to npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Please login to npm first: npm login"
    exit 1
fi

# Clean and build
echo "🧹 Cleaning previous build..."
npm run clean

echo "🔨 Building project..."
npm run build

# Run tests if they exist
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    echo "🧪 Running tests..."
    npm test
fi

# Version bump (optional)
read -p "Do you want to bump the version? (patch/minor/major/skip): " version_type
case $version_type in
    patch|minor|major)
        echo "📈 Bumping $version_type version..."
        npm version $version_type
        ;;
    skip)
        echo "⏭️  Skipping version bump..."
        ;;
    *)
        echo "❌ Invalid option. Skipping version bump..."
        ;;
esac

# Publish to npm
echo "📦 Publishing to npm..."
npm publish --access public

echo "✅ Successfully published to npm!"
echo "🔗 View at: https://www.npmjs.com/package/@nyuta/estat-mcp"
echo "📖 Repository: https://github.com/nyuta01/estat-mcp"

# Optional: Push git tags if version was bumped
if [ "$version_type" != "skip" ] && [ "$version_type" != "" ]; then
    read -p "Push git tags? (y/n): " push_tags
    if [ "$push_tags" = "y" ]; then
        echo "🏷️  Pushing git tags..."
        git push origin --tags
    fi
fi

echo "🎉 All done!"