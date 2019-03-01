import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';
import FileModel from './FileModel';

/**
 * Describes the directory content.
 */
interface IDirectoryContent {
    files: FileModel[];
    directories: DirectoryModel[];
}

/**
 * Describes the directory model.
 */
export default class DirectoryModel {
    /**
     * The directory ID.
     * Equals to the call md5(directory.path).
     */
    public readonly id: string;
    /**
     * The directory name.
     */
    public readonly name: string;
    /**
     * The directory path.
     */
    public readonly path: string;
    /**
     * The directory content.
     */
    private content: IDirectoryContent;

    /**
     * Initializes the directory model.
     * @param directoryPath - The directory path.
     */
    public constructor(directoryPath: string) {
        const stats = fs.statSync(directoryPath);

        if (!stats.isDirectory()) {
            throw new Error('Invalid directory.');
        }

        const { name, dir, base } = path.parse(directoryPath);
        this.path = path.join(dir, base);
        this.id = CryptoJS.MD5(this.path).toString();
        this.name = name;
    }

    /**
     * Loads directory content.
     * @returns The directory content.
     */
    public loadContent(): IDirectoryContent {
        this.content = {
            files: [],
            directories: []
        };

        const items = fs.readdirSync(this.path);

        items.forEach((name) => {
            const fullPath = path.join(this.path, name);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                this.content.directories.push(new DirectoryModel(fullPath));
            } else if (stats.isFile()) {
                this.content.files.push(new FileModel(fullPath));
            }
        });

        return this.content;
    }
}
