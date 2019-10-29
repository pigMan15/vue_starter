import axios from 'axios'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://139.155.36.35:7300/mock/5db59d7c9ac1ad2548aa3106', // api的base_url
    timeout: 30000 // 请求超时时间
})
export default service