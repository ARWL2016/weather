<template>
  <div id="app" class="app">
    <div class="content">
      <header role="header">
        <h1>OPEN WEATHER</h1>
      </header>
      <main role="main">
        <search v-on:searchSubmitted="fetchData" :null-result="nullResult"></search>

        <section clas="results-section">
            <div v-if="showSpinner" class="spinner">
              <div class="rect1"></div>
              <div class="rect2"></div>
              <div class="rect3"></div>
              <div class="rect4"></div>
              <div class="rect5"></div>
            </div>
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
                  <td>{{data.clouds.all}} %</td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
    <footer>
      <p>Coded by Alistair Willis using Vue.js</p>
      <p>View the source on <a href="https://github.com/ARWL2016/weather" target="_blank" rel="noopener noreferrer">Github</a>.</p>
    </footer>
  </div>
</template>

<script>
  import Search from './components/Search.vue';

  export default {

    name: 'app',
    components: {
      search: Search
    },
    data () {
      return {
        data: {
          name: '',
          main: {
            temp: ''
          },
          weather: [{main: ''}]
        },
        displayTemp: '',
        tempSymbol: 'C',
        nullResult: '',
        showSpinner: false
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
      fetchData(term) {
        this.showSpinner = true;
        this.nullResult = '';
        this.data = {};
        this.$http.get(`weather/${term}`)
          .then(response => {
            this.showSpinner = false;
            return response.json();
          })
          .then(data => {
            this.data = data;
            this.setTemp();
          })
          .catch(e => {
            this.showSpinner = false;
            console.log(e);
            this.nullResult = 'Sorry, your search returned no results.';
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


