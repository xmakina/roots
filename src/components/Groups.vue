<template>
<div class="container">
    <h2>Groups</h2>
    <h3>Add a group</h3>
    <fieldset>
      <label for="name">Group Name</label>
      <input id="name" v-model="newGroupName" />
      <input type="button" v-on:click="createGroup" value="Create Group"/>
    </fieldset>
</div>
</template>
<script>
export default {
  props: {
    state: {
      type: Object
    }
  },
  data: () => {
    return {
      newGroupName: ""
    };
  },
  methods: {
    createGroup: function() {
      this.blockbook.makeGroup({name: this.newGroupName}).then(newGroup => {
        this.$emit('newGroup', newGroup)
      })
    }
  }
};
</script>
