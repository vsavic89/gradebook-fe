<template>
  <div>
    <h2>Add Student</h2>
    <div v-for="(student, index) in allNewStudents" :key="index" class="form-group"> 
      <h4>Student: {{ index+1 }}  </h4>           
      <label for="first_name">First name: </label>
      <input type="text" :id="index" name="first_name" @keyup="firstNameChange" :value="student.first_name" required/><br>
      <label for="last_name">Last name: </label>
      <input type="text" :id="index" name="last_name" @keyup="lastNameChange" :value="student.last_name" required/><br>
      <label for="imageURL">Image: </label>
      <input type="text" :id="index" name="imageURL" @keyup="imageURLChange" :value="student.imageURL" required/><br>        
      <div v-if="isEditPage">      
        <button class="btn btn-secondary" @click="editStudent(index)">Edit Student</button>      
      </div>
      <div v-if="(!isEditPage && !student.id) || (isEditPage)">
          <button class="btn btn-danger" @click="removeStudent(index)">Remove Student</button>      
      </div>
    </div>
    <button class="btn btn-success" @click="addNewFields">Add New Student</button>
    <button class="btn btn-light" @click="cancel">Cancel</button>    
    <br><br>
    <div v-if="allNewStudents.length > 0">
      <button class="btn btn-primary" @click="addStudents">Submit New Students</button>    
    </div>          
    <errors-handler 
      :errors="showErrors"
    />
  </div>
</template>

<script>
import { studentsService } from "../services/students.service";
import ErrorsHandler from './ErrorsHandler';
export default {
  components: {
      ErrorsHandler
  },
  data() {    
    return {
        students: [],        
        newStudent: {
          id: undefined,
          first_name: '',
          last_name: '',
          imageURL: '',
          gradebook_id: undefined
        },
        errors: [],  
        prevRoute: null,
        gradebookID: null,
        numberOfStudents: null,
        isEditPage: null
    };
  },
  methods: {
    addStudents(){            
        this.errors = [];
        for(var i=0; i < this.students.length; i++){
          if (this.students[i].imageURL !== ''){
              let s = this.students[i].imageURL.substr(this.students[i].imageURL.length-4);
              let ss = this.students[i].imageURL.substr(this.students[i].imageURL.length-5);
              if (!(((s.includes('.jpg')) || s.includes('.png')) || (ss.includes('.jpeg'))))                
                this.errors.push({message: 'Image : ' + this.students[i].imageURL + ' is not valid image url.'});    
          }else{
            return this.errors.push({message: 'Please add image for student number: ' + (i+1)});
          }
          if(this.students[i].first_name === '')
            this.errors.push({message: 'First name for student ' + (i+1) + ' must be filled!'});
          if(this.students[i].last_name === '')
            this.errors.push({message: 'Last name for student ' + (i+1) + ' must be filled!'});  
           if(this.students[i].imageURL === '')
            this.errors.push({message: 'Image URL for student ' + (i+1) + ' must be filled!'});          
        }
        if (this.errors.length === 0){            
          let newStudents = this.students.filter(student => student.id === undefined)                                
          if(newStudents.length > 0){                             
            studentsService.addStudents(newStudents)
              .then(response => {                                                     
                  this.$router.push(this.prevRoute.path);
              }).catch(e => {
                  this.errors.push(e);
              })            
          }else{
            this.errors.push({message: 'No new students to add.'});
          }
        }
    },
    cancel(){
      this.$router.push(this.prevRoute.path);
    },
    getDefaults(){
      this.newStudent = {
        id: undefined,
        first_name : '',
        last_name : '',
        imageURL : '',
        gradebook_id: this.gradebookID
      }
    },
    addNewFields(){
      this.errors = [];
      if(this.numberOfStudents < 35 ){
        this.getDefaults();
        this.students.push(this.newStudent);                 
        this.numberOfStudents++;
      }else{
        this.errors.push({message: 'Max number of students reached. Can not add fields'})
      }
    },
    removeStudent(index){ 
      this.errors = [];
      let studentID = this.students[index].id;     
      if(studentID){
        studentsService.deleteStudent(studentID)
          .then(response => {
            this.$router.push(this.prevRoute.path);
          }).catch(e => {
            this.errors.push(e);
          });
      }else{
        this.students.splice(index,1);
      }
    },
   editStudent(index){
     this.errors = [];
     let studentID = this.students[index].id;     
      if(studentID){
        studentsService.editStudent(this.students[index])
          .then(response => {
            this.$router.push(this.prevRoute.path);
          }).catch(e => {
            this.errors.push(e);
        });
      }
   },
   firstNameChange(event){
     if(event.target){
        this.students[event.target.id].first_name = event.target.value;        
     }     
   },
   lastNameChange(event){
     if(event.target){
      this.students[event.target.id].last_name = event.target.value;
     }
   },
   imageURLChange(event){
     if(event.target){
      this.students[event.target.id].imageURL = event.target.value;
     }
   }   
  },
  computed: {
    allNewStudents(){
      return this.students;
    },
    showErrors(){
      return this.errors;
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.errors = [];
      vm.prevRoute = from;      
      vm.isEditPage = to.name.includes('edit');    
      vm.gradebookID = to.params.id;      
      vm.students.gradebook_id = vm.gradebookID;
      studentsService.getStudents(vm.gradebookID)
        .then(response => {
          vm.students = response.data;        
          vm.numberOfStudents = vm.students.length;         
          vm.addNewFields();                    
        }).catch(e => {
          vm.errors.push(e);
        })
      })
  },
};
</script>

<style>
</style>
