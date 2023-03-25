/**
 * 消息提示框
 * @param params - 参数
 * - title - 标题
 * - duration - 提示的延迟时间
 * @returns {void}
 */
export const msg = (params: {
    title: string;
    duration?: number;
}) => {
    uni.showToast({
        title: params.title,
        icon: 'none',
        image: '',
        mask: false,
        duration: params.duration || 2000
    })
}

/**
 * 显示loading
 * @param params - 参数
 * - title - 标题
 * - mask - 是否显示透明蒙层
 */
export const loading = (params: {
    title: string;
    mask?: boolean;
}) => {
    uni.showLoading({
        title: params.title,
        mask: params.mask || true
    })
}

/**
 * 模态弹窗
 * @param params - 参数
 * - title - 标题
 * - content - 内容
 * - showCancel - 是否显示取消按钮，默认为 `true`
 * - cancelText - 取消按钮的文字，默认为 `'取消'`
 * - cancelColor - 取消按钮的文字颜色，默认为 `'#000000'`
 * - confirmText - 确定按钮的文字，默认为 `'确定'`
 * - confirmColor - 确定按钮的文字颜色，默认为 `'#00BC79'`
 * - editable - 是否显示输入框，默认为 `false`
 * - placeholderText - 显示输入框时的提示文本，默认为 `''`
 * - success - 接口调用成功时的回调函数
 * - fail - 接口调用失败时的回调函数
 * - complete - 接口调用完成时的回调函数 (调用成功、失败都会执行)
 */
export const modal = (params: {
    title: string;
    content: string;
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
    editable?: boolean;
    placeholderText?: string;
    success?: ((result: UniApp.ShowModalRes) => void);
    fail?: ((result: UniApp.ShowModalRes) => void);
    complete?: ((result: UniApp.ShowModalRes) => void);
} = {
    title: '',
    content: '',
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#000000',
    confirmText: '确定',
    confirmColor: '#00BC79',
    editable: false,
    placeholderText: '请输入内容'
}) => {
    uni.showModal({
        title: params.title,
        content: params.content,
        showCancel: params.showCancel,
        cancelText: params.cancelText,
        cancelColor: params.cancelColor,
        confirmText: params.confirmText,
        confirmColor: params.confirmColor,
        editable: params.editable,
        placeholderText: params.placeholderText,
        success: params.success,
        fail: params.fail,
        complete: params.complete
    })
}