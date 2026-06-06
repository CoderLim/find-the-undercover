function pickFromPool(poolSize, usedIndices = [], random = Math.random) {
  if (!poolSize) {
    return { index: -1, usedIndices };
  }

  let available = [];
  for (let i = 0; i < poolSize; i += 1) {
    if (!usedIndices.includes(i)) {
      available.push(i);
    }
  }

  let nextUsed = usedIndices;
  if (!available.length) {
    nextUsed = [];
    available = Array.from({ length: poolSize }, (_, i) => i);
  }

  const index = available[Math.floor(random() * available.length)];
  return { index, usedIndices: [...nextUsed, index] };
}

module.exports = {
  pickFromPool,
};
