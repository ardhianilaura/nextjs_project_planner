import Modal from "./modal";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState('');
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
    
  //state validation
  const [validation, setValidation] = useState({});
    
  // function "handleFileChange"
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
    
  //method "storeTask"
  const storeTask = async (e) => {
    e.preventDefault();
    
    //define formData
    const formData = new FormData();
    
    //append data to "formData"
    formData.append('image', image);
    formData.append('task', task);
    formData.append('description', description);
            
    //send data to server
    await axios.post(`http://50.50.50.25:8000/api/tasks`, formData)
    .then(() => {
    
      //redirect
      router.refresh();
    
    })
    .catch((error) => {
    
      //assign validation on state
      setValidation(error);
    })
  };
  return (
    <div className='text-center w-full mt-5'>
      <button
        onClick={() => setModalOpen(true)} 
        className='w-2/6 bg-transparent hover:bg-slate-500 
        text-slate-500 font-semibold hover:text-white 
        py-2 px-4 border border-slate-500 hover:border-transparent rounded'
      >
        Add a New Task
      </button>
      <Modal isOpen={modalOpen} setModalOpen={setModalOpen} > 
        <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
        <button onClick={() => setModalOpen(false)}  className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2">✕</button>
          <form onSubmit={ storeTask } action="" className="form my-6">
            <div className="mb-4">
              <label htmlFor="task" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Task</label>
              <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Masukkan Task" className="bg-gray-50 border form-control border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
            </div>
            {
              validation.task &&
              <div className="alert alert-danger">
                {validation.task}
              </div>
            }
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Masukkan Description" className="bg-gray-50 border form-control border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {
              validation.description &&
              <div className="alert alert-danger">
                {validation.description}
              </div>
            }
            <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Image</label>
              <input type="file" className="form-control" onChange={handleImageChange}/>
            </div>
            {
              validation.image &&
              <div className="alert alert-danger mb-2 text-sm">
                {validation.image}
              </div>
            }
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}; 

export default AddTask;