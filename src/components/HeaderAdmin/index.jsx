import { Component } from "react"
import { Link } from "react-router-dom";
import './index.css'

class HeaderAdmin extends Component {
    render() {
        return (
            <div className="headerWrapAdmin">
                <div className="headerBoxAdmin">
                    <ul className="clearfix">
                        <li>
                            <Link to="/admin">文章列表</Link>
                        </li>
                        <li>
                            <Link to="/posts">添加文章</Link>
                        </li>
                        <li>
                            <Link to="/out">退出登录</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default HeaderAdmin;