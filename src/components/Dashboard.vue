<template>
  <div id="Dashboard">
    <p>Welcome to roots. This is still in a pre-alpha state and should only be considered a tech demo.</p>
    <p>Hello {{name}}</p>
    <div id="yourstate"><your-state :state="state"></your-state></div>
    <div id="groups"><groups :state="state"></groups></div>
    <!-- <div id="otherstates"><other-states></other-states></div>
    <div id="content"><content></content></div> -->
  </div>
</template>

<script>
import Vue from "vue";
import YourState from "./YourState.vue";
import Groups from "./Groups.vue";

Vue.component("your-state", YourState);
Vue.component("groups", Groups);

export default {
  name: "dashboard",
  data: function() {
    return {
      state: {},
      name: ''
    };
  },
  methods: {
    addProfile: function(profile) {
      var person = new this.blockstack.Person(profile);
      console.log('person', person)
      console.log('person.name', person.name())
      this.state.userDetails = { name: person.username || person.profile.name };
      this.name = this.state.userDetails.name
    }
  },
  mounted: function() {
    let userData = this.blockstack.loadUserData();
    this.addProfile(userData);
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
