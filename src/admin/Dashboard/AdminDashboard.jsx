import './admindashboard.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext';
import Layout from '../Utils/Layout';
import axios from 'axios';
import { server } from '../../main';

const AdminDashboard = () => {
  const { user } = UserData();
  const navigate = useNavigate()

  if (user == null) {
    return <div></div>;
  }

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [stats, setStats] = useState([])

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchStats();
  },[]);

  return (
    <div>
      <Layout>
        <div className="main-content">
          <div className="box">
            <p>Total Courses</p>
            <p>{stats.totalCourses}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="box">
            <p>Total Uses</p>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard
