import { Pool } from 'pg';
import { DB_CONFIG } from '@/config/config';

// Create a pool of connections
const pool = new Pool(DB_CONFIG);

export default {
  query: (text: string, params: any[]) => pool.query(text, params),
  pool
};
