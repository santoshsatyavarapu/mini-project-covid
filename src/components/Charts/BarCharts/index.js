import {XAxis, BarChart, Bar} from 'recharts'
import './index.css'

const BarCharts = props => {
  const {timeLineData, id, activeDetails} = props
  const monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  let bgColor

  switch (activeDetails) {
    case 'confirmed':
      bgColor = '#9A0E31'

      break
    case 'active':
      bgColor = ' #0A4FA0'

      break
    case 'recovered':
      bgColor = ' #216837'

      break
    default:
      bgColor = '#474C57'
  }

  const keys = Object.keys(timeLineData[id].dates)
  keys.reverse()
  const lastTenDays = keys.slice(0, 10)
  const data = lastTenDays.map(eachElement => {
    const date = new Date(eachElement)
    const month = date.getMonth()
    const monthShort = monthArray[month]
    const day = date.getDate()
    let value = timeLineData[id].dates[eachElement].total[activeDetails]
    if (value === undefined) {
      value = 0
    }
    const objectNow = {
      date: `${day} ${monthShort}`,
      count: value,
    }

    return objectNow
  })

  return (
    <div className="bar-chart-container">
      <div className="bar-chard-in-container">
        <BarChart width={950} height={330} data={data}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tick={{
              stroke: `${bgColor}`,
              strokeWidth: 0,
              fontSize: 10,
              fontFamily: 'Roboto',
              fill: `${bgColor}`,
            }}
            tickLine={false}
          />

          <Bar
            dataKey="count"
            fill={`${bgColor}`}
            className="bar"
            radius={[10, 10, 0, 0]}
            label={{position: 'top', fill: `${bgColor}`, fontSize: 13}}
            barSize={60}
          />
        </BarChart>
      </div>
    </div>
  )
}

export default BarCharts
