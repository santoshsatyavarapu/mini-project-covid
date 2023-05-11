import statesList from '../Resources'

function convertObjectsDataIntoListItemsUsingForInMethod(data) {
  const resultList = []

  // getting keys of an object object

  const keyNames = Object.keys(data)

  keyNames.forEach(keyName => {
    // console.log(keyName)

    if (data[keyName]) {
      const {total} = data[keyName]

      // if the state's covid data is available we will store it or we will store 0

      const confirmed = total.confirmed ? total.confirmed : 0
      const deceased = total.deceased ? total.deceased : 0
      const recovered = total.recovered ? total.recovered : 0
      const tested = total.tested ? total.tested : 0
      const population = data[keyName].meta.population
        ? data[keyName].meta.population
        : 0

      resultList.push({
        stateCode: keyName,
        name: statesList.find(state => state.state_code === keyName).state_name,

        confirmed,
        deceased,
        recovered,
        tested,
        population,
        active: confirmed - (deceased + recovered),
      })
    }
  })
  return resultList
}

export default convertObjectsDataIntoListItemsUsingForInMethod
