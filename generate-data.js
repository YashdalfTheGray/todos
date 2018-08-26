/* eslint-env mongo */
const db = connect('localhost:27017/dev');

db.createCollection('todos');

const insertResult = db.todos.insert([
  {
    content: 'Create app',
    createdAt: Date.now() - 1000,
    modifiedAt: Date.now() - 1000,
    DoneAt: null
  },
  {
    content: 'Create tests',
    createdAt: Date.now() - 10000000,
    modifiedAt: Date.now() - 10000000,
    DoneAt: null
  },
  {
    content: 'Create presentation',
    createdAt: Date.now() - 100000,
    modifiedAt: Date.now() - 100000,
    DoneAt: null
  }
]);

/* eslint-disable-next-line no-restricted-globals */
print(
  `INSERT RESULT: Inserted ${insertResult.nInserted} documents into dev/todos`
);
