import request from '@/utils/request'
import Auth from '@/utils/auth'
const group_name = 'base'
const api_name = 'label'

export default {
    toplist() {
        return request({
            url: `/${group_name}/${api_name}/toplist`,
            method: 'get'
        })
    },
    list() {
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'get'
        })
    }
}