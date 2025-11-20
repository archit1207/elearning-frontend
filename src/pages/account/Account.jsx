import { MdDashboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import './account.css';
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Account = ({ user }) => {

    const { setIsAuth, setUser } = UserData();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        setUser(null);
        toast.success("Logout Successfully");
        navigate('/login');
    }
    return (
        <div>
            {user && (
                <div className="profile">
                    <h2>My Profile</h2>
                    <div className="profile-info">
                        <p>
                            <strong>Name - {user.name}</strong>
                        </p>
                        <p>
                            <strong>Email - {user.email}</strong>
                        </p>
                        <p>
                            <strong>Account Type - {user.role}</strong>
                        </p>

                        <br />
                        
                        <button onClick={() => navigate(`/${user._id}/dashboard `)} className="common-btn logo-txt" >
                            <MdDashboard /> Dashboard
                        </button>

                        <br />

                        {
                            user.role === "admin" && (
                                <button onClick={() => navigate(`/admin/dashboard `)} className="common-btn logo-txt" >
                                    <MdDashboard /> Admin Dashboard
                                </button>
                            )
                        }

                        <br />

                        <button onClick={logoutHandler} className="common-btn logo-txt logout-btn" >
                            <MdOutlineLogout /> LogOut
                        </button>
                    </div>
                    <div></div>
                </div>
            )}
        </div>
    )
}

export default Account
