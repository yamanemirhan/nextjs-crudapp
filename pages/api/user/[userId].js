import connectMongoDB from '../../../database/conn';
import { deleteUser, getUser, updateUser } from '../../../database/controller';

export default async function handler(req, res) {
  connectMongoDB().catch(() =>
    res.status(405).json({ error: 'Error while connecting to database!' })
  );

  //type of request
  const { method } = req;

  switch (method) {
    case 'GET':
      getUser(req, res);
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
