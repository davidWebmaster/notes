import indexedDB from '../indexedDB'

export default {
  namespaced: true,
  state: {
    notes: []
  },
  actions: {
    async loadNotes ({ context, commit }) {
      commit('SET_NOTES', await indexedDB.list('notebook'))
    }
  },
  mutations: {
    SET_NOTES (state, notes) {
      state.notes = notes
    }
  },
  getters: {
    notes: state => {
      return state.notes
    }
  }
}
