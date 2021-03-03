<template>
  <div class="organism-fixed">
    <div v-if="false" class="of__nav"><MoleculeNav /></div>

    <div v-if="false" class="of__loader"><AtomLoader /></div>
  </div>
</template>

<script lang="ts" src="./_Fixed.ts"></script>

<style lang="scss" scoped>
.organism-fixed {
  //
}

.of__nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;

  @include desktop {
    top: 0;
    right: 6rem;
    left: auto;
  }
}

.of__loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  pointer-events: none;
}
</style>
