<template>
  <div data-scroll-container class="page-home">
    <div class="ph__inner">
      <section class="ph__section" data-scroll-section>...</section>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
} from '@vue/composition-api'
import { locomotiveInit } from '@/pages/mixins/locomotive'
import { createMetaData, headObject } from '@/pages/mixins/head'
import { useContext } from '@/components/core/getCurrentInstance'

export default defineComponent({
  setup(_props, _ctx) {
    /**
     * current component instance
     */
    const { $dispatch, $getters } = useContext()
    /**
     * init locomotive
     * speed: {Number} wheel power
     */
    const { speed, resizeHandler } = locomotiveInit({})

    /**
     * create page meta object
     */
    const meta = createMetaData()

    onMounted(() => {
      nextTick(() => {
        // await ImageSingleLoad(require('Images/test/01.jpg'))
        $dispatch('global/setIsPageReady', true)

        setTimeout(() => {
          $getters['ls/getLs'].value.update()
          resizeHandler()
        }, 1000)
      })
    })

    onBeforeUnmount(() => {
      $dispatch('global/setIsPageReady', false)
    })

    return {
      speed,

      ...meta,
    }
  },
  head() {
    return headObject(this)
  },
})
</script>

<style lang="scss">
.page-home {
  //
}

.ph__inner {
  //
}
</style>
