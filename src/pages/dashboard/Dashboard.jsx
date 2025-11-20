import CourseCard from '../../components/coursecard/CourseCard';
import { CourseData } from '../../context/CourseContext';
import './dashboard.css'

const Dashboard = () => {
  const {mycourse} = CourseData();
  return (
    <div className='student-dashboard'>
      <h2>Your Courses</h2>
      <div className="dashboard-content">
        {
          mycourse && mycourse.length>0 ? (
            mycourse.map((e)=> <CourseCard key={e._id} course={e} />)
          ) : (
          <p>You Have Not Subscribed to Any Courses</p>
          ) }
      </div>
    </div>
  )
}

export default Dashboard
