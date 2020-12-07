<template>
    <div>
        <form action="" @submit.prevent>
            <div class="form-group">
                <label for="">Title</label>
                <input type="text" id="title" class="form-control" v-model="post.title">
            </div>
            <div class="form-group">
                <label for="Description">
                    <textarea id="" cols="30" rows="4" class="form-control" v-model="post.description"></textarea>
                </label>
            </div>
            <div class="form-group">
                <label for="">Status: {{ post.published }}</label>
            </div>
            <button @click="postUpdate()" class="btn btn-success">Update</button>
            <button 
                class="btn btn-primary"
                    v-if="post.published"
                    @click="postPublish(false)"
                >Unublished
            </button>
            <button 
                class="btn btn-primary"
                v-else
                @click="postPublish(true)"
                >Published
            </button>
            <button @click="postDelete()" class="btn btn-danger">Delete</button>
        </form>
    </div>
</template>


<script>
 import PostService from "../../services/PostService";


export default {
    name: "post-update",
    data(){
        return {
            post:{
                id: null,
                title: "",
                description: "",
                published: false
            }
        }
    },
    mounted(){
        this.getPost(this.$route.params.id);
    },
    methods: {
        getPost(id){
            PostService.get(id)
                .then((result) => {
                    this.post = result.data;
                    console.log(result.data)
                }).catch((err) => {
                    console.log(err)
                })
        },
        postUpdate(){
            PostService.update(this.post.id, this.post)
                .then((result) => {
                    this.$alert(result.data.message);
                    console.log(result.data);
                }).catch((err) => {
                    console.log(err);
                })
        },
        postPublish(status){
            this.post.published = status;
            this.postUpdate();
        },
        postDelete(){
            PostService.delete(this.post.id)
                .then((result) => {
                    console.log(result.data)
                    this.$alert(result.data.message)
                    this.$router.push({ name: "posts" })
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
}
</script>