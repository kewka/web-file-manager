import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';

/**
 * Describes the file model.
 */
export default class FileModel {
    /**
     * The file ID.
     * Equals to the call md5(file.path).
     */
    public readonly id: string;
    /**
     * The file name.
     */
    public readonly name: string;
    /**
     * The file extension.
     */
    public readonly ext: string;
    /**
     * The file path.
     */
    public readonly path: string;
    /**
     * The file size in bytes.
     */
    public readonly size: number;

    /**
     * Initializes the file model.
     * @param filePath - The file path.
     */
    public constructor(filePath: string) {
        const stats = fs.statSync(filePath);

        if (!stats.isFile()) {
            throw new Error('Invalid file.');
        }

        const { name, dir, ext, base } = path.parse(filePath);
        this.path = path.join(dir, base);
        this.id = CryptoJS.MD5(this.path).toString();
        this.name = name;
        this.ext = ext;
        this.size = stats.size;
    }
}
