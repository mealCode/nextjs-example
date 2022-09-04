export default function handler(req, res) {
  const { eventId } = req.query;

  switch (req.method) {
    case 'POST': {
      const { email, name, text } = req.body;

      if (!email || !name || !text) {
        return res.status(400).json({ message: 'Invalid payload' });
      }

      const newComment = {
        id: new Date().toISOString(),
        name,
        email,
        text,
      };

      return res
        .status(201)
        .json({ message: 'Comment added', comment: newComment });
    }

    default: {
      const comments = [
        {
          id: 'c1',
          name: 'Jeff',
          comment: 'First comment',
          id: 'c2',
          name: 'Max',
          comment: 'Second comment',
          id: 'c3',
          name: 'Andrew',
          comment: 'Third comment',
        },
      ];

      return res.status(200).json({ comments });
    }
  }
}
