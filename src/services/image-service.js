import crypto from 'crypto';

import Jimp from 'jimp';
import uuid from 'uuid/v4';

import Image from '../models/image-model';

export const createPreviewFromUrl = (url) => new Promise((resolve, reject) => {

    Jimp.read(url).then(img => {
        img.scaleToFit(640, 480);
        // img.autocrop(null, false);
        img.quality(80);

        img.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
            if (err) { return reject(err); }

            Image.create({
                id: uuid(),
                md5: crypto.createHash('md5').update(buffer).digest('hex'),
                width: img.bitmap.width,
                height: img.bitmap.height,
                from: url,
                image: buffer
            }).then((img) => {
                resolve(img.id);
            });
        });
    });
});
