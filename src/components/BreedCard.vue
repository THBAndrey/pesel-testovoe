<template>
  <div
    class="breed-card"
    :class="size"
    :style="
      `background-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%), url(${image})`
    "
  >
    <button
      class="like-button"
      @click="isFavorite ? removeFromFavorites(image) : addToFavorites(image)"
    >
      <svg
        width="29"
        height="26"
        viewBox="0 0 30 28"
        xmlns="http://www.w3.org/2000/svg"
        stroke-width="2"
        stroke="currentColor"
        :fill="isFavorite ? 'currentColor' : 'transparent'"
      >
        <path
          d="M 14.321 26.262 C 14.733 26.663 15.393 26.663 15.805 26.262 L 26.938 15.437 C 30.438 12.035 30.438 6.508 26.938 3.106 C 23.689 -0.053 18.567 -0.269 15.063 2.459 C 11.559 -0.269 6.437 -0.053 3.188 3.106 C -0.312 6.508 -0.312 12.035 3.188 15.437 L 14.321 26.262 Z"
        ></path>
      </svg>
    </button>
    <span class="breed-name">{{ breedName }}</span>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    size: {
      type: String,
      default: 'default',
      validator: value => {
        return ['default', 'large'].indexOf(value) !== -1
      }
    },
    image: {
      type: String,
      required: true
    }
  },
  computed: {
    breedName() {
      return this.image.split('/')[4].split('-')[0]
    },
    ...mapGetters({
      favorites: 'favorites/getFavorites'
    }),
    isFavorite() {
      return Boolean(this.favorites.find(el => el === this.image))
    }
  },
  methods: {
    ...mapMutations({
      addToFavorites: 'favorites/addToFavorites',
      removeFromFavorites: 'favorites/removeFromFavorites'
    })
  }
}
</script>

<style lang="scss" scoped>
.breed-card {
  position: relative;
  height: 290px;
  border-radius: 8px;
  overflow: hidden;
  background-position: center, center;
  background-size: cover, cover;

  .like-button {
    position: absolute;
    top: 25px;
    left: 25px;
    border-radius: 50%;
    box-sizing: content-box;
    width: 30px;
    height: 30px;
    padding: 6px 4px 2px 4px;
    border: none;
    outline: none;
    background: none;
    color: white;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    &:active {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  .breed-name {
    position: absolute;
    right: 25px;
    bottom: 25px;
    color: white;
    font-size: 30px;
    text-transform: capitalize;
  }

  &.large {
    height: 513px;

    .like-button {
      top: 35px;
      left: 35px;
    }

    .breed-name {
      right: 50px;
      bottom: 50px;
    }
  }
}
</style>
