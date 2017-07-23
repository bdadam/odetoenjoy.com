import path from 'path';
import Datastore from 'nedb';

const dbpath = path.resolve(process.cwd(), './data/test.nedb');
const db = new Datastore({ filename: dbpath, autoload: true });

export default db;
