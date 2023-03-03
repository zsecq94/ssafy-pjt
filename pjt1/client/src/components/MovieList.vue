<template>

  <div class="movie-list">

    <v-form style="margin:0px;">
      <v-container >
        <v-row>
          <v-col
            cols="8"
            sm="8"
          >
          </v-col>

          <v-col
            cols="3"
            sm="3"
            v-if="(this.viewSearchBar == true)"
            >
            <v-text-field
            v-model="search"
            label="검색어를 입력해 주세요."
            clearable
            style="margin:0px;"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            sm="3"
            v-else-if="(this.viewSearchBar == false)"
            >
          
          </v-col>

          <v-col cols="1" stlye="position:absolute;">
            <v-btn 
            icon 
            style="margin:auto; position: relative; left:-10%; "
            
            @click="changeSearchBar"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn 
            v-if="showfollow"
            icon 
            style="margin:auto; position: relative; left:-10%; "
            
            @click="getfollowmovie"
            >
              <v-icon style="color:yellow">mdi-bookmark</v-icon>
            </v-btn>
            <v-btn
            v-if="!showfollow" 
            icon 
            style="margin:auto; position: relative; left:-10%; "
            
            @click="getfollowmovie"
            >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </v-col>
          <!-- <v-col cols="1" stlye="position:absolute;"> -->
          <!-- </v-col> -->

          
        </v-row>
      </v-container>
    </v-form>

      <!-- 검색어를 입력 안했고 북마크 버튼도 안눌렀을때 전체 영화 리스트 출력 -->
      <v-container fluid v-if="!this.search && !this.showfollow">
        <!-- <v-lazy> -->
        <v-row dense>
          <!-- <v-lazy> -->
            <v-col
              v-for="(movie, idx) in movies"
              :key="idx"
              :cols="col_flex"
              md="3"
            >
              <v-lazy
                transition="fade-transition"
              >
                <MovieCard :movie="movie"/>
              </v-lazy>
            </v-col>
          <!-- </v-lazy> -->
        </v-row>
        <!-- </v-lazy> -->
      </v-container>

      <!-- 검색어를 입력 했고 팔로우 버튼을 안눌렀을때 검색창에 입력한 영화만 출력 -->
      <v-container fluid v-if="this.search && !this.showfollow">
        <!-- <v-lazy> -->
        <v-row dense>
          <!-- <v-lazy> -->
            <v-col
              v-for="(movie, idx) in this.searchMovies"
              :key="idx"
              :cols="col_flex"
              md="3"
            >
              <v-lazy
                transition="fade-transition"
              >
                <MovieCard :movie="movie"/>
              </v-lazy>
            </v-col>
          <!-- </v-lazy> -->
        </v-row>
        <!-- </v-lazy> -->
      </v-container>

     <!-- 검색어를 입력 안했고 북마크 버튼만 눌렀을때 전체 영화 리스트 출력 -->
      <v-container fluid v-if="!this.search && this.showfollow">
        <!-- <v-lazy> -->
        <v-row dense>
          <!-- <v-lazy> -->
            <v-col
              v-for="(movie, idx) in followmovies"
              :key="idx"
              :cols="col_flex"
              md="3"
            >
              <v-lazy
                transition="fade-transition"
              >
                <MovieCard :movie="movie"/>
              </v-lazy>
            </v-col>
          <!-- </v-lazy> -->
        </v-row>
        <!-- </v-lazy> -->
      </v-container>

     <!-- 검색어를 입력했고 북마크 버튼도 눌렀을때 전체 영화 리스트 출력 -->
      <v-container fluid v-if="this.search && this.showfollow">
        <!-- <v-lazy> -->
        <v-row dense>
          <!-- <v-lazy> -->
            <v-col
              v-for="(movie, idx) in specialmovie"
              :key="idx"
              :cols="col_flex"
              md="3"
            >
              <v-lazy
                transition="fade-transition"
              >
                <MovieCard :movie="movie"/>
              </v-lazy>
            </v-col>
          <!-- </v-lazy> -->
        </v-row>
        <!-- </v-lazy> -->
      </v-container>


    <!-- </v-card> -->

  </div>
  <!-- </v-responsive> -->
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default {
  name: 'MovieList',
  components: {
    MovieCard,
  },
  props: {
    movies: {
      type: Array,
    }
  },
  data() {
    return {
      col_flex: 3,
      search : null,
      viewSearchBar : false,
      searchMovies: [],
      page_num : 1,
      followmovies: [],
      showfollow : false,
      specialmovie : [],
    }
  },
  methods : {
    changeSearchBar() {
      this.viewSearchBar = !this.viewSearchBar
    },
    getfollowmovie () {
      // console.log(this.search)
      if (!this.showfollow) {
        this.showfollow = true
        const token = sessionStorage.getItem('jwt')
        const options = {
          headers: {
            Authorization: 'JWT ' + token
          }
        }
        // const search = {
          //   'search' : this.search
          // }
          
        axios.get(`http://localhost:8000/api/v1/searchmovie/`, options)
        .then(res => {
          const user_id = jwtDecode(token).user_id
          // console.log(res)
          const fdata = []
          res.data.forEach(ele => {
            if (ele.follow_users.includes(user_id)) {
              fdata.push(ele)
            }
          })
          this.followmovies = fdata
        })
        .catch(error => {
          console.log(error.response)
        })
        } else {
          this.showfollow = false
        }
    }
  },
  watch: {
    search () {
      // console.log(this.search)
      const token = sessionStorage.getItem('jwt')
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      const search = {
        'search' : this.search
      }

      axios.get(`http://localhost:8000/api/v1/searchmovie/`, search, options)
      .then(res => {
        console.log(res)
        const mdata = []
        const sdata = []
        const user_id = jwtDecode(token).user_id
        res.data.forEach(ele => {
          if (ele.title.includes(this.search)) {
        //     console.log(ele)
        //     console.log(this.search)
            
            mdata.push(ele)
            if (ele.follow_users.includes(user_id)) {
              sdata.push(ele)
            }
        //   } else {
        //     this.page_num++
          }
        
        })
        this.specialmovie = sdata
        this.searchMovies = mdata
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  },
  created () {
    this.showfollow = false
  }
}


</script>

<style>

</style>