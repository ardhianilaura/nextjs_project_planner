import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import { FiEdit, FiTrash2, FiCircle } from 'react-icons/fi';
import Modal from '../components/modal';
import { useRouter } from "next/navigation";

const DataComponent = ({data}) => {
  const router = useRouter();
  const [tasks, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [editedData, setEditedData] = useState(data);

  // state validation
  const [setValidation] = useState({});
  
  // for onChange
  const handleChange = (e) => {
    const { name, value } =  e
    setEditedData({ ...editedData, [name]: value });
  };

  // function "handleFileChange" 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // function "handleSubmit" at form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append('image', selectedImage);
    formData.append('task', editedData?.task);
    formData.append('description', editedData?.description);
    formData.append('_method', 'PUT');
    
    //send data to server
    await axios.post(`http://50.50.50.25:8000/api/tasks/${editedData?.id}`, formData)
    .then(() => {

        //redirect
        router.refresh();

    })
    .catch((error) => {
    
      //assign validation on state
      setValidation(error);
    })
    
  };

  const handleUpdate = (updatedData) => {
    const updatedArray = data.map((item) => {
      if (item.id === updatedData.id) {
        return updatedData;
      }
      return item;
    });
    setData(updatedArray);
  };

  const openModalEdit = (id)=>{ 
    
    const findTask = tasks.find(item => item.id === id) 
    setEditedData(findTask);
    console.log(findTask)
    setModalOpen(true) 
  }

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://50.50.50.25:8000/api/tasks/${id}`);
    router.refresh();
  }
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://50.50.50.25:8000/api/tasks'); // Ganti URL sesuai dengan endpoint API Laravel Anda
      //const syu = [{ id: 1, task: "Persebaya", image: "skksks.jpg", description: 'soonice 7'}, {id: 2, task: "PSIS", image: "skksks.jpg", description: 'soonice'}]
      setData(response.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div htmlFor="tabel-data" className="mb-10 relative overflow-x-auto shadow-md sm:rounded-lg w-4/6 mx-auto mt-8">
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
          { tasks.map((item, idx) => (
            <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 text-slate-500">
                <img  src={`http://50.50.50.25:8000/storage/data_planner/${item.image}`} className='w-18 h-32 rounded' alt="" />
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

                  <FiEdit onClick={() => openModalEdit(item.id) }   cursor="pointer" className="text-blue-500" size={20} />
                    <Modal isOpen={modalOpen} setModalOpen={setModalOpen} onUpdate={handleUpdate}>
                      <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                      <button onClick={() => setModalOpen(false)}  className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2">✕</button>
                        <form onSubmit={handleSubmit} action="" className="form my-6">
                          <div className="mb-4">
                            <label htmlFor="task" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Task</label>
                            <input type="text" 
                              defaultValue={editedData?.task ? editedData?.task : ""} onChange={(e)=> handleChange({name: "task", value: e.target.value })}
                              className="bg-gray-50 border form-control border-gray-300 text-slate-500 text-sm rounded-lg
                               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  
                              />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Description</label>
                            <input type="text" 
                              defaultValue={editedData?.description ? editedData?.description : ""} onChange={(e)=> handleChange({name: "description", value: e.target.value })} 
                              className="bg-gray-50 border form-control border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500" required  
                              />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Image</label>
                            <input type="file" className="form-control" onChange={handleImageChange}/>
                          </div>
                          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                        </form>
                      </div>
                    </Modal>

                  <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={20} />
                  <Modal isOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                      <button onClick={() => setOpenModalDelete(false)}  className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2">✕</button>
                      <div className='text-center w-full'>
                        <h3 className="text-lg mt-5 text-slate-500">Are you sure, you want to delete this task?</h3>
                        <div className="w-full m-auto mt-10">
                          <button
                            onClick={() => handleDeleteTask(item.id)} 
                            className="btn text-white bg-red-500 px-10 py-2 mb-4 rounded">YES
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
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