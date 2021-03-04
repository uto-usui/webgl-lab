<template>
  <nav class="molecules-nav">
    <ul class="mn__list">
      <li
        v-for="(item, index) in list"
        :key="`mn__item${index}}`"
        class="mn__item"
      >
        <n-link
          class="mn__target js-shuffle"
          :to="item"
          v-text="item.replace('-', ' ')"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./_Nav.ts"></script>

<style lang="scss" scoped>
.molecules-nav {
  //
}

.mn__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.mn__item {
  //
}

.mn__target {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  height: 9rem;
  color: $color-gray-level1;
  text-transform: capitalize;
  letter-spacing: 0.1em;

  @include sizes(-2);

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    content: '';
    background-color: rgba($color-primary, 0.9);
    transition: transform 0.4s $easeInCubic;
    transform: scaleX(0);
    transform-origin: right center;
  }
  //
  &:hover {
    color: $color-white;
    //
    &::after {
      transition: transform 0.4s $easeOutCubic;
      transform: scaleX(1);
      transform-origin: left center;
    }
  }
}
</style>
