<template>
  <div class="article">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <h3>Comments count: {{ post.comments.length }}</h3>
    <CommentsChart :mailLength="mailLength" />
  </div>
</template>

<script>
import CommentsChart from "@/components/CommentsChart.vue";

export default {
  name: "PostItem",
  props: {
    post: Object,
  },

  components: { CommentsChart },
  computed: {
    mailLength() {
      const mailLengthList = this.post.comments.map((comment) => {
        return comment.email.length;
      });
      return mailLengthList;
    },
  },
};
</script>

<style scoped>
.article {
  width: 80vw;
  margin: 2rem auto;
  border: 1px solid #42b9839e;
  border-radius: 5px;
  padding: 2rem;
}
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
