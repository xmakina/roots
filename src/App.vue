<template>
    <div id="app" class="container-fluid">
        <div class="row">
            <div class="col-md-6 col-md-offset-2">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";

export default {
  mounted: function() {
    if (this.blockstack.isUserSignedIn()) {
      this.$router.push('/dashboard')
    } else if (this.blockstack.isSignInPending()) {
      this.blockstack.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin;
      });
    } else {
      this.$router.push('/')
    }
  }
};
</script>

<style>

</style>
