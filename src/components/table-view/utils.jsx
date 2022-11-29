/**
 * 清空对象的 undefined 和 null
 * @param params 要清空的对象
 */
export const clearEmpty = (params) => {
  let result = {};

  for (let key in params) {
    if (params[key] === 0 || params[key]) {
      result[key] = params[key];
    }
  }
  return result;
};

/**
 * 根据行获取 rowKey，默认取 id
 * @param record 当前行
 * @param rowKey
 * @returns
 */
export const getRowKey = (record, rowKey) => {
  try {
    if (typeof rowKey === "function") {
      return rowKey(record);
    } else if (typeof rowKey === "string") {
      return rowKey;
    } else {
      return "id";
    }
  } catch {
    return "id";
  }
};

/**
 * 根据 rowKey 获取行的 key
 * @param record 当前行
 * @param rowKey
 * @returns
 */
export const getKey = (record, rowKey) => {
  return record[getRowKey(record, rowKey)];
};
