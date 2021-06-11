set -e
echo "Starting Frontend"
node -r dotenv/config dist/index.js dotenv_config_path=../.env