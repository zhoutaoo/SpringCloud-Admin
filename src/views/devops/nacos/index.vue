<template>
  <elFrame :src="nacosServer"/>
</template>
<script>
import { mapGetters } from 'vuex'
import elFrame from '@/components/Iframe/index'
export default {
  components: { elFrame },
  computed: {
    ...mapGetters([
      'nacosServer'
    ])
  }
}
</script>
