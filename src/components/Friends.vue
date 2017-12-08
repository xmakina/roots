<template>
<div class="container">
    <h2>Friends</h2>
    <h3>Add a friend</h3>
    <fieldset>
      <div class="formgroup">
      <label for="name">Name</label>
      <input id="name" v-model="newFriendName" />
      <span class="notes">Future versions could lookup blockstack ID and pull public key from their zonefile</span>
      </div>
      <div class="formgroup">
      <label for="name">Public Key (Full public key block)</label>
      <br />
      <textarea id="name" v-model="newMemberPublicKey"></textarea>
      </div>
      <div class="formgroup">
      <label for="name">Group</label>
      <select id="name" v-model="group">
        <option v-for="stateGroup in state.groups" v-bind:key="stateGroup.name">
          {{stateGroup.name}}
        </option>
      </select>
      </div>
      <input type="button" v-on:click="addFriend" value="Add Friend" :disabled="processing"/>
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
      newFriendName: "",
      newMemberPublicKey: "",
      group: "",
      processing: false
    };
  },
  methods: {
    addFriend: function() {
      let group = null;
      for (var i = 0; i < this.state.groups.length; i++) {
        if (this.state.groups[i].name === this.group) {
          group = this.state.groups[i];
          break;
        }
      }

      if (group === null) {
        throw new Error("Group not found");
      }

      let newMemberPublicKey = this.newMemberPublicKey.split(/\r?\n|\r/g)
      this.processing = true;
      return this.blockbook
        .addToGroup({
          group,
          newMemberPublicKey
        })
        .then(groupMembership => {
          this.processing = false;
          groupMembership.alias = this.newFriendName
          this.$emit("addToGroup", {groupName: group.name, groupMembership});
        });
    }
  }
};
</script>
