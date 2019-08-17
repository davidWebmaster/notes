<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Notes App
        </q-toolbar-title>
        <q-btn flat round dense icon="home" title="Home" to="/" />
        <q-btn @click="newNote" class="btn_action" flat round dense icon="add_comment" title="Create a note" />
        <q-btn
          v-if="$route.path !== '/'"
          @click="confirm = true"
          flat round dense
          icon="delete"
          title="Delete" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <list-notes />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Want to delete this note?</div>
          <q-space />
          <q-btn icon="close" @click="confirm = false" flat round dense />
        </q-card-section>
        <q-card-section class="row items-center">
          <q-avatar icon="help_outline" color="primary" text-color="white" />
          <span class="q-ml-sm">This note will be deleted</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="confirm = false" />
          <q-btn label="Delete" color="primary" @click="deleteNote" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { QDialog, QCard, QCardSection, QAvatar, QCardActions, QBtn, QSpace } from 'quasar'
import ListNotes from '../components/listNotes'
import { mapActions } from 'vuex'

export default {
  name: 'MyLayout',
  components: {
    ListNotes,
    QDialog,
    QCard,
    QCardSection,
    QAvatar,
    QCardActions,
    QBtn,
    QSpace
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      confirm: false,
      note: {}
    }
  },
  methods: {
    ...mapActions('notes', ['loadNotes']),
    newNote () {
      let timestamp = Date.now()

      this.$indexedDB.save('notebook', {
        title: 'untitled note',
        content: 'your note where...',
        update_at: timestamp
      }).then(key => {
        console.log('saved note')
        this.loadNotes()
        return this.$router.push('/note/' + key)
      }).catch(error => {
        console.log(error)
      })
    },
    deleteNote () {
      this.$indexedDB.delete('notebook', parseInt(this.$route.params.key)).then(key => {
        console.log('deleted note')
        this.loadNotes()
        this.confirm = false
        return this.$router.push('/')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.btn_action {
  margin: 0 20px;
}
</style>
