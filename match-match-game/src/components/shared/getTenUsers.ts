import { UserProfile } from '../models/user-profile-model';

export function getFirstTenUsers(db: IDBDatabase): Promise<UserProfile[]> {
  let transaction: IDBTransaction | null = null;
  let store: IDBObjectStore | null = null;

  transaction = db.transaction(['userData'], 'readwrite');
  store = transaction.objectStore('userData');

  const bestScoreIndex = store.index('bestScore');

  const request = bestScoreIndex.openCursor(null, 'prev');

  request.onerror = () => {
    throw Error(`${request.error}`);
  };

  const promise = new Promise<UserProfile[]>((resolve) => {
    const result: UserProfile[] = [];

    request.onsuccess = () => {
      const cursor = request.result;

      if (cursor && result.length < 10) {
        result.push(cursor.value);
        cursor.continue();
      } else resolve(result);
    };
  });

  return promise;
}
