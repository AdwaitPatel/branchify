#!/bin/bash

TARGET_REPO=$1

if [ -z "$TARGET_REPO" ]; then
    echo "Usage: ./install.sh <target-repo-path>"
    exit 1
fi

if [ ! -d "$TARGET_REPO/.git" ]; then
    echo "Error: Target is not a git repository"
    exit 1
fi

echo "Installing Branchify into $TARGET_REPO"

# Create directories
mkdir -p "$TARGET_REPO/environments/dev"
mkdir -p "$TARGET_REPO/environments/staging"
mkdir -p "$TARGET_REPO/environments/prod"

mkdir -p "$TARGET_REPO/scripts"

# Copy scripts
cp scripts/switch-env.sh "$TARGET_REPO/scripts/"
chmod +x "$TARGET_REPO/scripts/switch-env.sh"

# Create environment configs if they don't exist
if [ ! -f "$TARGET_REPO/environments/dev/.env" ]; then
    echo "ENV=development" > "$TARGET_REPO/environments/dev/.env"
fi

if [ ! -f "$TARGET_REPO/environments/staging/.env" ]; then
    echo "ENV=staging" > "$TARGET_REPO/environments/staging/.env"
fi

if [ ! -f "$TARGET_REPO/environments/prod/.env" ]; then
    echo "ENV=production" > "$TARGET_REPO/environments/prod/.env"
fi

# Install git hook
HOOK="$TARGET_REPO/.git/hooks/post-checkout"

cat << 'EOF' > "$HOOK"
#!/bin/bash
./scripts/switch-env.sh
EOF

chmod +x "$HOOK"

echo ""
echo "Branchify installed successfully."
echo "Switch branches to trigger environments."
