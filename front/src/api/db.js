import Dexie from 'dexie';

const db = new Dexie('Chatbot');

db.version(1).stores({
  users: '++id, email, name, password',
});

export default db;
