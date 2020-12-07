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
            <button @click="postSubmit()" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
import PostService from "../../services/PostService";

export default {
    name: "post-add",
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

    methods: {
        postSubmit() {
            let data = {
                title: this.post.title,
                description: this.post.description
            };
            this.$confirm("Are you sure?").then(() => {
                PostService.create(data)
                    .then((result) => {
                        this.post.id = result.data.id;
                        this.$alert("Success Saved");
                        this.$router.push({ name: "posts"})
                        console.log(result)
                    }).catch((err) => {
                        this.$alert("Failed");
                        console.log(err);
                    })
            });
        },
        // test(){
        //     this.$alert("Hello Vue Simple Alert.");
        // }
    },
    // mounted(){
    //     this.test();
    // }
    
}
</script>