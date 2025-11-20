import { useNavigate } from 'react-router-dom';
import CourseCard from '../../components/coursecard/CourseCard';
import { CourseData } from '../../context/CourseContext';
import Layout from '../Utils/Layout';
import './admincourses.css'
import { UserData } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../main';

const AdminCourses = () => {

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

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [duration, setDuration] = useState("")
    const [file, setFile] = useState("")
    const [imagePrev, setImagePrev] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)

    const categories = [
        "Web Development",
        "App Development",
        "Game Development",
        "Data Science",
        "Data Analytic",
        "Artificial Intelligence",
        "Machine Learning",
        "Cyber Security",
        "Internet of Things",

    ]


    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setFile(file);
        }
    }

        const { courses, fetchCourses } = CourseData();

    const submitHandler = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const myForm = new FormData()

        myForm.append("title", title)
        myForm.append("description", description)
        myForm.append("category", category)
        myForm.append("price", price)
        myForm.append("createdBy", createdBy)
        myForm.append("duration", duration)
        myForm.append("file", file)

        try {
            const { data } = await axios.post(`${server}/api/course/new`, myForm, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success(data.message)
            setBtnLoading(false)
            await fetchCourses();
            setFile("")
            setTitle("")
            setDescription("")
            setDuration("")
            setImagePrev("")
            setCreatedBy("")
            setPrice("")
            setCategory("")
            // setShow(false)
            
        } catch (error) {
            toast.error(error.response?.data?.message)
            setBtnLoading(false)
        }
    }

    return (
        <Layout>
            <div className="admin-courses">
                <div className="left">
                    <h1>All Courses</h1>
                    <div className="dashboard-content">
                        {
                            courses && courses.length > 0 ? courses.map((e) => {
                                return <CourseCard key={e._id} course={e} />
                            }) : <p>No Courses Available Yet</p>
                        }
                    </div>
                </div>
                <div className='right'>
                    <div className="add-course">
                        <div className="course-form">
                            <h2>Add Course</h2>
                            <form onSubmit={submitHandler}>
                                <label htmlFor="text">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <label htmlFor="text">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <label htmlFor="text">Price</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                                <label htmlFor="text">Created By</label>
                                <input
                                    type="text"
                                    value={createdBy}
                                    onChange={(e) => setCreatedBy(e.target.value)}
                                    required
                                />

                                <select value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="">Select Category</option>

                                    {categories.map((c) => (
                                        <option value={c} key={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>


                                <label htmlFor="text">Duration (in Hours)</label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />

                                <input type="file" required onChange={changeImageHandler} />
                                {imagePrev && <img src={imagePrev} alt="" width={300} />}

                                <button type='submit' disabled={btnLoading} className='common-btn'>{btnLoading ? "Please Wait" : "Add"}</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminCourses
