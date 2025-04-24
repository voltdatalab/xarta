export PGPASSWORD=$XARTA_DB_PASSWORD;
psql -h $XARTA_DB_HOST -U $XARTA_DB_USER -d xarta -f ./tools/database/init.sql