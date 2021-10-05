<template>
            <div class="mt-3 d-grid px-3"> 
                <button class="btn btn-primary btn-block btn-signup"> 
                    <span>{{content}}</span> 
                </button> 
            </div>
</template>

<script>
    export default {
        props: ['content'],
    }
</script>