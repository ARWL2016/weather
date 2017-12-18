<template>
  <div id="app" class="app">


    <div class="content">
      <header>
        <h1>Open Weather</h1>
      </header>
      <main role="content">
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
            value="SEARCH"
            class="form-btn"
            v-on:click.prevent="submit"
            >
        </form>
        <section class="result">
          <div v-if="weatherData.name" class="result-wrapper">
						<img v-bind:alt="weatherData.weather[0].description" 
								 v-bind:src="'//openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png'">

            <ul>
              <li class="placename">Weather for {{ weatherData.name }}</li>
              <li class="temperature">{{ weatherData.main.temp }} </li>
              <li class="description">{{ weatherData.weather[0].main }}</li>
            </ul>
						
						
          </div>

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
      searchTerm: '',
      weatherData: {
        name: '',
        main: {
          temperature: ''
        },
        weather: [{main: ''}]
      },
      helpText: ''
    }
  },
  methods: {
    submit: function() {
      this.helpText = '';

      if (this.searchTerm) {
        this.fetchData();
      } else {
        this.helpText = 'Please enter a search term';
      }

    },
    fetchData() {
      this.weatherData = {};
      this.$http.get(`weather/${this.searchTerm}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.weatherData = data;
          console.log(data);
        })
        .catch(e => {
          console.log(e);
          this.helpText = 'Sorry, your search returned no results.';
        });
    }
  }
}
</script>


