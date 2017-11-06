<template>
  <textarea v-model="stateString"></textarea>
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
