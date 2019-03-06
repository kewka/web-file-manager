import { createSelector } from 'reselect';
const directorySelector = state => state.directory;

export const getDirectoryContentItems = createSelector(
  directorySelector,
  directory => {
    const { data } = directory;
    return data ? [...data.content.directories, ...data.content.files] : [];
  }
);
