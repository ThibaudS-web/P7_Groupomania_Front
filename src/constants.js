export default {
    getAuthToken: function () {
        let token = localStorage.getItem("token")
        return "Bearer " + JSON.parse(token)
    },

    isTokenAvailable: function () {
        return localStorage.getItem("token") !== null
    }
}