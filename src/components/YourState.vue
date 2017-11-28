<template>
  <div>
    <h3>Your State</h3>
    <textarea v-model="stateString"></textarea>
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
  computed: {
    stateString: function() {
      console.log("this.state", this.state);
      return JSON.stringify(this.state);
    }
  }
};
</script>
