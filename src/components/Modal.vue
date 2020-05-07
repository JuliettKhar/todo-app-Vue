<template>
  <div class="modal" :class="isOpen ? 'is-active': ''">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <h1>
          <slot name="title"></slot>
        </h1>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <div class="columns">
          <div class="column">
            <button class="button is-light is-success is-fullwidth" @click.prevent="onConfirmClick">Yes</button>
          </div>
          <div class="column">
            <button class="button is-light is-danger is-fullwidth" @click.prevent="onCancelClick">No</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onConfirmClick () {
      this.$emit('confirm')
    },
    onCancelClick () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    width: 100%;
  }

  .modal {
    &-card {
      &-foot, &-head {
        background-color: white;
      }
    }
  }
</style>
