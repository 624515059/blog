import { Component } from "react"
import App from '../App'
import './index.css'

class Home extends Component {
    render() {
        return (
            <App>
                <div className="homeBanner">
                    <div className="homeBannerBg"></div>
                    <div className="homeBannerMain">
                        <p>welcome to my blog</p>
                    </div>
                </div>
            </App>
        )
    }
}

export default Home;