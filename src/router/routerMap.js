import { Component } from "react"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from '../containers/Home'
import Me from '../containers/Me'
import Detail from '../containers/Detail'
import List from '../containers/List'
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
                        <Route path='/list' component={List} />
                        <Route path='/detail/:id' component={Detail} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default RouterMap;