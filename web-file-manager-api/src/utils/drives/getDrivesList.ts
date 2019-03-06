import njds from 'nodejs-disks';

const EXCLUDED_DRIVES = ['tmpfs']; // temporary storages

export default function getDrivesList() {
    return new Promise<string[]>((resolve, reject) => {
        njds.drives((err, items) => {
            if (err) {
                reject(err);
            } else {
                const list = items.filter((item) => !EXCLUDED_DRIVES.includes(item));
                resolve(list);
            }
        });
    });
}
