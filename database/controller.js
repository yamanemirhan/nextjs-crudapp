// Controller

import User from '../model/user';

// GET: http://localhost:3000/api/user
export async function getUsers(req, res) {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(404).json({ message: 'No User Found!' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users!' });
  }
}

// GET: http://localhost:3000/api/user/:userId
export async function getUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await User.findById(userId);
      return res.status(200).json(user);
    }

    res.status(404).json({ error: 'User not selected!' });
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching user!' });
  }
}

// POST: http://localhost:3000/api/user
export async function createUser(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: 'Form data is required!' });
    }

    User.create(formData, function (err, data) {
      return res.status(201).json({ message: 'User created successfully!' });
    });
  } catch (error) {
    res.status(404).json({ error: 'Error while creating user!' });
  }
}

// PUT: http://localhost:3000/api/user/:userId
export async function updateUser(req, res) {
  try {
    const { userId } = req.query;

    const formData = req.body;

    if (userId && formData) {
      await User.findByIdAndUpdate(userId, formData);

      res.status(200).json({ message: 'User updated successfully!' });
    }

    res.status(404).json({ error: 'User not selected!' });
  } catch (error) {
    res.status(404).json({ error: 'Error while updating user' });
  }
}

// DELETE: http://localhost:3000/api/user/:userId
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: 'User deleted successfully!' });
    }

    res.status(404).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(404).json({ error: 'User not selected!' });
  }
}
