<template>
  <div>
    <q-list separator>
      <q-item-label header>Notes <q-badge>{{notes.length}}</q-badge></q-item-label>
      <q-item :active="note.key == $route.params.key" clickable v-for="(note, index) in notes" :key="index" :id="note.key" @click="toNote(note.key)">
        <q-item-section>
          <q-item-label class="title_note">{{note.title}}</q-item-label>
          <q-item-label v-html="limitContent(note.content)" caption class="content_note"></q-item-label>
          <q-item-label caption class="datetime">{{formatDate(note.update_at)}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { date, QBadge } from 'quasar'

export default {
  name: 'listNotes',
  components: {
    QBadge
  },
  data () {
    return {
      notes: []
    }
  },
  methods: {
    async loadNotes () {
      this.notes = await this.$indexedDB.list('notebook')
    },
    formatDate (timestamp) {
      let now = Date.now()
      let nowFormated = date.formatDate(now, 'D MMMM YYYY')
      let updateAtFormated = date.formatDate(timestamp, 'D MMMM YYYY')

      if (nowFormated === updateAtFormated) return date.formatDate(timestamp, 'HH:mm')

      return date.formatDate(timestamp, 'D MMMM YYYY - HH:mm')
    },
    toNote (key) {
      return this.$router.push('/note/' + key)
    },
    limitContent (content) {
      if (content.length > 305) return content.substr(0, 305) + '...'

      return content
    }
  },
  created () {
    this.loadNotes()
  }
}
</script>

<style>
.title_note {
  margin: 5px 0;
}
.content_note {
  height: 35px;
  line-height: 1.5em !important;
}
.datetime {
  font-size: 0.65rem;
  font-style: italic;
}
.q-item--active {
  background-color: #bbdefb
}
</style>
