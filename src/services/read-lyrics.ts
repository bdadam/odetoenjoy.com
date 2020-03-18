import fs from 'fs';

const read = async (filepath: string): Promise<{ title: string; html: string }> => {
    const raw = await fs.promises.readFile(filepath, 'utf-8');

    const [title, ...rawBody] = raw.split('\n');

    const html = rawBody
        .join('\n')
        .trim()
        .replace('\n', '<br/>');

    return { title, html };
};

export default read;
