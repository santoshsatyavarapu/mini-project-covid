import {Link} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Header extends Component {
  state = {displaySm: 'add-que-inactive'}

  render() {
    const {activeTab} = this.props
    const {displaySm} = this.state

    const home = activeTab === 'home' ? 'nav-link-active' : 'nav-link-inactive'
    const about =
      activeTab === 'about' ? 'nav-link-active' : 'nav-link-inactive'

    const toggleSmElement = () => {
      this.setState({displaySm: ''})
    }
    const onClickClose = () => {
      this.setState({displaySm: 'add-que-inactive'})
    }
    return (
      <>
        <nav className="nav-header">
          <Link to="/" className="text-decoration">
            <h1 className="covid-19-india">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
          <ul className="nav-menu-lg">
            <li>
              <Link to="/" className={home}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className={about}>
                About
              </Link>
            </li>
          </ul>
          <button
            className="add-que button-element"
            type="button"
            onClick={toggleSmElement}
          >
            <img
              src="https://res.cloudinary.com/dvtgekqon/image/upload/v1682242337/add-to-queue_1add-to-que_kdjgx3.png"
              alt="add-que"
            />
          </button>
        </nav>
        <div className={`nav-menu-sm ${displaySm}`}>
          <ul className="sm-ul-container">
            <li>
              <Link to="/" className={home}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className={about}>
                About
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="button-element"
            onClick={onClickClose}
          >
            <img
              src="https://res.cloudinary.com/dvtgekqon/image/upload/v1683699257/Shapeclose_wkn0ls.png"
              alt="close"
              className="close-image"
            />
          </button>
        </div>
      </>
    )
  }
}

export default Header
