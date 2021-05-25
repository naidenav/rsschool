import { UserProfile } from "./components/models/user-profile-model";

export class DataBase {
  dbReq: IDBOpenDBRequest | null = null;

  db: IDBDatabase | null = null;

  userData: IDBObjectStore | null = null;

  isChange: boolean = false;

  constructor(readonly name: string, readonly repName: string, readonly version: number) {
    this.name = name;
    this.version = version;
    this.initDB(repName);
  }

  initDB(repository: string): void {
    this.dbReq = indexedDB.open(this.name, this.version);

    this.dbReq.onupgradeneeded = () => {
      if (this.dbReq !== null) {
        this.db = this.dbReq.result;
        if (this.db !== null) {
          this.userData = this.db.createObjectStore(repository);
          this.userData.createIndex('bestScore', 'bestScore');
        }
      }
    };

    this.dbReq.onsuccess = () => {
      if (this.dbReq !== null) {
        this.db = this.dbReq.result;
      }
    };

    this.dbReq.onerror = () => {
      if (this.dbReq !== null) {
        throw Error(`${this.dbReq.error}`);
      }
    };

    if (this.db !== null) {
      this.db.onversionchange = () => {
        if (this.db !== null) {
          this.db.close();
        }
        // alert('The database is out of date. Please reload the page');
      };
    }
  }

  getFirstTenUsers() {
    let transaction: IDBTransaction | null = null;
    let store: IDBObjectStore | null = null;

    if (this.db !== null) {
      transaction = this.db.transaction(['userData'], 'readwrite');
      store = transaction.objectStore('userData');

      let bestScoreIndex = store.index('bestScore');

      let request = bestScoreIndex.openCursor(null, 'prev');
      const tenUsers: UserProfile[] = [];

      request.onsuccess = () => {
        let cursor = request.result;

        if (cursor && tenUsers.length < 10) {
          tenUsers.push(cursor.value);
          cursor.continue();
        }
      }

      return tenUsers;
    }
  }

  addUser(repName: string, data: UserProfile): void {
    let transaction: IDBTransaction | null = null;
    let store: IDBObjectStore | null = null;

    if (this.db !== null) {
      transaction = this.db.transaction([repName], 'readwrite');
      store = transaction.objectStore(repName);

      const result = store.get(data.email);
      result.onsuccess = () => {
        if (!result.result) {
          console.log(this.getFirstTenUsers());
          store?.add(data, data.email);
        }
      };

      result.onerror = () => {
        throw Error(`${result.error}`);
      }

      transaction.oncomplete = () => {
        // console.log('Data saved!');
      };

      transaction.onerror = () => {
        throw Error(`${transaction?.error}`);
      };
    }
  }

  addRecord(repName: string, data: UserProfile): void {
    let transaction: IDBTransaction | null = null;
    let store: IDBObjectStore | null = null;

    if (this.db !== null) {
      transaction = this.db.transaction([repName], 'readwrite');
      store = transaction.objectStore(repName);

      let result = store.get(data.email);

      result.onsuccess = () => {
        store?.put(data, data.email);
      }

      result.onerror = () => {
        throw Error(`${result.error}`);
      }

      transaction.oncomplete = () => {
        this.isChange = true;
        // console.log('Data saved!');
      };

      transaction.onerror = () => {
        throw Error(`${transaction?.error}`);
      };
    }
  }
}
