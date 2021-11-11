<template>
	<h1>welcome to {{ profilData.profil.username }} profil</h1>
	
</template>

<script>
const token = localStorage.getItem("token");
const headerAuth = "bearer " + JSON.parse(token);
export default {
	name: "Profil",
    data() {
        return  {
            profilData: {
                profil: {
                    username: ''
                }
            }
        }
    },
	beforeMount: function() {
		fetch("http://localhost:3000/api/auth/profils/17  ", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
                'Authorization': headerAuth
			}
		})
			.then(res => {
				if (res.status == 200) {
					return res.json();
				} else {
					throw "Profil Not Found";
				}
			})
			.then(data => {
                console.log(data)
                this.profilData =  data
            })
            .catch(err => console.log(err))
	}
};
</script>
