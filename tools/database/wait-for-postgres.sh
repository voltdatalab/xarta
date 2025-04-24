if [ -z "$XARTA_DB_HOST" ]; then
    echo "❌ Error: XARTA_DB_HOST is not set";
    exit 1;
fi

echo "XARTA_DB_HOST: $XARTA_DB_HOST"

until pg_isready -h "$XARTA_DB_HOST"; do
    echo "⏳ Waiting for Postgres...";
    sleep 1;
done;
echo "✅ Postgres is ready!";