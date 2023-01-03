<template>
  <div class="wrapper">
    <h1>Posts list</h1>
    <h2>filter by post title</h2>
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
    <div class="pagination">
      <router-link
        v-if="page != 1"
        :to="{ name: 'home', query: { page: page - 1 } }"
        >Prev Page</router-link
      >
      <router-link :to="{ name: 'home', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import FetchPostsService from "@/services/FetchPostsService.js";
import { watchEffect } from "vue";

export default {
  data() {
    return {
      posts: null,
      pagesCount: null,
    };
  },
  name: "HomeView",
  components: {
    PostItem,
  },
  props: ["page"],
  created() {
    watchEffect(() => {
      FetchPostsService.getPosts(10, this.page)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((err) => console.log(err));
    });
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 1px solid grey;
    text-decoration: none;
  }
}
</style>
