import indexedDB from '../store/indexedDB'

export default async ({ Vue }) => {
  Vue.prototype.$indexedDB = indexedDB
}
