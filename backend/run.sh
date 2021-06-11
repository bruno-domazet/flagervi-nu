set -e
echo "Starting Backend"
node -r dotenv/config dist/index.js dotenv_config_path=../.env