import { UserProfile } from './components/models/user-profile-model';

export class DataBase {
  dbReq: IDBOpenDBRequest | null = null;

  db: IDBDatabase | null = null;

  userData: IDBObjectStore | null = null;

  isChange = false;

  tenUsers: UserProfile[] = [];

  constructor(readonly name: string, readonly repName: string, readonly version: number) {
    this.name = name;
    this.version = version;
  }

  async initDB(repository: string): Promise<IDBDatabase> {
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
      };
    }

    const promise = new Promise<IDBDatabase>((resolve) => {
      if (this.dbReq !== null) {
        this.dbReq.onsuccess = () => {
          if (this.dbReq !== null) {
            resolve(this.dbReq.result);
          }
        };
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

      const result = store.get(data.email);

      result.onsuccess = () => {
        const prifile: UserProfile = result.result;
        if (data.bestScore > prifile.bestScore) store?.put(data, data.email);
      };

      result.onerror = () => {
        throw Error(`${result.error}`);
      };

      transaction.onerror = () => {
        throw Error(`${transaction?.error}`);
      };
    }
  }
}
