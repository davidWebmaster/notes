<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input v-model="note.title" placeholder="Title" class="input_title_note" />
    <q-editor
    class="editor"
    v-model="note.content"
    :toolbar="toolbar"
     />
  </div>
</template>

<style>
</style>

<script>
import { QEditor, QInput } from 'quasar'

export default {
  name: 'PageIndex',
  components: {
    QInput,
    QEditor
  },
  data () {
    return {
      toolbar: [
        ['left', 'center', 'right', 'justify', 'bold', 'italic', 'strike', 'underline',
          'quote', 'unordered', 'ordered', 'outdent', 'indent', 'undo', 'redo']
      ],
      note: {
        title: '',
        content: 'your note where...',
        update_at: ''
      }
    }
  },
  methods: {
    saveNote () {
      let timestamp = Date.now()
      this.note.update_at = timestamp

      this.$indexedDB.save('notebook', this.note)
        .then(response => {
          console.log('saved note')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateNote () {
      let timestamp = Date.now()
      this.note.update_at = timestamp

      this.$indexedDB.update('notebook', this.note, parseInt(this.$route.params.key))
        .then(response => {
          console.log('updated note')
        })
        .catch(error => {
          console.log(error)
        })
    },
    async loadNote (key) {
      this.note = await this.$indexedDB.get('notebook', key)
    }
  },
  created () {
    if (this.$route.params.key) this.loadNote(parseInt(this.$route.params.key))
  },
  watch: {
    '$route.params.key': function (key) {
      if (this.$route.params.key) this.loadNote(parseInt(this.$route.params.key))
    },
    'note.title': function () {
      this.updateNote()
    },
    'note.content': function () {
      this.updateNote()
    }
  }
}
</script>

<style>
.input_title_note {
  height: 60px;
  font-size: 30px;
}
.q-editor {
  border: none;
}
</style>
