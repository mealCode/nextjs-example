export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    return res.status(201).json({ message: 'Success' });
  }
}
