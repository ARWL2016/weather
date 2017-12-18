<template>
  <div id="app" class="app">


    <div class="content">
      <header>
        <h1>Weather App</h1>
      </header>
      <main role="content">
        <form>
          <div class="form-label-wrapper">
            <label for="locationSearch" class="form-label">Location</label>
            <span class="form-required">required</span>
          </div>
          <input
            type="text"
            id="locationSearch"
            placeholder="type a location to search"
            class="form-input"
            v-model="searchTerm"
            required>
          <input
            type="submit"
            value="Search"
            class="form-btn">
        </form>
        <section class="result">
          {{searchTerm}}
        </section>
      </main>

    </div>


    <footer>
      <p class="footer-author">Coded by Alistair Willis</p>
    </footer>


  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchTerm: ''
    }
  }
}
</script>


