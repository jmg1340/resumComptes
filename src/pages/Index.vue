<template>
  <q-page class="column">
    <jmg_quadre />
    <!-- {{ getQuadre }} -->
  </q-page>
</template>

<script>
import jmg_quadre from "../components/quadre"
export default {
  name: 'PageIndex',
  components: { jmg_quadre },
  data () {
    return {
    }
  },

}
</script>
