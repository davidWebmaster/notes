let DBname = 'notes'
let version = '1'
let connection = null

const openConnection = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DBname, version)
    let db

    request.onupgradeneeded = event => {
      db = event.target.result
      db.createObjectStore('notebook', {
        autoIncrement: true
      })
    }

    request.onsuccess = event => {
      connection = event.target.result
      resolve()
    }

    request.onerror = event => {
      console.log(event.target.error)
      reject('Could not connect to database')
    }
  })
}

class Store {
  async open () {
    if (!connection) await openConnection()
    return this
  }

  async save (store, data) {
    if (!connection) await openConnection()

    return new Promise((resolve, reject) => {
      const request = connection
        .transaction([store], 'readwrite')
        .objectStore(store)
        .add(data)

      request.onsuccess = event => {
        resolve(event.target.result)
      }

      request.onerror = event => {
        console.log(event.target.error)
        reject('Could not save data')
      }
    })
  }

  async update (store, data, key) {
    if (!connection) await openConnection()

    return new Promise((resolve, reject) => {
      const request = connection
        .transaction([store], 'readwrite')
        .objectStore(store)
        .put(data, key)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = event => {
        console.log(event.target.error)
        reject('Unable to update data')
      }
    })
  }

  async list (store) {
    if (!connection) await openConnection()

    return new Promise((resolve, reject) => {
      const request = connection
        .transaction([store])
        .objectStore(store)
        .openCursor()

      const list = []

      request.onsuccess = event => {
        const current = event.target.result
        var item = {}
        // if null, no more data
        if (current) {
          item = current.value
          item.key = current.key
          list.push(item)
          // next row
          current.continue()
        } else {
          // descending sort by date updated
          list.sort(function (a, b) {
            return b.update_at - a.update_at
          })
          resolve(list)
        }
      }

      request.onerror = event => {
        console.log(event.target.error)
        reject('Unable to list data')
      }
    })
  }

  async get (store, key) {
    if (!connection) await openConnection()

    return new Promise((resolve, reject) => {
      const request = connection
        .transaction([store], 'readonly')
        .objectStore(store)
        .get(key)

      request.onsuccess = event => {
        resolve(event.target.result)
      }

      request.onerror = event => {
        console.log(event.target.error)
        reject('Unable to get data')
      }
    })
  }

  async delete (store, key) {
    if (!connection) await openConnection()

    return new Promise((resolve, reject) => {
      const request = connection
        .transaction([store], 'readwrite')
        .objectStore(store)
        .delete(key)

      request.onsuccess = event => {
        resolve(event.target.result)
      }

      request.onerror = event => {
        console.log(event.target.error)
        reject('Unable to delete data')
      }
    })
  }
}

export default new Store()
