<template>
  <v-col class="home">

    <div class="main_image">
      <img :src="`https://image.tmdb.org/t/p/original${this.newMovies[0].backdrop_path}`" alt="poster" style="height:100%; width:100%;">
      <div class="main_poster">
        <img :src="`https://image.tmdb.org/t/p/original${this.newMovies[0].poster_path}`" alt="" style="height:400px; width:300px;">

        <div class="card" style="width: 20rem;">
          <div class="card-body">
            <h2 class="card-title">{{ this.newMovies[0].title }}</h2>
            <h4 class="card-subtitle mb-2 text-muted">⭐ : {{ this.newMovies[0].vote_average }}</h4>
            <h3 class="card-text">{{ this.newMovies[0].overview }}</h3>
          </div>
        </div>
      </div>

    </div>

    <br>
    
    <br>
    <HomeRecommendAndRecent/>
    <hr>
    <br>
    <MovieList :movies="movies"/>
  </v-col>
</template>

<script>
// @ is an alias to /src
import MovieList from '@/components/MovieList.vue'
import HomeRecommendAndRecent from '@/components/HomeRecommendAndRecent.vue'
// import router from '@/router'
import axios from 'axios'


export default {
  name: 'home',

  data () {
    return {
      bottom: false,
      movies: [],
      page_num: 1,
      newMovies: [],
    }
  },
  filters:{
      resize(value){
        if(value.length >= 40){
          value = value.slice(0,17) + '...'
          return value
        }else{
          return value
        }
      }
    },

  components: {
    MovieList,
    HomeRecommendAndRecent,
  },

  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight<visible
    },

    addMovies() {
      const token = sessionStorage.getItem('jwt')
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }

      axios.get(`http://localhost:8000/api/v1/movie/list/?page=${this.page_num}`, options)
      .then(res => {
        let count = res.data.results.length
        for (let i = 0; i < res.data.results.length ; i++) {
        const j = Math.floor(Math.random() * count)
        const k = Math.floor(Math.random() * count)
        const temp = res.data.results[j]
        res.data.results[j] = res.data.results[k]
        res.data.results[k] = temp
        }
        this.movies = this.movies.concat(res.data.results)
        this.page_num++
      })
      .catch(error => {
        console.log(error.response)
      })
    }, 
    getNewMovies() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=b38eab9e566911474038dee3caf82c37&language=ko-KR&page=1`
      })
      .then(res => {
        // console.log(res.data.results)
        // let movies = resdata.results
        let count = res.data.results.length
        for (let i = 0; i < res.data.results.length ; i++) {
        const j = Math.floor(Math.random() * count)
        const k = Math.floor(Math.random() * count)
        const temp = res.data.results[j]
        res.data.results[j] = res.data.results[k]
        res.data.results[k] = temp
        }
        this.newMovies.push(res.data.results[0])
        console.log(this.newMovies)
        
        })
      },
          
    },

  watch: {
    bottom(bottom) {
      if(bottom) {
        this.addMovies()
      }
    }
  },

  created() {
    this.getNewMovies()
   window.addEventListener('scroll', () => {
     this.bottom = this.bottomVisible()
   })
   this.addMovies()
   this.page_num++
  }

}
</script>

<style>
.main_image {
  position: relative;
  margin-left: auto;
}
.main_poster {
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate( -50%, -50% );
  color: white;
}
.main_box {
  position: absolute;
  top: 49%;
  left: 38%;
  height: 400px;
  width: 300px;
  transform: translate( -50%, -50% );
}
.main_title {
  position: absolute;
  top: 80.5%;
  left: 7%;
  transform: translate( -50%, -50% );
  color: white;
}
.main_overview {
  position: absolute;
  top: 83%;
  left: 70%;
  transform: translate( -225%, 00% );
  color: white;
}
.main_vote {
  position: absolute;
  top: 80.5%;
  left: 14%;
  transform: translate( -50%, -50% );
  color: white;
}
</style>