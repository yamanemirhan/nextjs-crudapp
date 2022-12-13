const BASE_URL = 'http://localhost:3000';

// All Users
export const getUsers = async () => {
  const users = await fetch(`${BASE_URL}/api/user`);
  return users.json();
};

// Single User
export const getUser = async (userId) => {
  const user = await fetch(`${BASE_URL}/api/user/${userId}`);
  if (user) return user.json();
  return {};
};

// Creating a new user
export const createUser = async (formData) => {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const createdUser = await fetch(`${BASE_URL}/api/user`, Options);
    return createdUser.json();
  } catch (error) {
    return error;
  }
};

// Updating the user
export const updateUser = async (userId, formData) => {
  try {
    const Options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const updatedUser = await fetch(`${BASE_URL}/api/user/${userId}`, Options);
    return updatedUser.json();
  } catch (error) {
    return error;
  }
};

// Deleting the user
export const deleteUser = async (userId) => {
  try {
    const Options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    const deletedUser = await fetch(`${BASE_URL}/api/user/${userId}`, Options);
    return deletedUser.json();
  } catch (error) {
    return error;
  }
};
