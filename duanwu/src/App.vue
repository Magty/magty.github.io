<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
.size {
  height: 100%;
}
html,
body {
  @extend .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
