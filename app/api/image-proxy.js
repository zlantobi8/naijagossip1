import sharp from 'sharp';

export default async function handler(req, res) {
  const { url, width } = req.query;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(500).send('Failed to fetch image');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resized = await sharp(buffer)
      .resize(parseInt(width) || 800)
      .jpeg({ quality: 75 })
      .toBuffer();

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(resized);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching image');
  }
}
