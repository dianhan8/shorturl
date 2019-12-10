import { notification } from 'antd'

export const NotifError = (props) => {
    notification.error({
        message: props
    })
}

export const NotifSuccess = (props) => {
    notification.success({
        message: props.message,
        description: props.desc,
        placement: "bottomLeft"
    })
}
