<template>
    <div>
        <ag-grid-vue style="width: 500px; height: 500px;"
                    class="ag-theme-alpine"
                    :columnDefs="columnDefs"
                    :rowData="rowData">
        </ag-grid-vue>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="title">
                    <div class="input-group-append">
                        <button @click="searchTitle()" class="btn btn-outline-secondary" >Search</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h4>Posts List</h4>
                <div 
                    class="card mb-3"
                    v-for="(post, index) in posts" :key="index" 
                >
                    <div class="card-body">
                        <h5 class="card-title">{{ post.title }}</h5>
                        <h5 class="card-subtitle nb-2 text-muted">{{ post.published ? 'Publish' : 'Unpublished' }}</h5>
                        <p class="card-text">{{ post.description }}</p>
                        <a :href="'/post/'+ post.id" class="card-link">Edit</a>
                    </div>
                </div>
                <button @click="deleteAll()" class="btn btn-sm btn-danger m-3">Remove All</button>
            </div>
        </div>
    </div>
</template>

<script>
import PostService from "../../services/PostService";
import {AgGridVue} from "ag-grid-vue";

export default {
    name: "post-list",

    data (){
        return {
            posts: [],
            title: '',
            columnDefs: null,
            rowData: null
        }
    },
    components: {
        AgGridVue
    },
    beforeMount() {
            this.columnDefs = [
                {headerName: 'Make', field: 'make'},
                {headerName: 'Model', field: 'model'},
                {headerName: 'Price', field: 'price'}
            ];

            this.rowData = [
                {make: 'Toyota', model: 'Celica', price: 35000},
                {make: 'Ford', model: 'Mondeo', price: 32000},
                {make: 'Porsche', model: 'Boxter', price: 72000}
            ];
        },

    methods: {
        retrievePosts() {
            PostService.getAll()
            .then((result) => {
                this.posts = result.data
                console.log(this.posts);
                
            }).catch((err) => {
                console.log(err);
            });
        },
        searchTitle() {
            PostService.findByTitle(this.title)
                 .then((result) => {
                    this.posts = result.data;
                }).catch((err) => {
                    console.log(err);
                });
        },
        deleteAll(){
            this.$confirm("Are you sure?").then(() => {
                PostService.deleteAll()
                .then((result) => {
                    this.$alert(result.data.message);
                    this.retrievePosts();
                }).catch((err) => {
                    console.log(err);
                });
            });
        }
        
    },

    mounted(){
        this.retrievePosts();
    }
}
</script>
