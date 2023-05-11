import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <Link to="/" className="text-decoration">
          <h1 className="covid-19-india">
            COVID19<span className="india">INDIA</span>
          </h1>
        </Link>
        <p className="footer-message">
          we stand with everyone fighting on the front lines
        </p>
        <p className="footer-message">Please go back to the homepage</p>
        <div>
          <VscGithubAlt className="footer-icons-github" />
          <FiInstagram className="footer-icons-instagram " />
          <FaTwitter className="footer-icons-twitter" />
        </div>
      </div>
    </footer>
  )
}
