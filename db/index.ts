//PG-Verbindung
import { Pool } from "pg";
import * as dotenv from "dotenv";
import { QueryResult } from "pg";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

type QueryCallback = (err: Error, result: QueryResult<any>) => void;

// Alte JS-Variante ohne Typen (noch mit Callback):
// const query = async (sqlText, param, callback) => {
//   return pool.query(sqlText, param, callback);
// };

// Neue TypeScript-Variante (ohne Callback, mit Typen):
const query = async (
  sqlText: string,
  param?: any[]
): Promise<QueryResult<string>> => {
  return pool.query(sqlText, param);
};

export { query };
