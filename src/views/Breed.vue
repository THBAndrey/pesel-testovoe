<template>
  <main class="container">
    <SelectBreed :current="this.$route.params.breedName"> </SelectBreed>
    <template v-if="this.items">
      <div class="row">
        <div
          :class="i == 1 ? 'col' : 'col-3'"
          v-for="i in this.showQuantity"
          :key="i"
        >
          <BreedCard
            :size="i == 1 ? 'large' : 'default'"
            :image="items[i - 1]"
          />
        </div>
      </div>
    </template>
    <div
      v-if="this.items"
      v-show="this.showQuantity != this.items.length"
      ref="loader"
      class="load"
      @scroll="loadMoreData"
    >
      <Loader />
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

import BreedCard from '@/components/BreedCard'
import Loader from '@/components/Loader'
import SelectBreed from '@/components/SelectBreed'

export default {
  components: {
    BreedCard,
    Loader,
    SelectBreed
  },
  data: () => ({
    items: null,
    showQuantity: 0,
    loading: false
  }),
  methods: {
    ...mapActions({
      getBreedImages: 'api/getBreedImages',
      getBreeds: 'api/getBreeds'
    }),
    loadMoreData() {
      if (this.showQuantity + 18 <= this.items.length) {
        this.showQuantity += 18
      } else {
        this.showQuantity += this.items.length - this.showQuantity
      }
    },
    handleScroll() {
      if (
        !this.loading &&
        window.scrollY + window.innerHeight > this.$refs.loader.offsetTop
      ) {
        this.loading = true
        this.loadMoreData()
        this.loading = false
      }
    }
  },
  async created() {
    let breeds = await this.getBreeds()
    if (breeds.indexOf(this.$route.params.breedName.toLowerCase()) === -1) {
      this.$router.push('/notfound')
    }

    this.items = await this.getBreedImages(this.$route.params.breedName)
    if (this.items.length >= 19) {
      this.showQuantity = 19
    } else {
      this.showQuantity = this.items.length
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    async $route() {
      this.showQuantity = 0
      this.items = await this.getBreedImages(this.$route.params.breedName)
      if (this.items.length >= 19) {
        this.showQuantity = 19
      } else {
        this.showQuantity = this.items.length
      }
    }
  }
}
</script>

<style></style>
