import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

/**
 * @description 获取原始类型
 * @param {*} value
 * @returns {String} 类型字符串，如'String', 'Object', 'Null', 'Boolean', 'Number', 'Array'
 */
export function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
// 去掉 "", undefined, null, "all"
export function clearEmptyParam(params) {
  let newParams = _.cloneDeep(params);
  if (newParams) {
    const keys = Object.keys(newParams);
    if (keys.length) {
      keys.forEach((key) => {
        const rawType = toRawType(newParams);
        if ([undefined, null, 'all'].includes(newParams[key]) && ['Object'].includes(rawType)) {
          newParams[key] = '';
        }
      });
    }
  }
  return newParams;
}

export const useQueryForm = (name, params, API) => {
  let newParams = clearEmptyParam(...params);
  console.log('name', name);
  return useQuery(
    [name],
    async () => {
      const data = await API(newParams);
      return data;
    },
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0, // 出错后不重试
    },
  );
};
