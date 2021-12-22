import AuthManager from '../AuthManager'
class ApiClient {
    constructor() {
        this.baseUrl = 'http://localhost:3000'
    }

    headers(options = {}) {
        const contentType = options.isFormData
            ? {}
            : {
                'Content-type': 'application/json'
            }

        return {
            ...contentType,
            Authorization: AuthManager.getAuthToken(),
        }
    }
    get(path) {
        return fetch(this.baseUrl + path, {
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

}

export const apiClient = new ApiClient()