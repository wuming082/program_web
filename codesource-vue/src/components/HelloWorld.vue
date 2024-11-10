<template>
  <div id="sample">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default{
    name:'HelloWorld',
    data(){
      return{
        message: 'dreamsky',
      };
    },
    props:{
      msg:String,
    }

  }
</script>
