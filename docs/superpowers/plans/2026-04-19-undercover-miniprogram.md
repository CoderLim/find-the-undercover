# Undercover Mini Program Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a native WeChat mini program for the first playable version of "Who Is the Undercover" with setup, card reveal, and answer reveal flows.

**Architecture:** Use a single page `pages/index/index` as the state container, with native mini program custom components for setup, card grid, and reveal sections. Keep game rules in a pure CommonJS utility module so it can be verified with `node --test` independently from the mini program runtime.

**Tech Stack:** Native WeChat mini program (`WXML`, `WXSS`, `JS`, `JSON`), Node built-in test runner, no third-party dependencies.

---

### Task 1: Create Project Skeleton And Failing Game Logic Tests

**Files:**
- Create: `package.json`
- Create: `app.js`
- Create: `app.json`
- Create: `app.wxss`
- Create: `project.config.json`
- Create: `sitemap.json`
- Create: `data/word-bank.js`
- Create: `utils/game.js`
- Test: `tests/game.test.js`

- [ ] **Step 1: Write the failing tests for game setup and transitions**

```js
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
  assert.equal(round.answer.commonWord, '苹果');
  assert.equal(round.answer.undercoverWord, '梨');
});

test('togglePlayerCard opens one card at a time and marks viewed on close', () => {
  const round = createGameRound({
    playerCount: 3,
    categoryId: 'music',
    random: () => 0,
  });

  const opened = togglePlayerCard(round.players, 1);
  assert.equal(opened.find((player) => player.id === 1).isOpen, true);

  const blocked = togglePlayerCard(opened, 2);
  assert.equal(blocked.find((player) => player.id === 2).isOpen, false);

  const closed = togglePlayerCard(opened, 1);
  assert.equal(closed.find((player) => player.id === 1).isOpen, false);
  assert.equal(closed.find((player) => player.id === 1).hasViewed, true);
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
  assert.match(revealed.revealSummary.undercoverLabel, /玩家/);
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
  assert.equal(nextRound.players.every((player) => !player.hasViewed && !player.isOpen), true);
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `node --test tests/game.test.js`
Expected: FAIL with module or export errors from `utils/game.js`

- [ ] **Step 3: Create the project skeleton and minimal data module**

```js
// data/word-bank.js
const WORD_BANK = [
  {
    id: 'mixed',
    name: '大杂烩',
    pairs: [
      {
        commonWord: '苹果',
        commonPinyin: 'ping guo',
        undercoverWord: '梨',
        undercoverPinyin: 'li',
      },
    ],
  },
];

module.exports = {
  WORD_BANK,
};
```

- [ ] **Step 4: Implement the minimal game utility module to make tests pass**

```js
const { WORD_BANK } = require('../data/word-bank');

function createGameRound() {}
function togglePlayerCard() {}
function canRevealAnswers() {}
function revealAnswers() {}
function resetForNextRound() {}

module.exports = {
  createGameRound,
  togglePlayerCard,
  canRevealAnswers,
  revealAnswers,
  resetForNextRound,
};
```

- [ ] **Step 5: Re-run the game tests**

Run: `node --test tests/game.test.js`
Expected: PASS

### Task 2: Build The Single-Page Mini Program UI

**Files:**
- Create: `pages/index/index.js`
- Create: `pages/index/index.json`
- Create: `pages/index/index.wxml`
- Create: `pages/index/index.wxss`
- Create: `components/setup-panel/index.js`
- Create: `components/setup-panel/index.json`
- Create: `components/setup-panel/index.wxml`
- Create: `components/setup-panel/index.wxss`
- Create: `components/player-card-grid/index.js`
- Create: `components/player-card-grid/index.json`
- Create: `components/player-card-grid/index.wxml`
- Create: `components/player-card-grid/index.wxss`
- Create: `components/reveal-panel/index.js`
- Create: `components/reveal-panel/index.json`
- Create: `components/reveal-panel/index.wxml`
- Create: `components/reveal-panel/index.wxss`

- [ ] **Step 1: Create the page shell and component registration**

```json
{
  "usingComponents": {
    "setup-panel": "/components/setup-panel/index",
    "player-card-grid": "/components/player-card-grid/index",
    "reveal-panel": "/components/reveal-panel/index"
  },
  "navigationBarTitleText": "谁是卧底"
}
```

- [ ] **Step 2: Implement the setup panel with player count and category selection**

```xml
<view class="setup-panel">
  <view class="section-title">开局设置</view>
  <view class="count-grid">
    <block wx:for="{{playerCountOptions}}" wx:key="*this">
      <button data-value="{{item}}" bindtap="onSelectCount">{{item}} 人</button>
    </block>
  </view>
</view>
```

- [ ] **Step 3: Implement the card grid with locked single-card reveal behavior**

```xml
<view class="card-grid">
  <block wx:for="{{players}}" wx:key="id">
    <view class="player-card" data-player-id="{{item.id}}" bindtap="onCardTap">
      <view wx:if="{{item.isOpen}}">{{item.word}}</view>
      <view wx:else>{{item.label}}</view>
    </view>
  </block>
</view>
```

- [ ] **Step 4: Implement the reveal panel and round action buttons**

```xml
<view class="reveal-panel">
  <button bindtap="onReveal" disabled="{{!canReveal}}">揭开谜底</button>
  <button bindtap="onNextRound">再来一局</button>
  <button bindtap="onReset">重新设置</button>
</view>
```

- [ ] **Step 5: Wire page state transitions to the shared game utility functions**

```js
Page({
  data: {
    playerCount: 3,
    categoryId: 'mixed',
    categories: [],
    gamePhase: 'setup',
    players: [],
    answer: null,
    undercoverPlayerId: null,
    revealSummary: null,
  },
});
```

### Task 3: Polish Styling And Verify The Flow

**Files:**
- Modify: `app.wxss`
- Modify: `pages/index/index.wxss`
- Modify: `components/setup-panel/index.wxss`
- Modify: `components/player-card-grid/index.wxss`
- Modify: `components/reveal-panel/index.wxss`
- Modify: `data/word-bank.js`

- [ ] **Step 1: Expand the built-in categories with enough playable word pairs**

```js
{
  id: 'music',
  name: '音乐',
  pairs: [
    {
      commonWord: '吉他',
      commonPinyin: 'ji ta',
      undercoverWord: '贝斯',
      undercoverPinyin: 'bei si',
    },
  ],
}
```

- [ ] **Step 2: Apply a cohesive light arcade visual style across the page and components**

```css
page {
  background: linear-gradient(180deg, #fff7e8 0%, #ffe2b8 100%);
  color: #2c1a0f;
}
```

- [ ] **Step 3: Run the automated tests again**

Run: `node --test tests/game.test.js`
Expected: PASS

- [ ] **Step 4: Run a lightweight project sanity check**

Run: `node -e "require('./utils/game'); console.log('ok')"`
Expected: `ok`

- [ ] **Step 5: Prepare the work summary**

```txt
Summarize created files, tested commands, and any remaining manual verification for WeChat DevTools.
```
