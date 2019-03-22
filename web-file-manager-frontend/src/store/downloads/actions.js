import {
  ADD_DOWNLOAD_ITEM,
  REMOVE_DOWNLOAD_ITEM,
  CLEAR_DOWNLOADS
} from './constants';
import uuid from 'uuid';

export function addDownload(item) {
  const time = Date.now();
  const downloadId = uuid.v4();
  return {
    type: ADD_DOWNLOAD_ITEM,
    item: {
      ...item,
      downloadId,
      time,
      type: item.ext !== undefined ? 'file' : 'directory'
    }
  };
}

export function removeDownload(downloadId) {
  return {
    type: REMOVE_DOWNLOAD_ITEM,
    downloadId
  };
}

export function clearDownloads() {
  return {
    type: CLEAR_DOWNLOADS
  };
}
