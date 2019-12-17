import React from 'react'
import { Modal, Button, Form, Input, Icon, Switch, message } from 'antd'
import * as act from './../../../redux/actions/actionsLinks'
import { connect } from 'react-redux'

class CreateLinks extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    handleOk = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            const token = localStorage.getItem('token')
            if (!err) {
                if (values.title !== undefined && values.link !== undefined) {
                    this.props.addData({
                        id: this.props.id,
                        title: values.title,
                        url: values.link,
                        redirect: values.redirect == undefined ? false : values.redirect,
                        token
                    })
                    setTimeout(() => this.getQueryLinks(), 2000)
                }else{
                    message.warn('Kolom masih ada yang kosong!.')
                }
            }
        if (values.title !== undefined && values.link !== undefined) {
            this.setState({
                visible: false
            })
        }
        })
    }
    getQueryLinks = async () => {
        const token = await localStorage.getItem('token')
        await this.props.getData(this.props.id, token)
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
                <Button type='primary' onClick={() => this.setState({ visible: true })}
                    icon='plus'
                    style={{ marginBottom: 10 }}
                >
                    Create Link
                </Button>
                <Modal
                    title='Create'
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

const LinkPages = Form.create({ name: 'create' })(CreateLinks)

const stateToProps = state => {
    return {
        id: state.users.users.userid,
        premium: state.users.users.premium,
        code: state.links.status
    }
}

const dispatchToProps = dispatch => {
    return {
        addData: (params) => dispatch(act.handleAddQuery(params)),
        getData: (id, token) => dispatch(act.handleGetQuery(id, token))
    }
}

export default connect(stateToProps, dispatchToProps)(LinkPages)