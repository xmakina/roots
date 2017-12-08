<template>
<div class="container">
    <h2>Groups</h2>
    <h3>Add a group</h3>
    <fieldset>
      <label for="name">Group Name</label>
      <input id="name" v-model="newGroupName" />

      <input type="button" v-on:click="createGroup" value="Create Group" :disabled="processing"/>
    </fieldset>
    <div class="group">
      <ul>
        <li v-for="group in state.groups" v-bind:key="group.name">
          {{group.name}}
          <ul>
            <li v-for="member in group.members" v-bind:key="member.alias">
              {{member.alias}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
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
      newGroupName: "",
      processing: false
    };
  },
  methods: {
    createGroup: function() {
      this.processing = true
      this.blockbook.makeGroup({ name: this.newGroupName }).then(newGroup => {
        this.processing = false
        this.$emit("newGroup", newGroup);
      });
    }
  }
};
</script>
