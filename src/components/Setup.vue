<template>
  <div>
    <p>Setup</p>
    <form v-on:submit.prevent="onSubmit">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="userDetails.name">
      <label for="name">Email</label>
      <input type="text" id="email" v-model="userDetails.email">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="userDetails.password">
      <input type="submit" :disabled="processing"/>
    </form>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  props: {
    state: {
      type: Object
    }
  },
  data: function() {
    return {
      userDetails: {
        name: "xmakina.id",
        email: "roots@xmakina.co.uk",
        password: "mypassword"
      },
      processing: false
    };
  },
  methods: {
    addProfile: function(profile) {
      var person = new this.blockstack.Person(profile);
    },
    onSubmit: function() {
      this.processing = true;
      let userDetails = this.userDetails
      this.blockbook
        .register(userDetails.name, userDetails.email, userDetails.password)
        .then(keyPair => {
          this.processing = false;
          this.$emit("register", keyPair);
          return this.blockbook.login({
            name: userDetails.name,
            email: userDetails.email,
            keyPair
          });
        }).then(login => {
          this.$emit("login", userDetails);
        });
    }
  },
  mounted: function() {
    if (this.state.userDetails === undefined) {
      let userData = this.blockstack.loadUserData();
      this.addProfile(userData);
    }
  }
};
</script>
