<template>
  <div class="container">
    <v-hover style="margin-bottom:10px">
      <template v-slot:default="{ hover }">
        <v-card>
          <v-img style="overflow-y: hidden; weight:100%; height:450px;" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"></v-img>
          <v-fade-transition>
            <v-overlay
            v-if="hover"
            absolute
            color="#000000"
            >
            
            <br>
            <v-btn 
              :href = "`https://www.themoviedb.org/movie/${movie.id}-${movie.original_title}?language=ko`"
              target="_blank"
              class="st-font" style="margin-bottom:10px" >
              TMDB 정보
            </v-btn>

            <div>
            </div>
          </v-overlay>
        </v-fade-transition>
        <h4 style="text-align: center; margin:8px;">{{ movie.title | resize }}</h4>
      </v-card>  
      </template>
    </v-hover>

  </div>
</template>

<script>
export default {
  name: "MovieDetail",
  components: {

  },
  filters:{
      resize(value){
        if(value.length >= 18){
          value = value.slice(0,17) + '...'
          return value
        }else{
          return value
        }
      }
    },
  data: function () {
    return {
      show: false,
      variants: ["light", "dark"],
      headerBgVariant: "dark",
      headerTextVariant: "white",
      bodyBgVariant: "dark",
      bodyTextVariant: "white",
      footerBgVariant: "danger",
      footerTextVariant: "dark",
      reviews: [],
      me: [],
      liking: '',
      numLike: '',
      rating: Number(this.movie.vote_average),
      movieId : null,
      movieTitleEn : null,
    }
  },
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    movieDetail: function () {
      this.show = true
    },
    ratingToInt: function () {
      this.rating = Math.ceil(this.rating / 2)
    },
    close: function () {
      this.show = false
    },
    
}
}
</script>


<style>
#myImg {
  display: block;
  margin: 0px auto;
}
#heart {
  display: block;
  margin: 0px auto;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#heart:hover {
  color: crimson;
}
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