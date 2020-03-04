<template>
  <main class="container">
    <SelectBreed>
      <MySwitch title="Сортировка по алфавиту" v-model="sort" />
    </SelectBreed>
    <template v-if="this.items">
      <div class="row">
        <div
          :class="index == 0 ? 'col' : 'col-3'"
          v-for="(link, index) in this.sort ? this.sortedItems : this.items"
          :key="index"
        >
          <BreedCard :size="index == 0 ? 'large' : 'default'" :image="link" />
        </div>
      </div>
    </template>
    <div ref="loader" class="load" @scroll="loadMoreData">
      <Loader />
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

import BreedCard from '@/components/BreedCard'
import Loader from '@/components/Loader'
import SelectBreed from '@/components/SelectBreed'
import MySwitch from '@/components/Switch'

export default {
  components: {
    BreedCard,
    Loader,
    SelectBreed,
    MySwitch
  },
  data: () => ({
    items: null,
    loading: false,
    sort: false
  }),
  computed: {
    sortedItems() {
      return [...this.items].sort()
    }
  },
  methods: {
    ...mapActions({
      getBreedRandomImage: 'api/getBreedRandomImage',
      getRandomImages: 'api/getRandomImages'
    }),
    getBreedByLink(link) {
      return link.split('/')[4].split('-')[0]
    },
    async loadMoreData() {
      this.items = [...this.items, ...(await this.getRandomImages(18))]
    },
    async handleScroll() {
      if (
        !this.loading &&
        window.scrollY + window.innerHeight > this.$refs.loader.offsetTop
      ) {
        this.loading = true
        await this.loadMoreData()
        this.loading = false
      }
    }
  },
  async created() {
    this.items = await this.getRandomImages(19)
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
