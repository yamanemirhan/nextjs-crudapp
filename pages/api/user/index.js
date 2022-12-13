// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongoDB from '../../../database/conn';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../../database/controller';

export default async function handler(req, res) {
  connectMongoDB().catch(() =>
    res.status(405).json({ error: 'Error while connecting to database!' })
  );

  //type of request
  const { method } = req;

  switch (method) {
    case 'GET':
      getUsers(req, res);
      break;
    case 'POST':
      createUser(req, res);
      break;
    case 'PUT':
      updateUser(req, res);
      break;
    case 'DELETE':
      deleteUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} not allowed!`);
      break;
  }
}
