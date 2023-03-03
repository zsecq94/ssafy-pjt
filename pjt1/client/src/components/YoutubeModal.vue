<template>
  <div>
    <v-col v-if="video" cols="4" >
        <iframe id="player" type="text/html" width="850" height="550"
        :src="videoSrc" frameborder="0"></iframe>
    </v-col>
  </div>
</template>

<script>
export default {
    name: 'YoutubeModal',
    props: {
        video: null,
    },
    computed: {
        videoSrc: function () {
        if (this.isSelected()) {
            return "http://www.youtube.com/embed/" + this.video
        }
        return ''
        },
    },
    methods: {
        isSelected: function () {
            return Object.keys(this.video).length
        },
    }
}
</script>

<style>
</style>