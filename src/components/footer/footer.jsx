import './footer.css'
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiYoutube } from "react-icons/si";

const footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2024 Master Edge Learning Pvt. Ltd  . All Right Reserved <br/> Made with ❤️ By <a href="">Archit Mishra</a>
            </p>
            <div className="social-links">
                <a href=""><AiFillFacebook /></a>
                <a href=""><AiFillInstagram /></a>
                <a href=""><FaSquareXTwitter /></a>
                <a href=""><SiYoutube /></a>
            </div>
        </div>
    </footer>
  );
};

export default footer
