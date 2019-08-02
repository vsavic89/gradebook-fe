<template>
    <div>
        <div v-if="errors.length > 0">
           <p v-for="(error, index) in errors" :key="index">
                Message: {{ error.message }}<br>                
                <span v-for="(err, i) in errors[index].errors" :key="i">
                    <span v-for="(e, j) in err" :key="j">
                        Error: {{ err[j] }}<br>
                    </span>
                </span>                
            </p>    
        </div>   
    </div>
</template>

<script>
export default {
    props: ['errors']
}
</script>

<style>

</style>
