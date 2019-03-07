import { createSelector } from 'reselect';
const directorySelector = state => state.directory;

export const getFilesArray = createSelector(
  directorySelector,
  directory => {
    const { data } = directory;
    return data ? data.content.files : [];
  }
);

export const getDirectoriesArray = createSelector(
  directorySelector,
  directory => {
    const { data } = directory;
    return data ? data.content.directories : [];
  }
);
