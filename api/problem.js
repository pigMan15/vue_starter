import request from '@/utils/request'
const group_name = 'tensquare_qa'
const api_name = 'problem'
export default {
    list(type, label, page, size) {
        return request({
            url: `/${group_name}/${api_name}/${type}/${label}/${page}/${size}`,
            method: 'get'
        })
    },
    findById(id) {
        return request({
            url: `/${group_name}/${api_name}/${id}`,
            method: 'get'
        })
    },
    save(pojo) {
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'post',
            data: pojo
        })
    }
}