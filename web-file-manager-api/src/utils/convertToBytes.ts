function getUnitMultiplier(unit: string): number {
    switch(unit.toUpperCase()) {
        case 'BYTES':
            return 1;
        case 'KB':
            return Math.pow(1024, 1);
        case 'MB':
            return Math.pow(1024, 2);
        case 'GB':
            return Math.pow(1024, 3);
        case 'TB':
            return Math.pow(1024, 4);
        default:
            return 0;
    }
}

/**
 * Converts the string with size to bytes.
 * @param size - The string with size. Example: '1.0 GB'.
 */
export default function convertToBytes(size: string): number {
    const [ value, unit ] = size.split(' ', 2);
    return Math.floor(Number(value) * getUnitMultiplier(unit));
}