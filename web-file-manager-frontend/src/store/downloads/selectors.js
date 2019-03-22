import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const downloadsSelector = state => state.downloads;

export const getDownloadsArray = createSelector(
  downloadsSelector,
  downloads => {
    const items = entityNormalize.toArray(downloads.data);
    return items.sort((a, b) => b.time - a.time);
  }
);
