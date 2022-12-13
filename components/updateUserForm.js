'use client';

import { BiBrush } from 'react-icons/bi';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getUser, getUsers, updateUser } from '../lib/helper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateUserForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(['users', formId], () =>
    getUser(formId)
  );

  const updateMutation = useMutation(
    (newFormData) => updateUser(formId, newFormData),
    {
      onSuccess: async (data) => {
        // queryClient.setQueryData('users', (old) => [data]);
        queryClient.prefetchQuery('users', getUsers);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An Error Occured!</div>;
  }

  const { name, avatar, email, salary, date, status } = data;
  const [firstname, lastname] = name ? name.split(' ') : formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname}
     ${formData.lastname ?? lastname}`;
    let updatedUser = Object.assign({}, data, formData, { name: userName });
    updateMutation.mutate(updatedUser);
    toast.success('Employee Updated Successfully!', {
      toastId: 'done1',
    });
  };

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
          defaultValue={firstname}
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={lastname}
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={email}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={salary}
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          defaultValue={date}
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
            defaultChecked={status == 'Active'}
            name="status"
            value="Active"
            id="radioDefault1"
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
            defaultChecked={status == 'Inactive'}
            name="status"
            value="Inactive"
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>

      <button className="flex justify-center text-md w-2/6 bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-500">
        Update{' '}
        <span className="px-1">
          <BiBrush size={24} />
        </span>
      </button>
    </form>
  );
}
