import { Link, useParams } from 'react-router-dom'
import './PaymentSuccess.css'
import { UserData } from '../../context/UserContext.jsx';

const PaymentSuccess = () => {
    const params = useParams();
    const { user, fetchUser } = UserData();
  return (
    <div className='payment-success-page'>

    {user && <div className='success-message'>
        <h2>Payment Successfull</h2>
        <p>Your Course Subscription has been Activated</p>
        <p>Reference Number : {params.id}</p>
        <Link to={`/:id/dashboard`} className="common-btn">Go to Dashboard</Link>
        </div>
    }
    </div>
  )
}

export default PaymentSuccess
