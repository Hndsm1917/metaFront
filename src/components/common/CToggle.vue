<template>
  <div class="ui-toggle" :class="{ 'ui-toggle--big': theme }">
    <div @click="toggle" class="ui-toggle__heading">
      <slot name="heading" :opened="isActive"></slot>
    </div>

    <div
      ref="content"
      class="ui-toggle__content"
      :style="{ height: `${elemHeight}px` }"
      :class="{ 'ui-toggle__content--relative': relative }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const DEFAULT_HEIGHT = 0
const props = defineProps({
  method: {
    type: Function,
    required: false
  },

  isActive: {
    type: Boolean,
    default: false,
    required: true
  },

  statickHeight: {
    type: Number,
    required: false,
    default: 0
  },

  theme: {
    type: String,
    required: false
  },

  relative: {
    type: Boolean,
    required: false
  }
})

const emits = defineEmits(['onToggle'])

let realHeight = ref(undefined)
let content = ref(null)
let elemHeight = ref(undefined)

onMounted(() => {
  realHeight.value = content.value.getBoundingClientRect().height
  calcHeight()
})

watch(
  () => props.isActive,
  () => {
    calcHeight()
  }
)

function calcHeight() {
  let height = props.statickHeight !== 0 ? props.statickHeight : realHeight.value

  elemHeight.value = realHeight.value === undefined || !props.isActive ? DEFAULT_HEIGHT : height
}

function toggle() {
  emits('onToggle')
}
</script>

<style scoped lang="scss">
.ui-toggle {
  $self: &;
  position: relative;

  &--big {
    #{$self}__heading {
      border-radius: em(10);
    }

    #{$self}__content {
      border-radius: em(10);
    }
  }

  &__heading {
    cursor: pointer;
    position: relative;
    height: 100%;
    z-index: 3;
    border-radius: em(37);
    box-shadow: -5px 4px 10px 0px rgba(0, 0, 0, 0.1);
    background: $white;
  }

  &__content {
    overflow: hidden;
    transition: height 0.35s ease-out;
    transition-delay: 0.35s;
    background: #e9f2f6;
    position: absolute;
    width: 100%;
    top: 50%;
    z-index: 2;
    padding-top: em(20);
    border-radius: 0 0 em(20) em(20);

    &--relative {
      position: relative;
      top: em(-20);
    }
  }
}
</style>
