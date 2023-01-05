<template>
  <div class="wrapper">
    <h1>Posts list</h1>
    <form @submit.prevent="searchByTitle">
      <input type="text" v-model="searchTitle" placeholder="Search by title" />
      <button type="submit">Search</button>
    </form>
    <PostItem v-for="post in postsWithComments" :key="post.id" :post="post" />

    <div class="pagination">
      <router-link
        :to="{ name: 'home', query: { page: 1 } }"
        :class="{ disabled: page === 1 }"
        >First page</router-link
      >
      <router-link
        :class="{ disabled: page === 1 }"
        :to="{ name: 'home', query: { page: page - 1 } }"
        >Prev Page</router-link
      >
      <router-link
        :to="{ name: 'home', query: { page: page + 1 } }"
        :class="{ disabled: !isNextPage }"
        >Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import FetchPostsService from "@/services/FetchPostsService.js";
import FetchComments from "@/services/FetchComments.js";
import { watchEffect } from "vue";

export default {
  data() {
    return {
      posts: null,
      isNextPage: true,
      comments: null,
      postsWithComments: null,
      searchTitle: "",
    };
  },
  methods: {
    commentsCount() {
      if (this.posts && this.comments) {
        this.postsWithComments = this.posts.map((post) => {
          const commentsList = this.comments.filter(
            (comment) => comment.postId === post.id
          );
          post.comments = commentsList;
          return post;
        });
      }
    },
    searchByTitle() {
      this.postsWithComments = this.posts.filter((post) =>
        post.title.includes(this.searchTitle)
      );
    },
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
          this.isNextPage = response.data.length / 10 === 1;

          FetchComments.getComments()
            .then((response) => {
              this.comments = response.data;
              this.commentsCount();
            })
            .catch((err) => console.log(err));
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
  width: 65%;
  margin: auto;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #42b983;
    border-radius: 5px;
    text-decoration: none;
    padding: 1rem;
    color: #42b983;
    font-weight: 700;
    &.disabled {
      cursor: not-allowed;
      color: #ada5a5;
      border: 1px solid #ada5a5;
    }
  }
}

form {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  input {
    height: 16px;
    padding: 1rem;
    border: 1px solid #ada5a5;
    border-radius: 5px;
    font-size: 1rem;
    width: 50%;
  }
  button {
    height: 27px;
    padding: 1.5rem;
    background-color: #42b983;
    color: #fff;
    font-size: 1.5rem;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #21583f;
    }
  }
}
</style>
