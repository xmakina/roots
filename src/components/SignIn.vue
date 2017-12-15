<template>
  <div id="signin">
    <img src="images/logo-256x256.png" />
    <h1>{{ msg }}</h1>
    <h2>
      <a href="#" class="btn btn-primary btn-lg" v-on:click="redirectToSignin" id="signin-button">Sign In with Blockstack</a>
    </h2>
  </div>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      msg: "Welcome to roots"
    };
  },
  methods: {
    redirectToSignin: function(){
      this.blockstack.redirectToSignIn(undefined, undefined, ['email'])
    }
  }
};
</script>

<style scoped>
#signin {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
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
