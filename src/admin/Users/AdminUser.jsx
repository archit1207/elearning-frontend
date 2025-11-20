import './adminuser.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../main';
import Layout from '../Utils/Layout';
import toast from 'react-hot-toast';

const AdminUser = ({ user }) => {
    const navigate = useNavigate();

    if (user == null) {
        return <div></div>;
    }

    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    const [users, setUsers] = useState([])

    async function fetchUsers() {
        try {
            const { data } = await axios.get(`${server}/api/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setUsers(data.users);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    const updateRole = async (id) => {
        if (confirm("Are you sure You want to Update this User's Role?")) {
            try {
                const { data } = await axios.put(`${server}/api/user/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                toast.success(data.message)
                fetchUsers();

            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    console.log(users);

    return (
        <Layout>
            <div className='users'>
                <h1>All Users</h1>
                <table border={"black"}>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>name</td>
                            <td>email</td>
                            <td>role</td>
                            <td>update role</td>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((e, i) => (
                            <tr key={e._id}>
                                <td>{i + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                                <td>
                                    <button onClick={() => updateRole(e._id)} className="common-btn">Update Role</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default AdminUser
