const STORAGE_KEYS = {
  STROKEWORD_USED: 'strokeword:used_indices',
  undercoverUsed: (categoryId) => `undercover:used:${categoryId}`,
};

function getUsedIndices(key) {
  try {
    const value = wx.getStorageSync(key);
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function setUsedIndices(key, indices) {
  try {
    wx.setStorageSync(key, indices);
  } catch (error) {
    // ignore storage failures
  }
}

module.exports = {
  STORAGE_KEYS,
  getUsedIndices,
  setUsedIndices,
};
