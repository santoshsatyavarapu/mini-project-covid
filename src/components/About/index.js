import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {faqs: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const faqArray = fetchedData.faq

      this.setState({
        faqs: [...faqArray],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="primedeals-loader-container" data-testid="aboutRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFaqs = () => {
    const {faqs} = this.state

    return (
      <div className="faq-container">
        <h1 className="faq-heading">About</h1>
        <p className="last-updated">Last update on march 28th 2021.</p>
        <p className="sub-message">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="ul-questions-container" data-testid="faqsUnorderedList">
          {faqs.map(eachElement => (
            <li>
              <h1 className="question">{eachElement.question}</h1>
              <p className="answer">{`${eachElement.answer}`}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header activeTab="about" />
        {apiStatus === 'IN_PROGRESS' && this.renderLoadingView()}
        {apiStatus === 'SUCCESS' && this.renderFaqs()}
        <Footer />
      </>
    )
  }
}

export default About
