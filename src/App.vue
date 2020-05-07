<template>
  <main id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </main>
</template>

<style lang="scss">
  #app {
    font-family: 'Varela Round', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .fade {
    &-enter {
      opacity: 0;

      &-active {
        transition: opacity .5s;
      }

      &-leave {
        &-active {
          transition: opacity .5s;
        }

        &-to {
          opacity: 0;
        }
      }
    }
  }
</style>
