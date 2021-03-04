<template>
  <div data-scroll-container class="page-basic-scene">
    <div class="ph__inner">
      <section class="ph__section" data-scroll-section>
        <canvas class="webgl" />
      </section>
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
import { FirstAnimations } from '@/assets/js/first-animtion'

export default defineComponent({
  setup(_props, _ctx) {
    /**
     * current component instance
     */
    const { $dispatch } = useContext()
    /**
     * init locomotive
     * speed: {Number} wheel power
     */
    const { speed } = locomotiveInit({})

    /**
     * create page meta object
     */
    const meta = createMetaData({ title: 'First Animation' })

    let canvas: FirstAnimations | undefined

    onMounted(() => {
      nextTick(() => {
        $dispatch('global/setIsPageReady', true)
        canvas = new FirstAnimations()
      })
    })

    onBeforeUnmount(() => {
      $dispatch('global/setIsPageReady', false)

      canvas?.finish()
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
//
</style>
