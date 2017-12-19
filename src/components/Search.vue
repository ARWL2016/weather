<template>
  <form>
    <div class="label-wrapper">
      <label for="locationSearch">Location</label>
      <span>required</span>
    </div>
    <input
      type="text"
      id="locationSearch"
      placeholder="type a location to search"
      class="form-input"
      v-model="searchTerm"
      v-on:focus="helpText = ''"
      required>
    <div v-show="helpText" class="help">{{helpText}}</div>
    <input
      type="submit"
      value="Search"
      class="form-btn"
      v-on:click.prevent="submit">
  </form>
</template>

<script>
  export default {
    data () {
      return {
        searchTerm: '',
        helpText: ''
      }
    },
    methods: {
      submit() {
        this.helpText = '';

        if (this.searchTerm) {
          this.$emit('searchSubmitted', this.searchTerm);
          // this.fetchData();
          // this.showSpinner = true;
        } else {
          this.helpText = 'Please enter a search term';
        }

      },
    }
  }
</script>
