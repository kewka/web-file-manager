export function driveDetail(drive: string, callback: any): void;
export function drives(callback: (err: Error, items: string[]) => any): void;
export function drivesDetail(drives: string[], callback: (err: Error, details: IDriveDetail[]) => any): void;
export interface IDriveDetail {
    used: string,
    available: string,
    mountpoint: string,
    freePer: string,
    usedPer: string,
    total: string,
    drive: string
}