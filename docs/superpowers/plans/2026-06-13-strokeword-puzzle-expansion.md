# 添笔成词题库扩充 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增 50 道不重复的添笔成词题，并验证 104 道题可随机无重复地完成一轮。

**Architecture:** 题目继续保存在 `data/puzzles.js` 的静态数组中，不改变页面调用接口。复用 `pickFromPool` 的未使用索引池，通过数据校验测试保护题库格式、数量和唯一性。

**Tech Stack:** JavaScript、Node.js 内置测试框架、微信小程序本地存储

---

### Task 1: 添加题库和抽题回归测试

**Files:**
- Create: `tests/puzzles.test.js`
- Modify: `tests/used-picker.test.js`

- [x] **Step 1: 写入题库数量、结构、拼词和唯一性测试**
- [x] **Step 2: 写入完整抽取一轮无重复测试**
- [x] **Step 3: 运行 `npm test`，确认题库数量测试以 54 不等于 104 失败**

### Task 2: 新增 50 道题

**Files:**
- Modify: `data/puzzles.js`

- [x] **Step 1: 加入 50 道符合 1 至 3 笔规则的新题**
- [x] **Step 2: 运行 `npm test`，确认题库校验和抽题测试通过**

### Task 3: 更新项目说明并完成验证

**Files:**
- Modify: `README.md`

- [x] **Step 1: 将 54 道和 54 题轮转更新为 104**
- [x] **Step 2: 运行 `npm test`**
- [x] **Step 3: 检查 `git diff --check` 和最终差异**
