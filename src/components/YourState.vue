<template>
  <div>
    <h3>Your State</h3>
    <textarea v-model="stateString"></textarea>
    <br />
    <input type="button" v-on:click="loadState" value="Load State" />
    <input type="button" v-on:click="saveState" value="Save State" />
  </div>
</template>
<script>
export default {
  name: "your-state",
  props: {
    state: {
      type: Object
    }
  },
  methods: {
    loadState: function(){
      this.$emit("loadState", JSON.parse(localStorage.getItem('state')))
    },
    saveState: function(){
      localStorage.setItem('state', JSON.stringify(this.state))
    }
  },
  computed: {
    stateString: function() {
      console.log("this.state", this.state);
      return JSON.stringify(this.state);
    }
  }
};
</script>
