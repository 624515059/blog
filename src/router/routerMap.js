import { Component } from "react"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from '../containers/Home'
import Me from '../containers/Me'
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
                        <Route path='/me/:id' component={Me} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default RouterMap;