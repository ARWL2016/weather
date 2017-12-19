<template>
  <form novalidate>
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
      autocomplete="off"
      required>
    <div v-if="helpText" class="help">{{helpText}}</div>
    <div v-else-if="nullResult" class="help">{{nullResult}}</div>
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
    props: ['nullResult'],
    methods: {
      submit() {
        this.helpText = '';
        if (this.searchTerm) {
          this.$emit('searchSubmitted', this.searchTerm);
        } else {
          this.helpText = 'Please enter a search term';
        }
      },
    }
  }
</script>
