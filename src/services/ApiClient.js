import AuthManager from '../AuthManager'
class ApiClient {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        const userId = AuthManager.getUserId()
        //TODO : ADD route here
        this.routes = {
            signup: "/api/auth/signup",
            signin: "/api/auth/login",
            messages: '/api/messages',
            deleteMessage: `/api/messages`,
            currentUser: `/api/auth/profils/${userId}`,
            currentUserPicture: '/api/auth/profils/myProfil/picture',
            currentUserBio: '/api/auth/profils/myProfil/bio',
            user: `/api/auth/profils`,
            users: '/api/auth/profils',
            comment: '/api/comments',
        }
    }

    headers(formData = false) {
        const contentType = formData
            ? {}
            : {
                'Content-type': 'application/json'
            }
        return {
            ...contentType,
            Authorization: AuthManager.getAuthToken(),
        }
    }

    signup(body) {
        return fetch(this.baseUrl + this.routes.signup, {
            method: 'POST',
            body: body,
            headers: this.headers()
        })
    }

    signin(body) {
        return fetch(this.baseUrl + this.routes.signin, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: this.headers()
        })

    }

    getAllUsers() {
        return fetch(this.baseUrl + this.routes.users, {
            headers: this.headers()
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert('Une erreur est survenue !')
                }
            })
            .catch(() => alert("Impossible de récupérer les données de l'API"))
    }

    getOneUser(id) {
        return fetch(this.baseUrl + this.routes.user + `/${id}`, {
            headers: this.headers()
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert('Une erreur est survenue !')
                }
            })
            .catch(() => alert("Impossible de récupérer les données de l'API"))
    }
    getCurrentProfil() {
        return fetch(this.baseUrl + this.routes.currentUser, {
            headers: this.headers()
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert('Une erreur est survenue !')
                }
            })
            .catch(() => alert("Impossible de récupérer les données de l'API"))
    }

    deletePictureProfil() {
        return fetch(this.baseUrl + this.routes.currentUserPicture, {
            method: 'DELETE',
            headers: this.headers()
        })
    }

    modifyPictureProfil(body) {
        return fetch(this.baseUrl + this.routes.currentUserPicture, {
            method: 'PUT',
            body: body,
            headers: this.headers(body instanceof FormData)
        })
            .then(response => {
                if (response.status === 201) {
                    console.log(response)
                    return response.json()
                }

            })
    }

    modifyPictureBio(body) {
        return fetch(this.baseUrl + this.routes.currentUserBio, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: this.headers()
        })
    }

    deleteUser(id) {
        return fetch(this.baseUrl + this.routes.user + `/${id}`, {
            method: 'DELETE',
            headers: this.headers()
        })
    }

    getAllMessages() {
        return fetch(this.baseUrl + this.routes.messages, {
            headers: this.headers()
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert('Une erreur est survenue !')
                }
            })
            .catch(() => alert("Impossible de récupérer les données de l'API"))
    }

    addMessage(body) {
        return fetch(this.baseUrl + this.routes.messages, {
            method: 'POST',
            body: body instanceof FormData ? body : JSON.stringify(body),
            headers: this.headers(body instanceof FormData)
        }).then(response => {
            if (response.status === 201) {
                console.log('ok', body)
                return response.json()
            } else {
                alert('Une erreur est survenue !')
            }
        })
    }

    modifyMessage(id, body) {
        return fetch(this.baseUrl + this.routes.messages + `/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: this.headers()
        })
    }

    addComment(body) {
        return fetch(this.baseUrl + this.routes.comment, {
            method: 'POST',
            body: body instanceof FormData ? body : JSON.stringify(body),
            headers: this.headers(body instanceof FormData)
        }).then(response => {
            if (response.status === 201) {
                console.log('ok', body)
                return response.json()
            } else {
                alert('Une erreur est survenue !')
            }
        })
    }

    modifyComment(id, body) {
        return fetch(this.baseUrl + this.routes.comment + `/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: this.headers()
        })
    }

    deleteComment(id) {
        return fetch(this.baseUrl + this.routes.comment + `/${id}`, {
            method: 'DELETE',
            headers: this.headers()
        })
    }

    post(path, body) {
        return fetch(this.baseUrl + path, {
            method: 'POST',
            body: body instanceof FormData ? body : JSON.stringify(body),
            headers: this.headers(body instanceof FormData)
        }).then(response => {
            if (response.status === 201) {
                console.log('ok', body)
                return response.json()
            } else {
                alert('Une erreur est survenue !')
            }
        })
    }

    put(path, body) {
        return fetch(this.baseUrl + path, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: this.headers()
        })
    }

    delete(path) {
        return fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: this.headers()
        })
    }
    deleteMessage(id) {
        return fetch(this.baseUrl + this.routes.deleteMessage + `/${id}`, {
            method: 'DELETE',
            headers: this.headers()
        })
    }

    async handleResponse(response) {
        if (!response.status.toString().match(/20[01]/)) throw await response.json()
        return response.json()
    }
}

export const apiClient = new ApiClient()