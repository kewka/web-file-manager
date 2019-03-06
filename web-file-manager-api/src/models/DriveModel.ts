import { IDriveDetail } from 'nodejs-disks';
import CryptoJS from 'crypto-js';
import convertSizeToBytes from '@/utils/common/convertSizeToBytes';
import getDrivesList from '@/utils/drives/getDrivesList';
import getDrivesDetails from '@/utils/drives/getDrivesDetails';

/**
 * Describes the drive model.
 */
export default class DriveModel {
    public static async getDrives(): Promise<DriveModel[]> {
        const list = await getDrivesList();
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
        this.total = convertSizeToBytes(detail.total);
        this.available = convertSizeToBytes(detail.available);
    }
}
