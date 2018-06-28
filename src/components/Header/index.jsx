import { Component } from "react"
import { Link } from "react-router-dom";
import './index.css'
import logo from './logo.png'

class Header extends Component {
    render() {
        return (
            <div className="headerWrap">
                <div className="headerBox">
                    <img src={logo} /> <span>LLの博客</span>
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