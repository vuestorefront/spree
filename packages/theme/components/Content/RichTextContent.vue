<template>
  <div v-html="section.rteContent"/>
</template>
<script>
export default {
  name: 'RichTextContent',
  props: {
    section: {
      type: Object
    }
  }
};
</script>

<style scoped>

</style>
