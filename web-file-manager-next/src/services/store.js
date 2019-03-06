let globalStore = null;

export const registerStore = store => (globalStore = store);
export const getStore = () => globalStore;
