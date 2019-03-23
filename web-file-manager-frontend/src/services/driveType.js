const driveTypeMap = {
  0: 'Unknown',
  1: 'No root directory',
  2: 'Removable',
  3: 'Fixed',
  4: 'Network',
  5: 'CD or DVD-ROM',
  6: 'RAM'
};

export function getDriveType(typeValue) {
  return driveTypeMap[typeValue] || typeValue;
}

export function getDriveIcon(typeValue) {
  switch (typeValue) {
    case 2:
      return 'usb';
    case 3:
      return 'storage';
    case 4:
      return 'network_wifi';
    case 5:
      return 'album';
    case 6:
      return 'memory';
    default:
      return 'help_outline';
  }
}
