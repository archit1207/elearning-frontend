import { useNavigate, useParams } from 'react-router-dom';
import './coursedescription.css'
import { CourseData } from '../../context/CourseContext';
import { useEffect, useState } from 'react';
import { server } from '../../main.jsx';
import { UserData } from '../../context/UserContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';


const CourseDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = UserData();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [])

  const checkouthandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const { data: { order } } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "E-Learning",
      description: "Learn With Us",
      order_id: order.id,

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);

        } catch (error) {
          toast.error(error.response?.data?.message || "Verification failed");
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };


  return (
    <>
      {course && <div className='course-description'>
        <div className="course-header">
          <img
            src={`${server}/${course.image}`}
            className='course-image'
            alt=""
          />
          <div className="course-info">
            <h2>{course.title}</h2>
            <p>Instructor : {course.createdBy}</p>
            <p>Duration : {course.duration} Hours</p>
          </div>
        </div>
        <p>{course.description}</p>
        <p>Let's get Started With the Course at ₹{course.price}</p>

        {
          user && user.subscription.includes(course._id) ? (
            <button onClick={() => navigate(`/course/study/${course._id}`)} className='common-btn'>Continue Learning</button>
          ) : (
            <button onClick={checkouthandler} className='common-btn'>Buy Now</button>
          )
        }
      </div>}
    </>
  )
}

export default CourseDescription
