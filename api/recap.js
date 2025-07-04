import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase.from('lokasi').select('*');

  if (error) return res.status(500).send('Gagal ambil data');

  const header = 'timestamp,latitude,longitude,accuracy\n';
  const rows = data.map(d =>
    `${d.timestamp},${d.latitude},${d.longitude},${d.accuracy}`
  ).join('\n');

  res.setHeader('Content-Disposition', 'attachment; filename=rekap-lokasi.csv');
  res.setHeader('Content-Type', 'text/csv');
  res.send(header + rows);
}
