export function toObject(items, key) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: item
    }),
    {}
  );
}

export function toArray(data) {
  return Object.values(data);
}
