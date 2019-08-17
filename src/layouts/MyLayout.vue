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
        <q-btn class="btn_action" flat round dense icon="add_comment" title="Create a note" />
        <q-btn flat round dense icon="delete" title="Delete" />
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
  </q-layout>
</template>

<script>
import ListNotes from '../components/listNotes'

export default {
  name: 'MyLayout',
  components: {
    ListNotes
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {

  }
}
</script>

<style>
.btn_action {
  margin: 0 20px;
}
</style>
