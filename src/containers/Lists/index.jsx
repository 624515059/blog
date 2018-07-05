import { Component } from "react"
import { Link } from "react-router-dom";
import { List, Avatar, Button, Spin } from 'antd'
import App from '../App'
import './index.css'
import { get } from '../../util/util'

var page = 0;

class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            data: [],
        }
    }
    async componentDidMount() {
        page = 0;
        const res = await this.getData();
        this.setState({
            loading: false,
            data: res.data,
        });
    }
    getData() {
        return get(`/api/getList?page=${page}`)
            .then(res => {
                return res.json()
            });
    }
    async onLoadMore() {
        page++;
        this.setState({
            loadingMore: true
        });
        const res = await this.getData();
        const data = this.state.data.concat(res.data);
        this.setState({
            data,
            loadingMore: false,
        }, () => {
            window.dispatchEvent(new Event('resize'));
        });
    }
    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore.bind(this)}>加载更多</Button>}
            </div>
        ) : null;
        return (
            <App>
                <div className="box minHeight">
                    <List
                        className="demo-loadmore-list"
                        loading={loading}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon="user" />}
                                    title={<Link to={`/detail/${item._id}`}>{item.title}</Link>}
                                    description={item.time}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </App>
        )
    }
}

export default Lists;