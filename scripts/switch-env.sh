#!/bin/bash

BACKEND_URL="http://localhost:5000"

# Detect current git branch
BRANCH=$(git branch --show-current)

TARGET_ENV="dev"

echo "--------------------------------"
echo "Current Git Branch: $BRANCH"
echo "--------------------------------"

# Branch → environment mapping
if [[ "$BRANCH" == "main" ]]; then
    TARGET_ENV="prod"
elif [[ "$BRANCH" == staging/* ]]; then
    TARGET_ENV="staging"
elif [[ "$BRANCH" == feature/* ]]; then
    TARGET_ENV="dev"
else
    TARGET_ENV="dev"
fi

echo "Mapped Environment: $TARGET_ENV"

ENV_FILE="environments/$TARGET_ENV/.env"

# Check if config exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Environment config not found: $ENV_FILE"
    exit 1
fi

echo "Loading environment config..."
cat "$ENV_FILE"

echo ""
echo "Checking backend for existing environment..."

EXISTS=$(curl -s "$BACKEND_URL/env" | grep "\"$BRANCH\"")

if [ -z "$EXISTS" ]; then
    echo "Creating environment..."

    RESPONSE=$(curl -s -X POST "$BACKEND_URL/env" \
        -H "Content-Type: application/json" \
        -d "{\"branch\":\"$BRANCH\"}")

    echo "$RESPONSE"
else
    echo "Environment already exists for branch $BRANCH"
fi

echo "--------------------------------"
echo "Environment ready for branch $BRANCH"
echo "--------------------------------"
