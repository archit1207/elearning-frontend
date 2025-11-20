import { UserData } from '../../context/UserContext';
import './Auth.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CourseData } from '../../context/CourseContext';

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser  } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async(e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                  required
                />

                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  required
                />

                <button disabled={btnLoading} type='submit' className='common-btn'>
                  {btnLoading ? "Please wait..." : "Login"}
                </button>
            </form>
            <p>
                Don't have an Account? <Link to='/register'>Register</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
