<template>
  <div>
    
    <hr v-if="recommendedMovies.length">
    <br v-if="recommendedMovies.length">
    <h2 v-if="recommendedMovies.length" style="text-align:center;">추천 영화</h2>
    <vue-glide v-if="recommendedMovies.length"
      class="glide__track"
      data-glide-el="track"
      ref="slider"
      type="carousel"
      :breakpoints="{3000: {perView: 5}, 1100: {perView: 3}, 600: {perView: 3}}"
    >
      <vue-glide-slide
        v-for="(movie, idx) in recommendedMovies"
        :key="idx">
        <MovieDetail :movie="movie"/>
      </vue-glide-slide>
    </vue-glide>
    <hr>

    <br>

    <h2 style="text-align:center;">최신 영화</h2>
    <vue-glide v-if="newMovies.length"
      class="glide__track"
      data-glide-el="track"
      ref="slider"
      type="carousel"
      :breakpoints="{3000: {perView: 5}, 1100: {perView: 3}, 600: {perView: 3}}"
    >
      <vue-glide-slide
        v-for="(movie, idx) in newMovies"
        :key="idx">
        <MovieDetail :movie="movie"/>
        <!-- <p>{{ movie.title }}</p> -->
      </vue-glide-slide>
    </vue-glide>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Glide, GlideSlide } from 'vue-glide-js'
import MovieDetail from "@/components/MovieDetail"

export default {
  name: "MovieCard",
  data: function () {
    return {
      recommendedMovies: [],
      newMovies: [],
      show: false,
      variants: ["light", "dark"],
      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "dark",
      bodyTextVariant: "light",
      footerBgVariant: "dark",
      footerTextVariant: "dark",
    }
  },
  props: {
    // MovieDetail
  },
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    
    MovieDetail,
  },
  computed: {
    getmovies () {
      // console.log(this.$store.state.recommendedMovies)
      return this.$store.state.recommendedMovies
    },
  },
  methods: {
    movieDetail: function () {
      this.show = true
    },
    close: function () {
      this.show = false
    },
    getRecommendedMovies () {
      const token = sessionStorage.getItem('jwt')
        const user_id = jwtDecode(token).user_id
        const options = {
          headers: {
            Authorization: 'JWT ' + token
          }
        }
      axios.get(`http://localhost:8000/api/v1/sendlikemovie/${user_id}/`, user_id, options)
      .then(res => {
        // console.log(res.data)
        res.data.forEach(ele => {
          // console.log(ele.likemovie)
          axios({
            method: 'get',
            url: `https://api.themoviedb.org/3/movie/${ele.likemovie}/recommendations?api_key=b38eab9e566911474038dee3caf82c37&language=ko-KR&page=1`
          })
          .then(response => {
              // console.log(response.data.results)
              response.data.results.forEach(ele => {
                // console.log(ele)
                if (ele.vote_average > 7.5) {
                  this.recommendedMovies.push(ele)
                }
              })
          })
        })
      })
    },
    getNewMovies() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=b38eab9e566911474038dee3caf82c37&language=ko-KR&page=1`
      })
      .then(res => {
        // console.log(res)
        res.data.results.forEach(ele => {
          this.newMovies.push(ele)
        })
      })
          
    }
  },
  created () {

    // console.log(11)
    this.getRecommendedMovies()
    this.getNewMovies()
    // console.log(this.recommendedMovies)
    // console.log(this.recommendedMovies)
    // console.log(this.$store.state.recommendedMovies)
    
  }
}
</script>


<style>
.w3-myfont {
  font-family: 'Luminari', fantasy;
}
.w2-myfont {
  font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
}
#main {
padding: 4em 0 2em 0;
}
@media screen and (max-width: 736px) {
#main {
padding: 3em 0 1em 0;
}
}
#main .inner {
width: 90%;
max-width: 80em;
margin: 0 auto;
}
@media screen and (max-width: 480px) {
#main .inner {
width: 95%;
}
}
.thumbnails {
display: -moz-flex;
display: -webkit-flex;
display: -ms-flex;
display: flex;
-moz-align-items: stretch;
-webkit-align-items: stretch;
-ms-align-items: stretch;
align-items: stretch;
-moz-justify-content: center;
-webkit-justify-content: center;
-ms-justify-content: center;
justify-content: center;
-moz-flex-wrap: wrap;
-webkit-flex-wrap: wrap;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
}
.thumbnails .box {
margin: 0 1em 2em 1em;
width: 30%;
}
@media screen and (max-width: 1280px) {
.thumbnails .box {
width: 45%;
}
}
@media screen and (max-width: 736px) {
.thumbnails .box {
width: 100%;
}
}
</style>