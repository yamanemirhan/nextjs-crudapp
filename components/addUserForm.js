'use client';

import { BiPlus } from 'react-icons/bi';
import { useQueryClient, useMutation } from 'react-query';
import { createUser, getUsers } from '../lib/helper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUserForm({ formData, setFormData }) {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.prefetchQuery('users', getUsers);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0) {
      return;
    }
    let { firstname, lastname, email, salary, date, status } = formData;

    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email,
      salary,
      date,
      status: status ?? 'Active',
    };

    createUserMutation.mutate(model);
  };

  if (createUserMutation.isLoading) return <div>Loading...</div>;
  if (createUserMutation.isError)
    return toast.error('An Error Occurred!', {
      toastId: 'error1',
    });

  if (createUserMutation.isSuccess) {
    return toast.success('Employee Added Successfully!', {
      toastId: 'success1',
    });
  }

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className="grid lg:grid-cols-2 w-4/6 gap-4"
    >
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
          placeholder="Date"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="Inactive"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{' '}
        <span className="px-1">
          <BiPlus size={24} />
        </span>
      </button>
    </form>
  );
}
