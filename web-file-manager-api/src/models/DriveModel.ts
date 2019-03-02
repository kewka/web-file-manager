import njds, { IDriveDetail } from 'nodejs-disks';
import CryptoJS from 'crypto-js';
import convertToBytes from '@/utils/convertToBytes';

const getDrivesList = () => new Promise<string[]>((resolve, reject) => {
    njds.drives((err, items) => {
        if (err) {
            reject(err);
        } else {
            resolve(items);
        }
    });
});

const getDrivesDetails = (list: string[]) => new Promise<IDriveDetail[]>((resolve, reject) => {
    njds.drivesDetail(list, (err, details) => {
        if (err) {
            reject(err);
        } else {
            resolve(details);
        }
    });
});

/**
 * Describes the drive model.
 */
export default class DriveModel {
    public static async getDrives(): Promise<DriveModel[]> {
        const excludedDrives = ['tmpfs']; // exclude temporary storages
        const list = (await getDrivesList()).filter((drive) => !excludedDrives.includes(drive));
        const details = await getDrivesDetails(list);
        const drives = details.map((detail) => new DriveModel(detail));
        return drives;
    }

    /**
     * The drive ID.
     * Equals to the call md5(drive.label).
     */
    public readonly id: string;
    /**
     * The drive label.
     */
    public readonly label: string;
    /**
     * The drive mount path.
     */
    public readonly path: string;
    /**
     * The total size of the drive, in bytes.
     */
    public readonly total: number;
    /**
     * The amount of available free space on a drive, in bytes.
     */
    public readonly available: number;

    /**
     * Initializes the drive model.
     * @param detail - The drive detail.
     */
    private constructor(detail: IDriveDetail) {
        this.id = CryptoJS.MD5(detail.drive).toString();
        this.label = detail.drive;
        this.path = detail.mountpoint;
        this.total = convertToBytes(detail.total);
        this.available = convertToBytes(detail.available);
    }
}
