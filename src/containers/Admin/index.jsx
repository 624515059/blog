import { Component } from "react"
import { Table, Divider } from 'antd';
import './index.css'
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";
import { get } from '../../util/util'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    delFn(id) {
        console.log(id)
        get(`/api/del?id=${id}`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res)
                alert("删除成功")
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
    }
    async componentDidMount() {
        const res = await this.getData();
        if (res.code == 0) {
            this.setState({
                data: res.data
            })
        }
    }
    getData() {
        return get('/api/getAll')
            .then(res => {
                return res.json()
            });
    }
    onChange(o) {
        console.log(o);
    }
    render() {
        const { data } = this.state;
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={`/detail/${record._id}`} target="_blank">{text}</a>
            ),
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/posts?id=${record._id}`}>修改</Link>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.delFn.bind(this, record._id)}>删除</a>
                </span>
            ),
        }]
        const paginationObj = {
            defaultCurrent: 1,
            //total:50
        }
        return (
            <div>
                <HeaderAdmin />
                <Table bordered="true" size="small" columns={columns} dataSource={data} rowKey="_id" pagination={paginationObj} onChange={this.onChange.bind(this)} />
            </div>
        )
    }
}

export default Admin;