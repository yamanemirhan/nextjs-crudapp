'use client';

import { BiCheck, BiUserPlus, BiX } from 'react-icons/bi';
import Table from '../components/table';
import Form from '../components/form';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../redux/reducer';
import { deleteUser, getUsers } from '../lib/helper';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleChangeAction());
  };

  const deleteHandler = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      await queryClient.prefetchQuery('users', getUsers);
      dispatch(deleteAction(null));
      toast.error('Employee Deleted Successfully!');
    }
  };

  const cancelHandler = () => {
    dispatch(deleteAction(null));
  };

  return (
    <main className="py-5">
      <h1 className="text-xl md:text-5xl text-center font-bold py-10">
        Employee Management
      </h1>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button
            onClick={handleClick}
            className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800"
          >
            Add Employee
            <span className="px-1">
              <BiUserPlus size={23} />
            </span>
          </button>
        </div>
        {deleteId ? (
          DeleteUserComponent({ deleteHandler, cancelHandler })
        ) : (
          <></>
        )}
      </div>

      {visible ? <Form /> : <></>}

      <div className="container mx-auto">
        <Table />
      </div>
    </main>
  );
}

function DeleteUserComponent({ deleteHandler, cancelHandler }) {
  return (
    <div className="flex gap-5">
      <button className="cursor-default">Are you sure?</button>
      <button
        onClick={deleteHandler}
        className="flex bg-rose-500 text-white px-4 py-2 border rounded-md hover:bg-red-500 hover:border-rose-500 hover:text-gray-50"
      >
        Yes{' '}
        <span>
          <BiX size={25} color="rgb(255,255,255)" />
        </span>
      </button>
      <button
        onClick={cancelHandler}
        className="flex bg-green-400 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50"
      >
        No{' '}
        <span>
          <BiCheck size={25} color="rgb(255,255,255)" />
        </span>
      </button>
    </div>
  );
}
