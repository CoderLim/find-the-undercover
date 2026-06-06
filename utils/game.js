const { findCategoryById } = require('../data/word-bank');
const { pickFromPool } = require('./used-picker');

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 12;

function assertValidPlayerCount(playerCount) {
  if (!Number.isInteger(playerCount) || playerCount < MIN_PLAYERS || playerCount > MAX_PLAYERS) {
    throw new Error(`playerCount must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`);
  }
}

function assertCategory(categoryId) {
  const category = findCategoryById(categoryId);

  if (!category || !Array.isArray(category.pairs) || category.pairs.length === 0) {
    throw new Error(`category "${categoryId}" is unavailable`);
  }

  return category;
}

function pickRandomIndex(length, random) {
  return Math.floor(random() * length);
}

function createPlayers(playerCount, answer, undercoverIndex) {
  return Array.from({ length: playerCount }, (_, index) => {
    const id = index + 1;
    const isUndercover = index === undercoverIndex;

    return {
      id,
      label: `玩家 ${id}`,
      word: isUndercover ? answer.undercoverWord : answer.commonWord,
      pinyin: isUndercover ? answer.undercoverPinyin : answer.commonPinyin,
      isUndercover,
      hasViewed: false,
      isOpen: false,
    };
  });
}

function createGameRound({
  playerCount,
  categoryId,
  random = Math.random,
  usedPairIndices = [],
}) {
  assertValidPlayerCount(playerCount);
  const category = assertCategory(categoryId);
  const { index: pairIndex, usedIndices: nextUsedPairIndices } = pickFromPool(
    category.pairs.length,
    usedPairIndices,
    random,
  );
  const pair = category.pairs[pairIndex];
  const undercoverIndex = pickRandomIndex(playerCount, random);
  const players = createPlayers(playerCount, pair, undercoverIndex);

  return {
    playerCount,
    categoryId,
    gamePhase: 'playing',
    players,
    answer: {
      commonWord: pair.commonWord,
      commonPinyin: pair.commonPinyin,
      undercoverWord: pair.undercoverWord,
      undercoverPinyin: pair.undercoverPinyin,
    },
    undercoverPlayerId: undercoverIndex + 1,
    revealSummary: null,
    usedPairIndices: nextUsedPairIndices,
  };
}

function togglePlayerCard(players, playerId) {
  const target = players.find((player) => player.id === playerId);

  if (!target || target.hasViewed) {
    return players;
  }

  const openedPlayer = players.find((player) => player.isOpen);

  if (openedPlayer && openedPlayer.id !== playerId) {
    return players;
  }

  return players.map((player) => {
    if (player.id !== playerId) {
      return player;
    }

    if (player.isOpen) {
      return {
        ...player,
        isOpen: false,
        hasViewed: true,
      };
    }

    return {
      ...player,
      isOpen: true,
    };
  });
}

function canRevealAnswers(players) {
  return players.length > 0 && players.every((player) => player.hasViewed);
}

function revealAnswers(round) {
  if (!canRevealAnswers(round.players)) {
    throw new Error('cannot reveal answers before all players have viewed');
  }

  const undercoverPlayer = round.players.find((player) => player.isUndercover);

  return {
    ...round,
    gamePhase: 'revealed',
    revealSummary: {
      commonWord: round.answer.commonWord,
      commonPinyin: round.answer.commonPinyin,
      undercoverWord: round.answer.undercoverWord,
      undercoverPinyin: round.answer.undercoverPinyin,
      undercoverLabel: undercoverPlayer ? undercoverPlayer.label : '',
    },
  };
}

function resetForNextRound(round, random = Math.random) {
  return createGameRound({
    playerCount: round.playerCount,
    categoryId: round.categoryId,
    random,
    usedPairIndices: round.usedPairIndices || [],
  });
}

module.exports = {
  MIN_PLAYERS,
  MAX_PLAYERS,
  createGameRound,
  togglePlayerCard,
  canRevealAnswers,
  revealAnswers,
  resetForNextRound,
};
