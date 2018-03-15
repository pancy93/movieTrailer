<template>
  <div id="app">
    <mu-appbar title="MovieTrailer">
    </mu-appbar>
    <div class="body">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{
  overflow: hidden;
}
body{
  background: #ccc;
  overflow: hidden;
}

.body{
  position: absolute;
  left:5%;
  right:5%;
  top:100px;
  bottom: 20px;
  background-color: white;
  border-radius: 5px;
  width: 90%;
  overflow: hidden;
  padding:10px;
}

</style>

