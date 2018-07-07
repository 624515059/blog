import { Component } from "react"
import { Form, Icon, Input, Button } from 'antd';
import './index.css'
import { post } from '../../util/util'

const FormItem = Form.Item;


class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, v) => {
            if (!err) {
                console.log('Received values of form: ', v)
                const user = v.user;
                const pwd = v.pwd;
                post('/api/login', {
                    user, pwd
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(res => {
                        if(res.code == 0){
                            this.props.history.push('/admin')
                        }else{
                            alert(res.msg)
                        } 
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="components-form-demo-normal-login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('user', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('pwd', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
Login = Form.create()(Login);

export default Login;