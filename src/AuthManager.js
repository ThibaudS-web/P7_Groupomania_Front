export default {

    getUserId: function () {
        const userId = localStorage.getItem('userId')
        return userId
    },
    getAuthToken: function () {
        const token = localStorage.getItem("token")
        return "Bearer " + JSON.parse(token)
    },
    isTokenAvailable: function () {
        return localStorage.getItem("token") !== null
    }
}
