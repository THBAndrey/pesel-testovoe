<template>
  <main class="container">
    <template v-if="this.items">
      <div class="row">
        <div
          :class="index == 0 ? 'col' : 'col-3'"
          v-for="(link, index) in this.items"
          :key="index"
        >
          <BreedCard :size="index == 0 ? 'large' : 'default'" :image="link" />
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

import BreedCard from '@/components/BreedCard'

export default {
  components: {
    BreedCard
  },
  computed: {
    ...mapGetters({
      items: 'favorites/getFavorites'
    })
  }
}
</script>

<style lang="scss" scoped>
main {
  padding-top: 122px;
}
</style>
