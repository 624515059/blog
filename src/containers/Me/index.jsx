import { Component } from "react"
import App from '../App'
import { Timeline, Spin } from 'antd';
import './index.css'
class Me extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true
            })
        }, 500);
    }
    render() {
        const { show } = this.state;
        const timeLine = <Timeline className='list'>
            <Timeline.Item color="green">预研  --2018.06</Timeline.Item>
            <Timeline.Item color="green">技术选型  --2018.06</Timeline.Item>
            <Timeline.Item color="green">
                <p>webpack  -- 2018.06</p>
                <p>react</p>
                <p>es6/7</p>
                <p>antd</p>
                <p>fetch</p>
                <p>react-router</p>
                <p>express</p>
                <p>express-router</p>
                <p>mongodb</p>
                <p>mongoose</p>
                <p>nginx</p>
                <p>pm2</p>
            </Timeline.Item>
            <Timeline.Item color="green">环境搭建  --2018.06</Timeline.Item>
            <Timeline.Item>开发ing  --2018.06</Timeline.Item>
        </Timeline>
        return (
            <App>
                <div className="box minHeight">
                    {show ? timeLine : <Spin size="large" className="spin" />}
                </div>
            </App>
        )
    }
}

export default Me;