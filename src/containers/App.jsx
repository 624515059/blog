import { Component } from "react";
class App extends Component {
    render() {
        return (
            <div>
                <p>header</p>
                {this.props.children}
                <p>footer</p>
            </div>
        )
    }
}

export default App;