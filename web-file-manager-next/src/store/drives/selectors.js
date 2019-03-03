import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const drivesSelector = state => state.drives;

export const getDrivesArray = createSelector(
  drivesSelector,
  drives => entityNormalize.toArray(drives.data)
);
