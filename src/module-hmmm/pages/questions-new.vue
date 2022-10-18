<template>
  <div class="container">

    试题录入

  </div>
</template>

<script>

import { list } from '@/api/hmmm/companys'
import { provinces, citys } from '@/api/hmmm/citys'
import { direction, questionType, difficulty } from '@/api/hmmm/constants'
import { simple as simple1 } from '@/api/hmmm/directorys'
import { add, update } from '@/api/hmmm/questions'
import { list as list2 } from '@/api/hmmm/tags'
export default {
  data() {
  }

}
</script>

<style scoped lang='less'>

</style>
