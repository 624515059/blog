import { Component } from "react"
import App from '../App'
import './index.css'
import { get } from '../../util/util'
import 'github-markdown-css'

class NotFound extends Component {
    state = {
        title:'',
        time:'',
        author:'LL',
        content:''
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        get(`/api/getDetail?id=${id}`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res)
                if (res.code == 0 && res.data.length==1) {
                    this.setState({
                        title:res.data[0].title,
                        time: res.data[0].time,
                        content: res.data[0].mdContent
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
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
                    <h3 className="styh3">{title}</h3>
                    <div className="topBox">
                        <span className="time">时间：{time}</span>
                        <span className="author">作者：{author}</span>
                    </div>
                    <div className="contentBox markdown-body" id="content" dangerouslySetInnerHTML={this.getContent()} />
                </div>
            </App>
        )
    }
}

export default NotFound;