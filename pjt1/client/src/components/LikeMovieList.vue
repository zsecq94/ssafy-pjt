<template>
  <div id="reccomand">
    <h3>좋아요한 영화 목록</h3>
    <v-carousel
      align="center"
      justify="center"
    >
      <v-carousel-item
        v-for="movie in movies"
        :key="movie.id"
      >
        <v-img
          :src="movie.img_url"
          width="314px"
          margin="auto"
          @click="asd(movie)"
          >
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <v-dialog 
      v-model="detail_dialog_show"
      width="1500px">
      <MovieDetailModal :movie="movie" :reviews="reviews" :username="username" @reviewUpdateEvent="ratingCheck" @closeDialogEvent="closeDetailDialog"/>
    </v-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import MovieDetailModal from '@/components/MovieDetailModal.vue'


export default {
  data() {
    return {
      movie: [],
      reviews: [],
      reviewss: [],
      rating: 0,
      detail_dialog_show: false,
    }
  },
  components: {
    MovieDetailModal,
  },
  props: {
    movies: {
      type: Array,
      required: false,
    }
  },
  methods: {
    asd(v) {
      this.movie = v
      this.detail_dialog_show = true
      this.ratingCheck()
    },
    closeDetailDialog() {
      this.detail_dialog_show = false
    },
    closeReviewDialog() {
      this.review_dialog_show = false
    },
    ratingCheck() {
      // 현재 영화의 리뷰 목록에서 현재 로그인한 사람의 id를 찾아본다.
      this.reviews = []
      const token = sessionStorage.getItem('jwt')
      const user_id = jwtDecode(token).user_id
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      axios.get(`http://localhost:8000/api/v1/review/movie/${this.movie.id}/`, options)
        .then(res => {
          console.log(res)
          this.reviewss = res.data
          this.reviewss.forEach(review => {
            axios.get(`http://localhost:8000/api/v1/user/${review.user}/`, options)
            .then(res => {
              console.log(1234)
              const data = {
                content: review.content,
                id: review.id,
                movie: review.movie,
                score: review.score,
                user: review.user,
                username: res.data.username
              }
              this.reviews.push(data)
            })
          })
      })
    }
  },
}
</script>

<style>
</style>