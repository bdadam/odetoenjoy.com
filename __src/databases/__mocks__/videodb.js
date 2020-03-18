import Datastore from 'nedb';

const db = new Datastore({ inMemoryOnly: true, autoload: true });

export default db;
