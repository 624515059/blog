import { Component } from "react"
import './index.css'
import HeaderAdmin from "../../components/HeaderAdmin"
import { Input,Button } from 'antd'
import { util } from '../../util/util'

const { TextArea } = Input;

class Posts extends Component {
    postData(){
        util.ajax({
            type: "post",
            url: "/api/create",
            data: {
                title:  Math.random(),
                content:'<h3>content</h3>'
            },
            dataType: "json",
            success: (data) => {
                console.log(data)
            },
            error: () => {
                alert("ajax error")
            }
        });
    }
    render() {
        return (
            <div>
                <HeaderAdmin />
                <div className="adminBox">
                    <Input placeholder="标题" className="mb30" />
                    <TextArea rows={4} placeholder="文章内容" value="" className="mb30" />
                    <Button type="primary" onClick={this.postData.bind(this)}>确认提交</Button>
                </div>
            </div>
        )
    }
}

export default Posts;