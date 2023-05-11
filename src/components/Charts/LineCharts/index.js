import {LineChart, XAxis, YAxis, Tooltip, Line} from 'recharts'
import './index.css'

const LineCharts = props => {
  const {timeLineData, id, activeDetails} = props
  const keys = Object.keys(timeLineData[id].dates)
  const dataNow = keys.map(eachElement => {
    const value =
      timeLineData[id].dates[eachElement].total[activeDetails] === undefined
        ? 0
        : timeLineData[id].dates[eachElement].total[activeDetails]

    const objectNow = {
      date: eachElement,
      count: value,
    }
    return objectNow
  })

  let bgColor
  let chartDetails

  switch (activeDetails) {
    case 'confirmed':
      bgColor = ' #FF073A'
      chartDetails = 'Confirmed'

      break
    case 'active':
      bgColor = ' #007BFF'
      chartDetails = 'Active'

      break
    case 'recovered':
      chartDetails = 'Recovered'
      bgColor = ' #27A243'
      break
    case 'tested':
      chartDetails = 'Tested'
      bgColor = '#9673B9'
      break
    default:
      chartDetails = 'Deceased'
      bgColor = ' #6C757D'
  }
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className={`line-chart-container ${activeDetails}-container`}>
      <h1 className={`label-element ${activeDetails}`}>{chartDetails}</h1>
      <div
        className="line-chart-in-container"
        data-testid="lineChartsContainer"
      >
        <LineChart
          width={1000}
          height={250}
          data={dataNow}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="date" stroke={bgColor} />
          <YAxis stroke={bgColor} tickFormatter={DataFormatter} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke={bgColor}
            dot={{strokeWidth: 2, r: 1, fill: {bgColor}}}
          />
        </LineChart>
      </div>
    </div>
  )
}

export default LineCharts
