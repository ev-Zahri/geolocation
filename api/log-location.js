import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Metode tidak didukung');

  const { latitude, longitude, accuracy } = req.body;

  const { error } = await supabase.from('lokasi').insert([
    { latitude, longitude, accuracy }
  ]);

  if (error) return res.status(500).send('Gagal menyimpan lokasi');
  res.status(200).send('Lokasi disimpan');
}
