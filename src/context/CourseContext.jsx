import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [mycourse, setMyCourse] = useState([]);

    async function fetchCourses() {
        try {
            const { data } = await axios.get(`${server}/api/course/all`);
            setCourses(data.courses);
        } catch (error) {}
    }

    async function fetchCourse(id) {
        try {
            const { data } = await axios.get(`${server}/api/course/${id}`);
            setCourse(data.course);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMyCourse = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const { data } = await axios.get(`${server}/api/mycourse`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMyCourse(data.courses);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        fetchMyCourse();
    }, []);

    return (
        <CourseContext.Provider
            value={{
                courses,
                fetchCourses,
                fetchCourse,
                course,
                mycourse,
                fetchMyCourse
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const CourseData = () => useContext(CourseContext);
