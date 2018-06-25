import { Component } from "react"
import App from '../App'
import './index.css'
class NotFound extends Component {
    render() {
        return (
            <App>
                <div className="box minHeight">
                    文章详情页
                    {this.props.match.params.id}
                </div>
            </App>
        )
    }
}

export default NotFound;