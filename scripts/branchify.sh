#!/bin/bash

BACKEND="http://localhost:5000"

case "$1" in

    init)
        echo "Initializing Branchify..."

        mkdir -p environments/dev
        mkdir -p environments/staging
        mkdir -p environments/prod

        # Create environment configs
        if [ ! -f environments/dev/.env ]; then
            echo "ENV=development" > environments/dev/.env
        fi

        if [ ! -f environments/staging/.env ]; then
            echo "ENV=staging" > environments/staging/.env
        fi

        if [ ! -f environments/prod/.env ]; then
            echo "ENV=production" > environments/prod/.env
        fi

        mkdir -p scripts

        # Install git hook
        mkdir -p .git/hooks

        cat << 'EOF' > .git/hooks/post-checkout
#!/bin/bash
./scripts/switch-env.sh
EOF

        chmod +x .git/hooks/post-checkout

        echo "Branchify initialized."
        ;;

    status)
        echo "Fetching environments..."
        curl -s $BACKEND/env | jq .
        ;;

    create)
        curl -s -X POST $BACKEND/env \
        -H "Content-Type: application/json" \
        -d "{\"branch\":\"$2\"}" | jq .
        ;;

    stop)
        curl -s -X POST $BACKEND/env/$2/stop | jq .
        ;;

    delete)
        curl -s -X DELETE $BACKEND/env/$2 | jq .
        ;;

    switch)
        ./scripts/switch-env.sh
        ;;

    *)
        echo ""
        echo "Branchify CLI"
        echo "--------------"
        echo "branchify init"
        echo "branchify status"
        echo "branchify create <branch>"
        echo "branchify stop <branch>"
        echo "branchify delete <branch>"
        echo "branchify switch"
        echo ""
        ;;
esac
