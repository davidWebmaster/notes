<template>
  <div>
    <div class="top_list q-img overflow-hidden absolute-top">
      <span class="label_top_list">All Notes <q-badge>{{notes.length}}</q-badge></span>
      <q-input
        class="input_search"
        v-model="search"
        filled
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <q-scroll-area class="scrolll">
      <q-list separator>
        <q-item :active="note.key == $route.params.key" clickable v-for="(note, index) in notes" :key="index" :id="note.key" @click="toNote(note.key)">
          <q-item-section>
            <q-item-label class="title_note">{{note.title}}</q-item-label>
            <q-item-label v-html="note.content" caption class="content_note"></q-item-label>
            <q-item-label caption class="datetime">{{formatDate(note.update_at)}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { date, QBadge, QScrollArea, QInput } from 'quasar'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'listNotes',
  components: {
    QBadge,
    QScrollArea,
    QInput
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions('notes', ['loadNotes']),
    formatDate (timestamp) {
      let now = Date.now()
      let nowFormated = date.formatDate(now, 'D MMMM YYYY')
      let updateAtFormated = date.formatDate(timestamp, 'D MMMM YYYY')

      if (nowFormated === updateAtFormated) return date.formatDate(timestamp, 'HH:mm')

      return date.formatDate(timestamp, 'D MMMM YYYY - HH:mm')
    },
    toNote (key) {
      return this.$router.push('/note/' + key)
    }
  },
  computed: {
    ...mapState('notes', ['notes'])
  },
  created () {
    this.loadNotes()
  },
  watch: {
    search: function () {
      this.loadNotes(this.search)
    }
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
  overflow: hidden;
}
.datetime {
  font-size: 0.65rem;
  font-style: italic;
}
.q-item--active {
  background-color: #bbdefb
}
.scrolll {
  height: calc(1000px - 150px);
  margin-top: 120px;
}
.top_list {
  height: 120px;
  border-bottom: solid 1px #ccc;
  background-color: #fff;
  z-index: 1;
  padding-top: 15px;
}
.label_top_list {
  margin-left: 1em;
  font-size: 20px;
}
.input_search {
  margin-top: 18px;
}
</style>
