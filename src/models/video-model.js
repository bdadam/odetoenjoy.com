import { merge, pick } from 'lodash';
import uuid from 'uuid/v1';
import db from '../databases/videodb';

console.log(db.inMemoryOnly);

export const create = (data) => new Promise((resolve, reject) => {
    const obj = merge(pick(data, ['title', 'description']), { _id: uuid(), createdAd: Date.now() });
    db.insert(obj, (err, doc) => {
        if (err) { return reject(err); }
        resolve(doc);
    });
});

export const all = () => new Promise((resolve, reject) => {
    db.find().exec((err, docs) => {
        if (err) { return reject(err); }
        resolve(docs);        
    });
});

export default { create, all };
