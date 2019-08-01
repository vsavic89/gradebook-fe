<template>
    <div>        
        <h2>Add professor</h2>
        <div>
            <label for="first_name">First name: </label>
            <input type="text" name="first_name" v-model="newProfessor.first_name"/>
            <label for="last_name">Last name: </label>
            <input type="text" name="first_name" v-model="newProfessor.last_name"/>
            <div v-for="(image, index) in imageList" :key="index">
                Image {{index}}: 
                <input type="text" :name="'image-'+(index)" v-model="newProfessor.imageURLs[index]"/>    
                <button @click="removeImage(index)" >Remove Image</button>            
            </div>
            <br>            
            <div v-for="error in showErrors" :key="error">
               Error: {{error}}<br>      
            </div> 
            <br>
            <br>
            <button @click="addImage">Add Image</button>
            <button @click="addProfessor">Submit</button>
            <button @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/professors.service';
import { mapGetters } from "vuex";
export default {
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
                    this.errors.push('Image '+ i + ': ' + this.newProfessor.imageURLs[i] + ' is not valid image url.');                
                }            
                if (this.errors.length <= 0){    
                    this.newProfessor.user_id = this.user.id;             
                    professorsService.addProfessor(this.newProfessor)
                            .then(response => {                                                        
                                this.$router.push('/professors');
                            }).catch(e => {
                                this.errors.push(e);
                            })
                }
            }else{
                return this.errors.push('Please add image.');
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
    }
}
</script>

<style>

</style>
