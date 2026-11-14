import { neon } from '@neondatabase/serverless';

// Stores the whole portal state as one JSON document in Postgres (Neon on Vercel).
export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  await sql`CREATE TABLE IF NOT EXISTS portal_state (id INT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now())`;
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const rows = await sql`SELECT data FROM portal_state WHERE id = 1`;
    return res.status(200).json(rows[0] ? rows[0].data : null);
  }
  if (req.method === 'PUT') {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    await sql`INSERT INTO portal_state (id, data) VALUES (1, ${body}::jsonb)
              ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`;
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
