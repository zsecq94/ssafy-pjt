<template>
  
  <v-card class="movie-detail-modal" tile>

    <v-container fluid>
      <hr style="margin-left: 30px; margin-right: 30px;">
      
      <v-row justify="space-around">
        <v-col cols="4">
          <v-img
            :src="movie.img_url"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            style="margin:40px"
          >
          </v-img>
        </v-col>        
        <v-col 
          cols="6"
          style="margin:40px"
        >
          <v-card-title>
            <h1>{{ movie.title }}</h1>
          </v-card-title>
          <v-col> 
            <v-card-text>
              <div><b>감독</b> | <span v-for="name in directors" :key=name>{{ name }}, </span></div>
              <div><b>배우</b> | <span v-for="name in actors" :key=name>{{ name }}, </span></div>
              <div><b>평점</b> | <span>⭐{{ movie.rate }} / ⭐10</span></div>
            </v-card-text>

            <v-card-text>
              <h2>줄거리</h2>
              <br><hr>
              <v-expansion-panels accordion>
                <v-expansion-panel accordion>
                  <v-expansion-panel-header>보기</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ movie.description }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>

            <v-card-text>
              <h2>평가</h2>
              <br><hr>
              <v-expansion-panels accordion>
                <v-expansion-panel accordion>
                  <v-expansion-panel-header>보기</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ul style="list-style: none; padding:0px">
                      <li v-for="review in reviews" :key=review.id>
                        <div style="display:flex">
                          <v-rating
                            :value="review.score"
                            background-color="white"
                            color="yellow accent-4"
                            dense
                            size="8"
                            readonly
                          ></v-rating>
                          <span> / </span>
                          <i style="font-size:12px;"> by {{ review.username }}</i>
                          <div v-if="user_pk==review.user" >
                            <v-btn small depressed v-on:click="reviewDelete($event, review)"
                            style="height:10px; width:1px;">
                              <b-icon icon="trash" font-scale="1.2"></b-icon>
                            </v-btn>                            
                          </div>
                        </div>
                        <div>
                          {{ review.content }}                            
                        </div>
                      </li>
                    </ul>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <br>
              <VideoSearch
              :movie="movie"
              @goApp="goApp"
              @click="asdf"        
              />
            </v-card-text>            
          </v-col>          
        </v-col>
        
      </v-row>

      <v-dialog
        v-model="Youtube_dialog_show"
        max-width="900"
      >
        <YoutubeModal :video="video"/>
      </v-dialog>

    </v-container>
    <hr style="margin-left: 30px; margin-right: 30px;">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="white darken-1" text @click.prevent="closeDialog">닫기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import VideoSearch from './VideoSearch.vue'
import YoutubeModal from './YoutubeModal.vue'

export default {
  data () {
    return {
      directors: [],
      actors: [],
      target_review: null,
      user_pk: '',
      video: null,
      Youtube_dialog_show: false,
    }
  },
  computed: {
    videoSrc: function () {
      if (this.isSelected()) {
        return "http://www.youtube.com/embed/" + this.video
      }
      return ''
    },
  },
  props: {
    movie: {
      type: Object,
      required: false,
    },
    reviews: {
      type: Array,
      required: false,
    }
  },
  components: {
      VideoSearch,
      YoutubeModal,
  },
  methods: {
    goApp(video) {
      this.video = null
      this.video = video
      this.Youtube_dialog_show = true
    },
    closeDialog() {
      this.video = null
      this.$emit('closeDialogEvent', true)
    },

    getUserPk(){
      const token = sessionStorage.getItem('jwt')
      this.user_pk = jwtDecode(token).user_id
    },

    directorsNameCall() {
      const token = sessionStorage.getItem('jwt')
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      this.movie.directors.forEach(code => {
        axios.get(`http://localhost:8000/api/v1/director/${code}/`, options)
        .then(res => {
          this.directors.push(res.data.name)
        })
        .catch(error => {
          console.log(error.response)
        })
      })
    },

    actorsNameCall() {
      const token = sessionStorage.getItem('jwt')
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      this.movie.actors.forEach(code => {
        axios.get(`http://localhost:8000/api/v1/actor/${code}/`, options)
        .then(res => {
          this.actors.push(res.data.name)
        })
        .catch(error => {
          console.log(error.response)
        })
      })
    },

    reviewDelete(event, review) {
      console.log(event)
      console.log(review)
      const token = sessionStorage.getItem('jwt')
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      axios.get(`http://localhost:8000/api/v1/review/delete/${review.id}/`, options)
      .then(() => {
        this.$emit('reviewUpdateEvent', true)
      })
    },

  }, //end of methods

  mounted() {
    this.directorsNameCall()
    this.actorsNameCall()
    this.getUserPk()
    // this.reviewsCall()
  },


}
</script>

<style>

</style>