import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  host: config.db.host,
  port: parseInt(config.db.port as string, 10),
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
});

// error handler for pool
pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
