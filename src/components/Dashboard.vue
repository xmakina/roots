<template>
  <div id="Dashboard">
    <p>Welcome to roots. This is still in a pre-alpha state and should only be considered a tech demo.</p>
    <p>Hello {{name}}</p>
    <div id="setup"><setup v-if="needUserDetails" :state="state" @register="registerUser" @login="login"></setup></div>
    <div v-if="!needUserDetails">
      <div id="groups"><groups :state="state" @newGroup="newGroup"></groups></div>
      <div v-if="state.groups">
      <div id="friends"><friends :state="state" @addToGroup="addToGroup"></friends></div>
      </div>
    </div>
    <div id="yourstate"><your-state :state="state" @loadState="loadState"></your-state></div>
    <!-- <div id="otherstates"><other-states></other-states></div>
    <div id="content"><content></content></div> -->
  </div>
</template>

<script>
import Vue from "vue";
import YourState from "./YourState.vue";
import Groups from "./Groups.vue";
import Friends from "./Friends.vue";
import Setup from "./Setup.vue";

Vue.component("your-state", YourState);
Vue.component("groups", Groups);
Vue.component("friends", Friends);
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
    loadState: function(state) {
      this.state = state;
      return this.blockbook.login({
        name: state.userDetails.name,
        email: state.userDetails.email,
        keyPair: state.keyPair
      });
    },
    registerUser: function(keyPair) {
      let newState = {};
      newState.keyPair = {
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey
      };
      this.state = newState;
    },
    login: function(userDetails) {
      let newState = JSON.parse(JSON.stringify(this.state));
      newState.userDetails = userDetails;
      this.state = newState;
    },
    newGroup: function(newGroup) {
      let newState = JSON.parse(JSON.stringify(this.state));
      if (newState.groups === undefined) {
        newState.groups = [];
      }

      newState.groups.push(newGroup);
      this.state = newState;
    },
    addToGroup: function(groupAddition) {
      let newState = JSON.parse(JSON.stringify(this.state));
      let group = this.findGroup(newState, groupAddition.groupName);
      if (!group.members) {
        group.members = [];
      }

      group.members.push(groupAddition.groupMembership);
      this.state = newState;
    },
    findGroup: function(state, groupName) {
      for (var i = 0; i < state.groups.length; i++) {
        if (state.groups[i].name === groupName) {
          return state.groups[i];
        }
      }

      throw new Error("Group not found: " + groupName);
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
