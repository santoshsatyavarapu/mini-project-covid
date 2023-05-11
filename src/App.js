import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import SpecificState from './components/SpecificState'
import NotFound from './components/NotFound/index'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:id" component={SpecificState} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
