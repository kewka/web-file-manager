import njds, { IDriveDetail } from 'nodejs-disks';

export default function getDrivesDetails(list: string[]) {
    return new Promise<IDriveDetail[]>((resolve, reject) => {
        njds.drivesDetail(list, (err, details) => {
            if (err) {
                reject(err);
            } else {
                resolve(details);
            }
        });
    });
}
