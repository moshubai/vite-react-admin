let hasAche = false;
// 按首字母区分划分缓存区间
const btnListCache = {};

/**
 * 获取带首字母划分的缓存
 * @returns
 */
function getBtnCodeByCache() {
  // 缓存机制
  if (hasAche) return btnListCache;

  const btnListString = localStorage.getItem("btnCode") || "[]";
  const btnList = JSON.parse(btnListString);

  for (let i = 0; i < btnList.length; i++) {
    const item = btnList[i];
    const code = item.code || "";
    const firstStr = code[0];

    if (!firstStr) continue;

    if (btnListCache[firstStr]) {
      btnListCache[firstStr].push(item.code);
    } else {
      btnListCache[firstStr] = [item.code];
    }
  }

  hasAche = true;

  return btnListCache;
}

/**
 * 是否有权限
 * @param {*} code
 * @returns
 */
export function hasAuth(code = "") {
  const btnList = getBtnCodeByCache();
  const firstStr = code[0];

  if (!code || !btnList[firstStr]) return false;

  return btnList[firstStr].includes(code);
}
