const test = require('node:test');
const assert = require('node:assert/strict');

const {
  createGameRound,
  togglePlayerCard,
  canRevealAnswers,
  revealAnswers,
  resetForNextRound,
} = require('../utils/game');

test('createGameRound assigns exactly one undercover and matching common words', () => {
  const round = createGameRound({
    playerCount: 6,
    categoryId: 'mixed',
    random: () => 0,
  });

  assert.equal(round.players.length, 6);
  assert.equal(round.players.filter((player) => player.isUndercover).length, 1);
  assert.equal(round.players[0].label, '玩家 1');
  assert.equal(round.answer.commonWord, '苹果');
  assert.equal(round.answer.commonPinyin, 'píng guǒ');
  assert.equal(round.answer.undercoverWord, '梨');
  assert.equal(round.answer.undercoverPinyin, 'lí');
});

test('togglePlayerCard opens one card at a time and marks viewed on close', () => {
  const round = createGameRound({
    playerCount: 3,
    categoryId: 'animals',
    random: () => 0,
  });

  const opened = togglePlayerCard(round.players, 1);
  assert.equal(opened.find((player) => player.id === 1).isOpen, true);

  const blocked = togglePlayerCard(opened, 2);
  assert.equal(blocked.find((player) => player.id === 1).isOpen, true);
  assert.equal(blocked.find((player) => player.id === 2).isOpen, false);

  const closed = togglePlayerCard(opened, 1);
  assert.equal(closed.find((player) => player.id === 1).isOpen, false);
  assert.equal(closed.find((player) => player.id === 1).hasViewed, true);

  const viewedBlocked = togglePlayerCard(closed, 1);
  assert.equal(viewedBlocked.find((player) => player.id === 1).isOpen, false);
});

test('revealAnswers stays locked until every player has viewed their card', () => {
  const round = createGameRound({
    playerCount: 3,
    categoryId: 'fairy',
    random: () => 0,
  });

  assert.equal(canRevealAnswers(round.players), false);
  assert.throws(() => revealAnswers(round), /cannot reveal/i);

  const viewedPlayers = round.players.map((player) => ({
    ...player,
    hasViewed: true,
  }));
  const revealed = revealAnswers({ ...round, players: viewedPlayers });

  assert.equal(revealed.gamePhase, 'revealed');
  assert.equal(revealed.revealSummary.commonWord, revealed.answer.commonWord);
  assert.equal(revealed.revealSummary.undercoverWord, revealed.answer.undercoverWord);
  assert.match(revealed.revealSummary.undercoverLabel, /^玩家 \d+$/);
});

test('resetForNextRound keeps setup values but reinitializes player states', () => {
  const round = createGameRound({
    playerCount: 4,
    categoryId: 'mixed',
    random: () => 0,
  });

  const nextRound = resetForNextRound(round, () => 0.5);

  assert.equal(nextRound.playerCount, 4);
  assert.equal(nextRound.categoryId, 'mixed');
  assert.equal(nextRound.gamePhase, 'playing');
  assert.equal(
    nextRound.players.every((player) => !player.hasViewed && !player.isOpen),
    true
  );
});
