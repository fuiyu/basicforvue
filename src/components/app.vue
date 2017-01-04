<template>
  <div id="wrapper">
    <indexHeader></indexHeader>
    <div class="container">
      <div class="col-sm-12">
        <router-view></router-view>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
  import indexHeader from './home/header.vue'
  import indexFooter from './home/footer.vue'

  export default {
    components: {'indexHeader': indexHeader,'indexFooter': indexFooter}
  }
</script>