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
            value="Search"
            class="form-btn"
            v-on:click.prevent="submit"
            >
        </form>

        <section class="results-section">

          <div v-if="data.name" class="result-wrapper">

            <div class="result-title">
              <h2>Weather for {{ data.name }}</h2>
            </div>

            <div class="result-summary-wrapper">

              <div class="result-summary">
                <p class="temperature">{{ displayTemp }}&deg;{{ tempSymbol }}</p>
                <button v-on:click="toggleCF">C / F</button>
              </div>
              <div class="result-icon">
                <img v-bind:alt="data.weather[0].description"
								 v-bind:src="'//openweathermap.org/img/w/' + data.weather[0].icon + '.png'">
                 <p class="description">{{ data.weather[0].main }}</p>
              </div>
            </div>
            <div class="result-details">
              <hr>
              <h3>Details</h3>

              <table>
                <tr>
                  <td>Pressure</td>
                  <td>{{data.main.pressure}} hPA</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{{data.main.humidity}} %</td>
                </tr>
                <tr>
                  <td>Wind speed</td>
                  <td>{{data.wind.speed}} m/s</td>
                </tr>
                <tr>
                  <td>Cloud cover</td>
                  <td>{{data.clouds.all}}%</td>
                </tr>
              </table>

            </div>

          </div>

        </section>
      </main>

    </div>


    <footer>
      <p class="footer-author">Coded by Alistair Willis using Vue.js</p>
    </footer>


  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      searchTerm: '',
      data: {
        name: '',
        main: {
          temp: ''
        },
        weather: [{main: ''}]
      },
      displayTemp: '',
      tempSymbol: 'C',
      helpText: ''
    }
  },
  computed: {
    celcius: function() {
      return Math.round(this.data.main.temp - 273.15);
    },
    fahrenheit: function() {
      return Math.round((this.data.main.temp - 273.15) * (9 / 5) + 32);
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
      this.data = {};
      this.$http.get(`weather/${this.searchTerm}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.data = data;
          this.setTemp();
          console.log(data);
        })
        .catch(e => {
          console.log(e);
          this.helpText = 'Sorry, your search returned no results.';
        });
    },
    setTemp() {
      this.displayTemp = (this.tempSymbol === 'C') ? this.celcius : this.fahrenheit;
    },
    toggleCF() {
      this.tempSymbol = (this.tempSymbol === 'C') ? 'F' : 'C';
      this.setTemp();
    }
  }
}
</script>


