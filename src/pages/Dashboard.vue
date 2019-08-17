<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row">
      <div class="offset-md-3 col-md-6 col-sm-12 col-12">
        <q-card bordered class="my-card">
          <q-card-section>
            <div class="text-h6 text-center">Welcome to notes app</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section style="text-align: center; color: #027be3">
            <q-icon name="library_books" style="font-size: 8rem;" />
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <div class="text-h7 text-right"> You have <q-badge style="font-size: 1rem; padding: 0.35rem">{{ notes.length }}</q-badge> Notes created</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { QCard, QCardSection, QSeparator, QIcon, QBadge } from 'quasar'
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  components: {
    QCard,
    QCardSection,
    QSeparator,
    QIcon,
    QBadge
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('notes', ['notes'])
  }
}
</script>

<style lang="scss" scoped>
</style>
