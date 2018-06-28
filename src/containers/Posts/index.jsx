import { Component } from "react"
import './index.css'
import HeaderAdmin from "../../components/HeaderAdmin"
import { Input,Button } from 'antd'
const { TextArea } = Input;

class Posts extends Component {
    render() {
        return (
            <div>
                <HeaderAdmin />
                <div className="adminBox">
                    <Input placeholder="标题" className="mb30" />
                    <TextArea rows={4} placeholder="文章内容" value="" className="mb30" />
                    <Button type="primary">确认提交</Button>
                </div>
            </div>
        )
    }
}

export default Posts;