<template>
  <div id="Dashboard">
    <p>Welcome to roots. This is still in a pre-alpha state and should only be considered a tech demo.</p>
    <p>Hello {{name}}</p>
    <div id="setup"><setup v-if="needUserDetails" :state="state" @register="registerUser"></setup></div>
    <div v-if="!needUserDetails">
      <div id="groups"><groups :state="state" @newGroup="newGroup"></groups></div>
      <div id="yourstate"><your-state :state="state"></your-state></div>
    </div>
    <!-- <div id="otherstates"><other-states></other-states></div>
    <div id="content"><content></content></div> -->
  </div>
</template>

<script>
import Vue from "vue";
import YourState from "./YourState.vue";
import Groups from "./Groups.vue";
import Setup from "./Setup.vue";

Vue.component("your-state", YourState);
Vue.component("groups", Groups);
Vue.component("setup", Setup);

export default {
  name: "dashboard",
  data: function() {
    return {
      state: {},
      name: ""
    };
  },
  methods: {
    registerUser: function(userDetails) {
      return this.blockbook
        .register(userDetails.name, userDetails.email, userDetails.password)
        .then(keyPair => {
          let newState = {};
          newState.keyPair = {
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
          };
          newState.userDetails = {
            name: userDetails.name,
            email: userDetails.email
          };
          this.state = newState;
          this.blockbook.login({
            name: userDetails.name,
            email: userDetails.email,
            keyPair
          });
        });
    },
    newGroup: function(newGroup) {
      let newState = JSON.parse(JSON.stringify(this.state))
      if(newState.groups === undefined){
        newState.groups = []
      }

      newState.groups.push(newGroup)
      this.state = newState
    }
  },
  computed: {
    needUserDetails: function() {
      return this.state === undefined || this.state.userDetails === undefined;
    },
    needsPublicKey: function() {
      return this.state === undefined || this.state.publicKey === undefined;
    }
  },
  mounted: function() {
    this.state = {};
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
