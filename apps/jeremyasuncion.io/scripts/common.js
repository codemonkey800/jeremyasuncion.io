import path from 'path';

export const dev = process.env.NODE_ENV !== 'production';

export const resolve = path.resolve.bind(null, __dirname, '..');

