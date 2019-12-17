import React from 'react'
import { Modal, Button, Form, Input, Icon, Switch, message } from 'antd'
import { connect } from 'react-redux'
import * as act from './../../../redux/actions/actionsLinks'

class Edit extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
        this.props.form.setFieldsValue({
            title: this.props.data.title,
            link: this.props.data.url_in,
            redirect: this.props.redirect
        })
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.redirect !== this.props.redirect){
            this.props.form.setFieldsValue({
                redirect: nextProps.redirect
            })
        }
    }
    handleOk = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            const token = localStorage.getItem('token')
            if (!err) {
                this.props.edit({
                    id: this.props.idlink,
                    userid: this.props.id,
                    title: values.title,
                    url: values.link,
                    redirect: values.redirect,
                    token
                })
            }
        })
        setTimeout(()=> this.handleWait(), 500)
        setTimeout(()=> this.setState({ visible: false }), 1000)
    }
    handleWait = async()=>{
        const token = await localStorage.getItem('token')
        this.props.getData(this.props.id, token)
    }
    handleCancel = e => {
        this.setState({
            visible: false
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <>
                <span>
                    <Button onClick={() => this.setState({ visible: true })}>
                        Edit
                </Button>
                </span>
                <Modal
                    title='Edit'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label='Title'>
                            {getFieldDecorator('title', {
                                rules: [
                                    { required: true, message: 'Please input your title!' }
                                ],
                            })(
                                <Input placeholder='nectly' />
                            )}
                        </Form.Item>
                        <Form.Item label='Url'>
                            {getFieldDecorator('link', {
                                rules: [
                                    { required: true, message: 'Please input your url!' }
                                ],
                            })(
                                <Input placeholder='https://url' />
                            )}
                        </Form.Item>
                        <Form.Item label='Redirect' labelAlign='left' >
                            {getFieldDecorator('redirect', { valuePropName: 'checked' })(<Switch />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

const EditForm = Form.create({ name: 'edit' })(Edit)

const stateToProps = state => {
    return {
        id: state.users.users.userid
    }
}
const dispatchToProps = dispatch => {
    return {
        edit: (params)=> dispatch(act.handleEditQuery(params)),
        getData: (id, token) => dispatch(act.handleGetQuery(id, token))
    }
}
export default connect(stateToProps, dispatchToProps)(EditForm)