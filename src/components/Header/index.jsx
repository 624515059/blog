import { Component } from "react"
import { Link } from "react-router-dom";
import './index.css'

class Header extends Component {
    render() {
        return (
            <div className="headerWrap">
                <div className="headerBox">
                    <img src="//img.58cdn.com.cn/shangjiatong/orders/logo.png" /> <span>LLの博客</span>
                    <ul className="clearfix">
                        <li>
                            <Link to="/">首页</Link>
                        </li>
                        <li>
                            <Link to="/lists">文章</Link>
                        </li>
                        <li>
                            <Link to="/me">关于</Link>
                        </li>
                        <li>
                            <Link to="/login">登录</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header;