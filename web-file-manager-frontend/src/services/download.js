import config from '~/config';

function startDownloading(url) {
  var link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'download');
  link.click();
  return link;
}

export function downloadDirectory(directoryPath) {
  const url = `${config.downloadPath}/directory?directoryPath=${directoryPath}`;
  return startDownloading(url);
}

export function downloadFile(filePath) {
  const url = `${config.downloadPath}/file?filePath=${filePath}`;
  return startDownloading(url);
}
