<template>
  <div class="c-tab">
    <div class="c-tab__heading">
      <slot name="heading"></slot>
    </div>

    <div class="c-tab__sub-heading">
      <slot name="sub-heading"></slot>
    </div>

    <div class="c-tab__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'

export default defineComponent({
  name: 'CTab'
})
</script>

<style scoped lang="scss">
.c-tab {
  &__heading {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: em(32);
    background: linear-gradient(287.55deg, #282828 7.84%, #5a5a5a 92.65%);
    border-radius: em(20);
    position: relative;
    filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25));

    :root('.wrapper ratings__item') {
    }
  }

  &__sub-heading {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
