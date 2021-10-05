<template>
    <div class="body-background">
        <div class="container-fluid d-flex justify-content-center align-items-center h-100">
            <div class="card p-3 text-center py-4">
                <h4>Create account</h4>
                <div>
                    <span>Already have an account?</span> 
                    <a href="#" class="text-decoration-none">Sign In</a> 
                </div>

                <div class="mt-3 px-3"> 
                    <input v-model="username" class="form-control" placeholder="Username"> 
                </div>

                <div class="input-group px-3 mt-3"> 
                    <input v-model="password" type="text" class="form-control" placeholder="Password" aria-label="Password"> 
                </div>

                <div class="mt-3 px-3"> 
                    <input v-model="email" class="form-control" placeholder="E-mail"> 
                </div>
            <Button @click='processForm' content="Sign up" />

            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue'
    export default {
        data() {
            return {
                username: '',
                password: '',
                email: ''
            }
        },
        components: {
            Button
        }, 
        methods: {
            //Testing form ... 
            processForm: function () {
                console.log({username: this.username, email: this.email, password: this.password})
            }
        }
    }
</script>