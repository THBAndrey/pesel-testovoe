<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  span {
    width: 12px;
    height: 12px;
    display: inline-block;
    border: 1px solid #ffffff;
    border-radius: 50%;
    margin-right: 15px;
  }

  span:nth-of-type(1) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  span:nth-of-type(2) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  span:nth-of-type(3) {
    animation: grow 1s ease-in-out infinite;
    margin-right: 0;
  }
}

@keyframes grow {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }
}
</style>
