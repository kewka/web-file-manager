import config from '~/config';

export default function getExplorerPath(pathname, query = {}) {
  if (pathname !== config.explorerPath) {
    return '';
  }

  return query.path || '';
}
