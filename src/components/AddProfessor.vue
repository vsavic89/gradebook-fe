<template>
    <div class="container">
        <h2>Add professor</h2>       
        <div class="text-center border border-light p-5 m-5">
            <label for="first_name">First name: </label>
            <input class="m-4 form-control mb-2" type="text" name="first_name" v-model="newProfessor.first_name"/>
            <label for="last_name">Last name: </label>
            <input class="m-4 form-control mb-2" type="text" name="first_name" v-model="newProfessor.last_name"/>
            <div class="md-form input-group mb-3" v-for="(image, index) in imageList" :key="index">  
                <div class="input-group-append pl-3">
                    <p class="m-2 ml-4 pl-3 mb-0">Image: {{index+1}}</p> 
                    <input class="form-control mr-3 mt-3" type="text" :name="'image-'+(index)" v-model="newProfessor.imageURLs[index]"/> 
                    <button class="h-30 btn btn-secondary" @click="removeImage(index)" >Remove Image</button>      
                </div>      
            </div>  
            <br>
            <errors-handler 
                :errors="showErrors"
            /> 
            <button class="btn btn-success m-2" @click="addImage">Add Image</button>
            <button class="btn btn-primary m-2" @click="addProfessor">Submit</button>
            <button class="btn btn-secondary m-2" @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/professors.service';
import ErrorsHandler from './ErrorsHandler';
import { mapGetters } from "vuex";
export default {
    components: {
      ErrorsHandler
    },
    data(){
        return {
            newProfessor: {
                first_name: '',
                last_name: '',            
                imageURLs: [],
                user_id: undefined
            },   
            errors: []                            
        }
    },
    methods: {
        addProfessor(){            
            this.errors = [];
            if (this.newProfessor.imageURLs.length > 0){
                for(let i=0; i <= this.newProfessor.imageURLs.length-1; i++){
                    let s = this.newProfessor.imageURLs[i].substr(this.newProfessor.imageURLs[i].length-4);
                    let ss = this.newProfessor.imageURLs[i].substr(this.newProfessor.imageURLs[i].length-5);
                    if (!(((s.includes('.jpg')) || s.includes('.png')) || (ss.includes('.jpeg'))))                
                    this.errors.push({message: 'Image '+ (i+1) + ': ' + this.newProfessor.imageURLs[i] + ' is not valid image url.'});                
                }    
                if(this.newProfessor.first_name === '')
                    this.errors.push({message: 'First name can not be empty'})        
                if(this.newProfessor.last_name === '')
                    this.errors.push({message: 'Last name can not be empty'})            
                if (this.errors.length === 0){    
                    this.newProfessor.user_id = this.user.id;             
                    professorsService.addProfessor(this.newProfessor)
                            .then(response => {                                                        
                                this.$router.push('/professors');
                            }).catch(e => {
                                this.errors.push(e);
                            })
                }
            }else{
                return this.errors.push({message: 'Please add image.'});
            }
        },
        addImage(){            
            this.newProfessor.imageURLs.push('');            
        },
        removeImage(index){            
            this.newProfessor.imageURLs.splice(index,1);
        },
        cancel(){
            return this.$router.push('/professors');
        }
        
    },
    computed: {
        imageList(){            
            return this.newProfessor.imageURLs;        
        },
        showErrors(){
            return this.errors;
        },
        ...mapGetters({
            user: "getUser"
        })
    },
    created(){
        this.addImage();
    }
}
</script>

<style>

</style>
