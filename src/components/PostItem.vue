<template>
  <div class="hello">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <p>Comments count:</p>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
