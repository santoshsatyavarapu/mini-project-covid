import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import statesList from '../Resources'
import BarCharts from '../Charts/BarCharts'
import LineCharts from '../Charts/LineCharts'

import './index.css'

const monthArray = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SpecificState extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    timeLineStatus: apiStatusConstants.initial,
    timeLineData: {},
    stateName: '',
    stateData: {},
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      timeLineStatus: apiStatusConstants.inProgress,
    })

    const stateDetails = statesList.filter(
      eachElement => eachElement.state_code === id,
    )
    const stateName = stateDetails[0].state_name

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const timeLineUrl = `https://apis.ccbp.in/covid19-timelines-data/${id}`
    const responseData = await fetch(timeLineUrl)
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      const stateData = data[id]

      this.setState({
        apiStatus: apiStatusConstants.success,
        stateData,
        stateName,
        activeDetails: 'confirmed',
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }

    if (response.ok && responseData.ok) {
      const timeLineData = await responseData.json()

      this.setState({
        timeLineStatus: apiStatusConstants.success,
        timeLineData,
      })
    } else {
      this.setState({timeLineStatus: apiStatusConstants.failure})
    }
  }

  renderHeading = () => {
    const {stateData, stateName} = this.state
    const date = new Date(stateData.meta.last_updated)
    const day = date.getDate()
    const month = monthArray[date.getMonth()]
    const year = date.getFullYear()
    const stateTotal = stateData.total
    return (
      <div className="state-specific-heading-container">
        <div>
          <h1 className="specific-state-name">{stateName}</h1>
          <p className="last-date">
            Last update on {month} {day}th {year}.
          </p>
        </div>
        <div>
          <p className="tested">Tested</p>
          <p className="tested-value">{stateTotal.tested}</p>
        </div>
      </div>
    )
  }

  renderCasesStats = () => {
    const {stateData, activeDetails} = this.state
    const completeData = stateData.total

    const confirmedClicked = () => {
      this.setState({activeDetails: 'confirmed'})
    }

    const activeClicked = () => {
      this.setState({activeDetails: 'active'})
    }

    const deceasedClicked = () => {
      this.setState({activeDetails: 'deceased'})
    }

    const recoveredClicked = () => {
      this.setState({activeDetails: 'recovered'})
    }

    const confirmedClass =
      activeDetails === 'confirmed' ? 'confirmed-container' : ''

    const activeClass = activeDetails === 'active' ? 'active-container' : ''

    const deceasedClass =
      activeDetails === 'deceased' ? 'deceased-container' : ''

    const recoveredClass =
      activeDetails === 'recovered' ? 'recovered-container' : ''

    return (
      <div className="total-cases-container">
        <div
          className={`total-container confirmed ${confirmedClass}`}
          onClick={confirmedClicked}
          role="button"
          tabIndex={0}
          data-testid="state specific confirmed cases pic"
        >
          <p className="stat-heading">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dvtgekqon/image/upload/v1682305367/Groupconfirmed_rliqy8.png"
            alt="country wide confirmed cases pic"
            className="stat-images"
          />
          <h1 className="stat-value">{completeData.confirmed}</h1>
        </div>

        <div
          className={`total-container active ${activeClass}`}
          onClick={activeClicked}
          role="button"
          tabIndex={0}
          data-testid="stateSpecificActiveCasesContainer"
        >
          <p className="stat-heading">Active</p>
          <img
            src="https://res.cloudinary.com/dvtgekqon/image/upload/v1682305367/protection_1active_jkugvg.png"
            alt="country wide active cases pic"
            className="stat-images"
          />
          <h1 className="stat-value">
            {completeData.confirmed -
              completeData.recovered -
              completeData.deceased}
          </h1>
        </div>
        <div
          className={`total-container recovered ${recoveredClass}`}
          onClick={recoveredClicked}
          role="button"
          tabIndex={0}
          data-testid="stateSpecificRecoveredCasesContainer"
        >
          <p className="stat-heading">Recovered</p>
          <img
            src="https://res.cloudinary.com/dvtgekqon/image/upload/v1682305367/recovered_1recovered_wpvso1.png"
            alt="country wide recovered cases pic"
            className="stat-images"
          />
          <h1 className="stat-value">{completeData.recovered}</h1>
        </div>
        <div
          className={`total-container deceased ${deceasedClass}`}
          onClick={deceasedClicked}
          role="button"
          tabIndex={0}
          data-testid="stateSpecificDeceasedCasesContainer"
        >
          <p className="stat-heading">Deceased</p>
          <img
            src="https://res.cloudinary.com/dvtgekqon/image/upload/v1682305367/breathing_1deceased_bks9hd.png"
            alt="country wide deceased cases pic"
            className="stat-images"
          />
          <h1 className="stat-value">{completeData.deceased}</h1>
        </div>
      </div>
    )
  }

  renderTopDistricts = () => {
    const {activeDetails, stateData} = this.state

    const keys = Object.keys(stateData.districts)
    const arrayNow = keys.map(eachElement => {
      let values = stateData.districts[eachElement].total[activeDetails]

      if (values === undefined) {
        values = 0
      }

      return {
        total: values,
        district: eachElement,
      }
    })

    arrayNow.sort((a, b) => a.total - b.total)
    arrayNow.reverse()

    return (
      <div>
        <h1 className={`${activeDetails} top-districts-heading`}>
          Top Districts
        </h1>
        <ul className="ul-top-container">
          {arrayNow.map(eachElement => (
            <li className="list-values-container" key={eachElement.district}>
              <p className="top-values">{eachElement.total}</p>
              <p className="top-districts">{eachElement.district}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div
      className="primedeals-loader-container"
      data-testid="stateDetailsLoader"
    >
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderLoadingTimeLineView = () => (
    <div
      className="primedeals-loader-container"
      data-testid="timelinesDataLoader"
    >
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus, timeLineData, activeDetails, timeLineStatus} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <>
        <Header />
        <div className="home-container">
          {apiStatus === 'SUCCESS' && this.renderHeading()}
          {apiStatus === 'IN_PROGRESS' && this.renderLoadingView()}
          {apiStatus === 'SUCCESS' && this.renderCasesStats()}
          {apiStatus === 'SUCCESS' && this.renderTopDistricts()}
          {apiStatus === 'SUCCESS' && timeLineStatus === 'SUCCESS' && (
            <BarCharts
              timeLineData={timeLineData}
              id={id}
              activeDetails={activeDetails}
            />
          )}
          {timeLineStatus === 'SUCCESS' && (
            <LineCharts
              timeLineData={timeLineData}
              id={id}
              activeDetails="confirmed"
            />
          )}
          {timeLineStatus === 'SUCCESS' && (
            <LineCharts
              timeLineData={timeLineData}
              id={id}
              activeDetails="active"
            />
          )}
          {timeLineStatus === 'SUCCESS' && (
            <LineCharts
              timeLineData={timeLineData}
              id={id}
              activeDetails="recovered"
            />
          )}
          {timeLineStatus === 'SUCCESS' && (
            <LineCharts
              timeLineData={timeLineData}
              id={id}
              activeDetails="deceased"
            />
          )}
          {timeLineStatus === 'SUCCESS' && (
            <LineCharts
              timeLineData={timeLineData}
              id={id}
              activeDetails="tested"
            />
          )}
          {timeLineStatus === 'IN_PROGRESS' && this.renderLoadingTimeLineView()}
        </div>
        <Footer />
      </>
    )
  }
}

export default SpecificState
