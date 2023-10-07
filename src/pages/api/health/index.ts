import type { NextApiRequest, NextApiResponse } from 'next';
import { health } from 'services/gracefulShutdown';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (health.getStatus()) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
}
