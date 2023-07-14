import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import { FiEdit, FiTrash2, FiCircle } from 'react-icons/fi';


const DataComponent = () => {
  const [tasks, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://50.50.50.5:8000/api/tasks'); // Ganti URL sesuai dengan endpoint API Laravel Anda
        setData(response.data.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/6 mx-auto mt-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-center text-xs text-gray-700 uppercase bg-slate-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 text-slate-500">
                          Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-slate-500">
                          Task
                      </th>
                      <th scope="col" className="px-6 py-3 text-slate-500">
                          Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-slate-500">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
              { tasks.map((item) => (
                  <tr key={ item.id } className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 text-slate-500">
                      <img  src={`http://50.50.50.5:8000/storage/data_planner/${item.image}`} className='w-18 h-32 rounded' alt="" />
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap dark:text-white">
                      { item.task }
                    </th>
                    <td className="px-6 py-4 text-slate-500">
                      { item.description }
                    </td>
                    <td className="px-12 py-4">
                      <div className='w-full h-full flex justify-between gap-2'>
                        <FiCircle cursor="pointer" className="text-gray-500" size={22} />
                        <FiEdit cursor="pointer" className="text-blue-500" size={20} />
                        <FiTrash2 cursor="pointer" className="text-red-500" size={20} />
                      </div>
                    </td>
                  </tr>
                  )) }
              </tbody>
          </table>
      </div>
    </Layout>
  );
};

export default DataComponent;