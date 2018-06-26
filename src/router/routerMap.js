import { Component } from "react"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from '../containers/Home'
import Me from '../containers/Me'
import Detail from '../containers/Detail'
import Lists from '../containers/Lists'
import NotFound from '../containers/NotFound'

//react router api
//https://reacttraining.com/react-router/web/guides/philosophy

class RouterMap extends Component {
    render() {
        return (
            <Router> 
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path='/me/' component={Me} />
                        <Route path='/lists' component={Lists} />
                        <Route path='/detail/:id' component={Detail} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default RouterMap;