import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import convertObToList from '../Methods'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const searchStatusConstants = {
  initial: 'INITIAL',
  searching: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    resultsList: [],
    completeData: {},
    searchInput: '',
    filteredList: [],
    apiStatus: apiStatusConstants.initial,
    searchStatus: searchStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      if (response.ok === true) {
        const data = fetchedData

        const arrayObjects = convertObToList(data)
        const filterData = arrayObjects.filter(
          eachElement => eachElement.stateCode !== 'TT',
        )
        const totalData = arrayObjects.filter(
          eachElement => eachElement.stateCode === 'TT',
        )

        this.setState({
          resultsList: [...filterData],
          completeData: totalData[0],
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    }
  }

  getSearchResults = event => {
    const {resultsList} = this.state
    this.setState({searchStatus: searchStatusConstants.inProgress})
    const stateName = event.target.value.toLowerCase()
    if (stateName === '') {
      this.setState({searchStatus: searchStatusConstants.initial})
    } else {
      this.setState({searchStatus: searchStatusConstants.searching})
    }

    const filteredArray = resultsList.filter(eachElement =>
      eachElement.name.toLowerCase().includes(stateName),
    )
    this.setState({
      searchInput: event.target.value,
      filteredList: [...filteredArray],
    })
  }

  renderFilteredStates = () => {
    const {filteredList} = this.state

    return (
      <ul
        className="filtered-container"
        data-testid="searchResultsUnorderedList"
      >
        {filteredList.map(eachElement => (
          <Link
            to={`/state/${eachElement.stateCode}`}
            className="filter-link-container"
          >
            <li className="filtered-list-container" key={eachElement.name}>
              <h1 className="filtered-state-name">{eachElement.name}</h1>
              <div className="inbox-row-container">
                <h1 className="filtered-state-code-name">
                  {eachElement.stateCode}
                </h1>
                <BiChevronRightSquare className="right-square-icon" />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <BsSearch className="search-icon" />
        <input
          type="search"
          placeholder="Enter the State"
          className="search-element"
          onChange={this.getSearchResults}
          value={searchInput}
        />
      </div>
    )
  }

  renderTotalCases = () => {
    const {completeData} = this.state

    return (
      <div className="total-cases-container">
        <div
          className="total-container confirmed"
          data-testid="countryWideConfirmedCases"
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
          className="total-container active"
          data-testid="countryWideActiveCases"
        >
          <p className="stat-heading">Active</p>
          <img
            src="https://res.cloudinary.com/dvtgekqon/image/upload/v1682305367/protection_1active_jkugvg.png"
            alt="country wide active cases pic"
            className="stat-images"
          />
          <h1 className="stat-value">{completeData.active}</h1>
        </div>
        <div
          className="total-container recovered"
          data-testid="countryWideRecoveredCases"
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
          className="total-container deceased"
          data-testid="countryWideDeceasedCases"
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

  getAscendingOrder = () => {
    const {resultsList} = this.state
    resultsList.sort((a, b) => (a.stateCode > b.stateCode ? 1 : -1))
    this.setState({resultsList: [...resultsList]})
  }

  getDescendingOrder = () => {
    const {resultsList} = this.state
    resultsList.sort((a, b) => (a.stateCode > b.stateCode ? 1 : -1))
    resultsList.reverse()

    this.setState({resultsList: [...resultsList]})
  }

  renderStateWiseCases = () => {
    const {resultsList} = this.state

    return (
      <div className="table-container">
        <table data-testid="stateWiseCovidDataTable">
          <tr className="table-headings-container">
            <th className="table-heading-state">
              States/UT
              <button
                type="button"
                className="sorting-button"
                onClick={this.getAscendingOrder}
                data-testid="ascendingSort"
              >
                <FcGenericSortingAsc className="sorting-icon" />
              </button>
              <button
                type="button"
                className="sorting-button"
                onClick={this.getDescendingOrder}
                data-testid="descendingSort"
              >
                <FcGenericSortingDesc className="sorting-icon" />
              </button>
            </th>
            <th className="table-heading">Confirmed</th>
            <th className="table-heading">Active</th>
            <th className="table-heading">Recovered</th>
            <th className="table-heading">Deceased</th>
            <th className="table-heading">Population</th>
          </tr>
          {resultsList.map(eachElement => (
            <tr className="table-rows-container" key={eachElement.stateCode}>
              <td className="table-row-element-state">{eachElement.name}</td>
              <td className="table-row-element confirmed">
                {eachElement.confirmed}
              </td>
              <td className="table-row-element active">{eachElement.active}</td>
              <td className="table-row-element recovered">
                {eachElement.recovered}
              </td>
              <td className="table-row-element deceased">
                {eachElement.deceased}
              </td>
              <td className="table-row-element population">
                {eachElement.population}
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="primedeals-loader-container" data-testid="homeRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus, searchStatus} = this.state
    return (
      <>
        <Header activeTab="home" />
        <div className="home-container">
          {apiStatus === 'SUCCESS' && (
            <>
              {this.renderSearchContainer()}
              {searchStatus === 'INITIAL' && this.renderTotalCases()}
              {searchStatus === 'INITIAL' && this.renderStateWiseCases()}
              {searchStatus === 'IN_PROGRESS' && this.renderFilteredStates()}
            </>
          )}
          {apiStatus === 'IN_PROGRESS' && this.renderLoadingView()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
