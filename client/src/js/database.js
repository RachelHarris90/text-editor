import { openDB } from 'idb';


const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accept some content and add it to the database
export const putDb = async (content) => {

  const contentDb = await openDB('jate', 1);

  const tx = contentDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.add({ id:1, value: content });

  const result = await request;
  console.log('Successfully saved', result);
};

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
