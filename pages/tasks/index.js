import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../components/layout";

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
      <div>
        {tasks.map(item => (
          <div key={item.id}>{item.task}</div>
        ))}
      </div>
    </Layout>
  );
};

export default DataComponent;
