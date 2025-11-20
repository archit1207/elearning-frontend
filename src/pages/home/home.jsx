import './home.css'
import { useNavigate } from 'react-router-dom'
import Testimonials from "../../components/testimonials/testimonials"

const home = () => {
    const navigate = useNavigate()
    return(
        <div>
            <div className="home">
                <div className="home-content">
                    <h1>Welcome to MasterEdge Learning</h1>
                    <p>Learn, Grow, Excel</p>
                    <button onClick={()=>navigate("/courses")} className="common-btn">Get Started</button>
                </div>
            </div>
            <Testimonials/>
        </div>
    );
};

export default home
