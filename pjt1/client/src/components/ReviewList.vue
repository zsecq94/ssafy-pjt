<template>
  <v-simple-table fixed-header max-height="500px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">영화제목</th>
          <th class="text-left">댓글내용</th>
          <th class="text-left">점수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in my_reviews" :key="review.pk">
          <td>{{ review.movie }}</td>
          <td>{{ review.content }}</td>
          <td>
            <v-rating
              :value="review.score"
              color="orange"
              readonly
              
              >
            </v-rating>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'ReviewList',
  props: {
    my_reviews: {
			type:Array
		}
  }
}
</script>

<style>

</style>