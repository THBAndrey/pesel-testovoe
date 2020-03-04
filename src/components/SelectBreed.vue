<template>
  <div class="select-breed" :class="collapsed ? 'collapsed' : ''">
    <div class="header">
      <span>
        <div class="title" @click="collapsed = !collapsed">
          <span>{{ title }}</span>
          <svg
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.002 4.83102C0.772777 5.05633 0.401136 5.05633 0.171916 4.83102C-0.0573044 4.60572 -0.0573044 4.24043 0.171916 4.01513L4.08496 0.168977C4.31418 -0.0563259 4.68582 -0.0563259 4.91504 0.168977L8.82808 4.01513C9.05731 4.24043 9.05731 4.60572 8.82808 4.83102C8.59886 5.05633 8.22722 5.05633 7.998 4.83102L4.5 1.39282L1.002 4.83102Z"
            />
          </svg>
        </div>
        <router-link to="/" tag="span" v-if="current" class="current label"
          >{{ current }}
          <svg
            width="7"
            height="9"
            viewBox="0 0 7 6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.20218 2.27892L5.3626 0.118492C5.52059 -0.0394974 5.77674 -0.0394974 5.93473 0.118492C6.09272 0.276482 6.09272 0.532634 5.93473 0.690624L3.77431 2.85105L5.93479 5.01153C6.09278 5.16952 6.09278 5.42567 5.93479 5.58366C5.7768 5.74165 5.52065 5.74165 5.36266 5.58366L3.20218 3.42318L1.0417 5.58366C0.883708 5.74165 0.627556 5.74165 0.469567 5.58366C0.311577 5.42567 0.311577 5.16951 0.469567 5.01152L2.63004 2.85105L0.469628 0.69063C0.311638 0.53264 0.311638 0.276488 0.469628 0.118498C0.627617 -0.0394917 0.883769 -0.0394917 1.04176 0.118498L3.20218 2.27892Z"
            />
          </svg>
        </router-link>
      </span>
      <slot />
    </div>

    <div
      :style="{ height: collapsed ? '0px' : `${$refs.wrapper.offsetHeight}px` }"
      class="body"
    >
      <div ref="wrapper" class="wrapper">
        <router-link tag="div" to="/" class="all-breeds">
          <span class="label">Все пёсели</span>
        </router-link>
        <span
          v-for="(breedList, letter) in breeds"
          :key="letter"
          class="breed-group"
        >
          <span class="breed-letter">{{ letter }}</span>
          <router-link
            tag="span"
            :to="breed"
            class="breed-name label"
            v-for="(breed, index) in breedList"
            :key="letter + index"
          >
            {{ breed }}
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    current: {
      type: String,
      required: false
    }
  },
  data: () => ({
    title: 'Породы',
    collapsed: true,
    breeds: {}
  }),
  methods: {
    ...mapActions({
      getBreeds: 'api/getBreeds'
    })
  },
  async created() {
    let breeds = await this.getBreeds()
    breeds.forEach(breedName => {
      if (this.breeds[breedName[0]]) {
        this.breeds[breedName[0]].push(breedName)
      } else {
        this.$set(this.breeds, breedName[0], [breedName])
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.label {
  padding: 4px 12px;
  border: 1px solid currentColor;
  border-radius: 13px;
  cursor: pointer;
}

.select-breed {
  margin: 50px 0;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      border-bottom: 1px dashed currentColor;
      padding-bottom: 2px;
      cursor: pointer;

      color: white;

      > span {
        margin-right: 10px;
      }

      > svg {
        transition: 0.3s;
      }
    }

    .current {
      margin-left: 20px;
      text-transform: capitalize;
      color: #3c59f0;
    }
  }

  .all-breeds {
    width: fit-content;

    &.router-link-exact-active {
      color: #3c59f0;
    }

    > span {
      line-height: 38px;
    }
  }

  .body {
    overflow: hidden;
    transition: height 0.3s;

    .wrapper {
      padding-top: 30px;
    }

    .breed-group {
      margin-right: 25px;
      line-height: 38px;
    }

    .breed-letter {
      text-transform: uppercase;
      font-size: 20px;
      vertical-align: middle;
      margin-right: 15px;
    }

    .breed-name {
      text-transform: capitalize;
      vertical-align: middle;
      margin-right: 15px;

      &.router-link-active {
        color: #3c59f0;
      }
    }
  }

  &.collapsed {
    .title > svg {
      transform: rotate(180deg);
    }
  }
}
</style>
