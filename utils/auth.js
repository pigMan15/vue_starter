import Cookies from 'js-cookie'
const TokenKey = 'User-Token'
const NameKey = 'User-Name'
const AvatarKey = 'User-Avatar'

export default {
    setCookie(token, name, avatar) {
        Cookies.set(TokenKey, token)
        Cookies.set(NameKey, name)
        Cookies.set(AvatarKey, avatar)
    },
    getUser() {
        return {
            token: Cookies.get(TokenKey),
            name: Cookies.get(NameKey),
            avatar: Cookies.get(AvatarKey)
        }
    }
}