import { Component } from "react"
import { List, Avatar, Button, Spin } from 'antd'
import App from '../App'
import './index.css'
import { get } from '../../util/util'

class Lists extends Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }
    async componentDidMount() {
        const res = await this.getData();
        this.setState({
            loading: false,
            data: res.results,
        });
    }
    getData() {
        return get('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo')
            .then(res => {
                return res.json()
            });
    }
    async onLoadMore() {
        this.setState({
            loadingMore: true
        });
        const res = await this.getData();
        const data = this.state.data.concat(res.results);
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
                                    title={<a href="javasript:;">{item.name.last}</a>}
                                    description="2018.06.26"
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