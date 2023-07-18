import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import { FiEdit, FiTrash2, FiCircle } from 'react-icons/fi';
import Modal from '../components/modal';

function DataComponent() {
  const [tasks, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState()

  //state
  // const [image, setImage] = useState("");
  // const [task, setTask] = useState(post.task);
  // const [description, setDescription] = useState(post.description);

  //state validation
  const [validation, setValidation] = useState({});
  const openModalEdit = async(id)=>{ 
    setModalOpen(true) 
    const findTask = tasks.find(item => item.id === id)   
    setCurrentDetail(findTask)
  }
  const fetchData = async () => {
      try {
        const response = await axios.get('http://50.50.50.5:8000/api/tasks'); // Ganti URL sesuai dengan endpoint API Laravel Anda
        setData(response.data.data)
      } catch (error) {
        console.error(error);
      }
  };

  const handleFileChange = (e) => {

      //define variable for get value image data
      const imageData = e.target.files[0]

      //check validation file
      if (!imageData.type.match('image.*')) {

          //set state "image" to null
          setImage('');

          return
      }

      //assign file to state "image"
      setImage(imageData);
  }

  //method "updateTask"
  const updateTask = async (e) => {
      e.preventDefault();

      //define formData
      const formData = new FormData();

      //append data to "formData"
      formData.append('image', image);
      formData.append('task', task);
      formData.append('description', description);
      formData.append('_method', 'PUT');
      
      //send data to server
      await axios.post(`http://50.50.50.5:8000/api/tasks/${id}`, formData)
      .then(() => {

          //redirect
          fetchData()

      })
      .catch((error) => {

          //assign validation on state
          setValidation(error.response.data);
      })
      
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout htmlFor>
      <div for="tabel-data" className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/6 mx-auto mt-8">
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

                        <FiEdit onClick={ () => openModalEdit(item.id) }  cursor="pointer" className="text-blue-500" size={20} />
                          <Modal isOpen={modalOpen} setModalOpen={setModalOpen}>
                            <div class="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                            <button onClick={() => setModalOpen(false)}  className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2">✕</button>
                              <form onSubmit={ updateTask } action="" className="form my-6">
                                <div className="mb-4">
                                  <label for="task" class="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Task</label>
                                  <input type="text" value={currentDetail?.task} onChange={(e) => setCurrentDetail(prev => ({...prev, task: e.target.value}))} placeholder="Masukkan Task" class="bg-gray-50 border form-control border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                                </div>
                                <div className="mb-4">
                                  <label for="desc" class="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Task</label>
                                  <input type="text" value={currentDetail?.description} onChange={(e) => setCurrentDetail(prev => ({...prev, description: e.target.value}))} placeholder="Masukkan Task" class="bg-gray-50 border form-control border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                                </div>
                              
                                <div className="mb-4">
                                <label for="image" class="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Image</label>
                                  <input type="file" className="form-control" value={currentDetail?.image} onChange={(e) => setCurrentDetail(prev => ({...prev, image: e.target.files[0]}))}/>
                                </div>
                                {/* {
                                  validation.image &&
                                  <div className="alert alert-danger mb-2 text-sm">
                                    {validation.image}
                                  </div>
                                } */}
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                              </form>
                            </div>
                          </Modal>

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

export default DataComponent