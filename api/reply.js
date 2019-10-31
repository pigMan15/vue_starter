import request from '@/utils/request'
const group_name = 'reply'
const api_name = 'problem'

export default {
    findById(id) {
        return request({
            url: `/api/${group_name}/${api_name}/${id}`,
            method: 'get'
        })
    }
}