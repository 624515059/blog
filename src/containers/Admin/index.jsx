import { Component } from "react"
import { Table, Divider } from 'antd';
import './index.css'
import HeaderAdmin from "../../components/HeaderAdmin";
const columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">修改{record.title}</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
        </span>
    ),
}];

const data = [{
    key: '1',
    title: '标题1',
    time: 2018,
}, {
    key: '2',
    title: '标题2',
    time: 2018,
}, {
    key: '3',
    title: '标题3',
    time: 2018,
}];

class Admin extends Component {
    onChange(o){
        console.log(o);
    }
    render() {
        const o = { 
            defaultCurrent: 1,
            total:50
        }
        return (
            <div>
                <HeaderAdmin />
                <Table bordered="true" size="small"  columns={columns} dataSource={data} pagination={o} onChange={this.onChange.bind(this)}/>
            </div>
        )
    }
}

export default Admin;