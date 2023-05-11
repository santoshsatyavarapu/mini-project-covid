import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dvtgekqon/image/upload/v1683731243/Group_7484notFoundImage_ldgtsm.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-fount-heading">PAGE NOT FOUND</h1>
    <p className="not-found-para">
      we’re sorry, the page you requested could not be found <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="text-decoration">
      <button type="button" className="home-button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
