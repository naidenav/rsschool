interface userProfile {
  firstName: string,
  lastName: string,
  email: string,
  records: object[],
}

interface record {
  score: number,
  date: Date
}

export class DataBase {

  dbReq: IDBOpenDBRequest | null = null;

  db: IDBDatabase | null = null;

  constructor(readonly name: string, readonly repName: string, readonly version: number) {
    this.name = name;
    this.version = version;
    this.initDB(repName);
  }

  initDB(repository: string):void {
    this.dbReq = indexedDB.open(this.name, this.version);

    this.dbReq.onupgradeneeded = () => {
      if (this.dbReq !== null) {
        this.db = this.dbReq.result;
        if (this.db !== null) {
          this.db.createObjectStore(repository);
        }
      }
    };

    this.dbReq.onsuccess = () => {
      if (this.dbReq !== null) {
        this.db = this.dbReq.result;
        console.log('Data Base - success');
      }
    };

    this.dbReq.onerror = () => {
      if (this.dbReq !== null) {
        console.error('Error', this.dbReq.error);
      }
    };

    if (this.db !== null) {
      this.db.onversionchange = () => {
        if (this.db !== null) {
          this.db.close();
        }
        alert('The database is out of date. Please reload the page');
      };
    }
  }

  addUser(repName: string, data: userProfile):void {
    let transaction: IDBTransaction | null = null;
    let store: IDBObjectStore | null = null;

    if (this.db !== null) {
      transaction = this.db.transaction([repName], 'readwrite');
      store = transaction.objectStore(repName);

      let result = store.getKey(data.email);
      result.onsuccess = () => {
        if (result.result !== data.email && store !== null) {
          store.add(data, data.email);
        } else {
          return;
        }
      }

      result.onerror = () => {
        console.log('ключа нет')
      }

      transaction.oncomplete = () => {
        console.log('Data saved!');
      }

      transaction.onerror = () => {
        alert('error saving data');
      }
    }
  }

  addRecord(repName: string, userEmail: string, score: number):void {
    let transaction: IDBTransaction | null = null;
    let store: IDBObjectStore | null = null;

    if (this.db !== null) {
      transaction = this.db.transaction([repName], 'readwrite');
      store = transaction.objectStore(repName);
      if (store.getKey(userEmail)) {
        console.log('yes')
      }
      transaction.oncomplete = () => {
        console.log('Data saved!');
      }
      transaction.onerror = () => {
        alert('error saving data');
      }
    }
  }
}
