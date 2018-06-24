import { Component } from "react"

class Me extends Component {

    componentWillMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div >
                个人中心
                C页面,参数:{this.props.match.params.id}
            </div>
        )
    }
}

export default Me;