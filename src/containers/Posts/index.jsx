import { Component } from "react"
import './index.css'
import HeaderAdmin from "../../components/HeaderAdmin"
import { Input, Button } from 'antd'
import { get, post, GetQueryString } from '../../util/util'
const { TextArea } = Input;

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: ''
        };
    }
    componentDidMount() {
        const id = GetQueryString("id");
        if (id) {
            get(`/api/getOne?id=${id}`)
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        const { title, content } = res.data;
                        this.setState({ id, title, content })
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
    createData() {
        const { title, content } = this.state;
        if(!title || !content){
            alert('请填写必填项')
        }
        post('/api/create', {
            title, content
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                res.code == 0 ? alert(res.msg) : alert(res.msg)
            })
            .catch(error => {
                console.log(error)
            })
    }
    upDate(){
        const { id, title, content } = this.state;
        post('/api/update', {
            id,title,content
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                res.code == 0 ? alert(res.msg) : alert(res.msg)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange(e){
        const newState = {};
        newState[e.target.name] = e.target.name == "checked" ? e.target.checked : e.target.value;
        this.setState(newState);
    }
    render() {
        const { id, title, content } = this.state;
        return (
            <div>
                <HeaderAdmin />
                <div className="adminBox">
                    <Input placeholder="标题" className="mb30" value={title} name="title" onChange={this.handleChange.bind(this)}  />
                    <TextArea rows={4} placeholder="文章内容" value={content}  name="content" onChange={this.handleChange.bind(this)} className="mb30 heightStyle" />
                    {
                        id ? <Button type="primary" onClick={this.upDate.bind(this)}>确认修改</Button>
                            : <Button type="primary" onClick={this.createData.bind(this)}>确认添加</Button>
                    }
                </div>
            </div>
        )
    }
}

export default Posts;