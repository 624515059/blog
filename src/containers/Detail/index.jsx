import { Component } from "react"
import App from '../App'
import './index.css'
class NotFound extends Component {
    state = {
        title:'文章标题',
        time:'2018-06.28',
        author:'LL',
        content:'<p>文章详情内容</p>'
    }
    componentWillMount(){
        console.log(this.props.match.params.id);
    }
    getContent() {
        return {
            __html: this.state.content
        }
    }
    render() {
        const { title, time, author } = this.state;
        return (
            <App>
                <div className="box minHeight">
                    <h3>{title}</h3>
                    <div className="topBox">
                        <span className="time">时间：{time}</span>
                        <span className="author">作者：{author}</span>
                    </div>
                    <div className="contentBox" dangerouslySetInnerHTML={this.getContent()} />
                </div>
            </App>
        )
    }
}

export default NotFound;