// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongoDB from '../../database/conn';

export default function handler(req, res) {
  connectMongoDB();
  res.status(200).json({ name: 'John Doe' });
}
