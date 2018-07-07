import { Component } from "react"
import App from '../App'
import { Alert } from 'antd'
import './index.css'
import { get } from '../../util/util'

class NotFound extends Component {
    componentDidMount(){
        get(`/api/out`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res)
                if (res.code == 0) {
                    console.log(res)
                }
            });
    }
    render() {
        return (
            <App>
                <div className="box minHeight">
                    <Alert
                        message="提示"
                        description="退出成功"
                        type="success"
                        className="alertCss"
                    />
                </div>
            </App>
        )
    }
}

export default NotFound;