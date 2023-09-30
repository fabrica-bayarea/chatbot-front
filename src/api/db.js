import Dexie from 'dexie';

const db = new Dexie('Chatbot');

db.version(2).stores({
  conversations: '++id, user_id, messages',
  users: '++id, email, name, password',
});

export default db;
