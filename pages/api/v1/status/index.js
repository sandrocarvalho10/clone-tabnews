import database from "infra/database.js";
async function status(req, res) {
  const { rows: databaseVersion } = await database.query("SHOW server_version;")
  const databaseVersionValue = databaseVersion[0].server_version;

  const { rows: maxDatabaseConnectionsResult } = await database.query("SHOW max_connections;")
  const maxDatabaseConnectionsResultValue = maxDatabaseConnectionsResult[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const { rows: databaseOpenedConnectionsResult } = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  })
  const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult[0].count;

  const updatedAt = new Date().toISOString()
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(maxDatabaseConnectionsResultValue),
        opened_connections: databaseOpenedConnectionsValue
      }
    }
  });
}

export default status;