import { UserProfile } from "./components/models/user-profile-model";

export class DataBase {
  dbReq: IDBOpenDBRequest | null = null;

  db: IDBDatabase | null = null;

  userData: IDBObjectStore | null = null;

  isChange: boolean = false;

  tenUsers: UserProfile[] = [];

  constructor(readonly name: string, readonly repName: string, readonly version: number) {
    this.name = name;
    this.version = version;
  }

  async initDB(repository: string): Promise<IDBDatabase> {
    console.log(this.name)
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

    // this.dbReq.onsuccess = () => {
    //   console.log('success');
    //   if (this.dbReq !== null) {
    //     this.db = this.dbReq.result;
    //   }
    // };

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

    let promise = new Promise<IDBDatabase>((resolve, reject) => {
      if (this.dbReq !== null) {
        this.dbReq.onsuccess = () => {
          if (this.dbReq !== null) {
            resolve(this.dbReq.result);
          }
        }
      }
    });

    return promise;
  }

  getFirstTenUsers(db: IDBDatabase): Promise<UserProfile[]> {
    let transaction: IDBTransaction | null = null;
    let store: IDBObjectStore | null = null;

    transaction = db.transaction(['userData'], 'readwrite');
    store = transaction.objectStore('userData');

    let bestScoreIndex = store.index('bestScore');

    let request = bestScoreIndex.openCursor(null, 'prev');

    request.onerror = () => {
      throw Error(`${request.error}`);
    }

    // request.onsuccess = () => {
    //   let cursor = request.result;

    //   if (cursor && this.tenUsers.length < 10) {
    //     this.tenUsers.push(cursor.value);
    //     cursor.continue();
    //   }
    // }

    let promise = new Promise<UserProfile[]>((resolve, reject) => {
      let result: UserProfile[] = [];

      request.onsuccess = () => {
        let cursor = request.result;

        if (cursor && result.length < 10) {
          result.push(cursor.value);
          cursor.continue();
        } else resolve(result);
      }
    });

    return promise;
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
