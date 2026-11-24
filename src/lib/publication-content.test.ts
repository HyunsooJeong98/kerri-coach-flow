import { test } from "node:test";
import assert from "node:assert/strict";
import { coachStories, productUpdates, visibleStories, visibleUpdates } from "./publication-content.ts";

test("home shows at most three approved coach testimonials", () => {
  const stories = Array.from({ length: 5 }, (_, i) => ({ id: String(i), quote: `Real quote ${i}`, coach: `Coach ${i}`, approved: i !== 0 }));
  const shown = visibleStories(stories);
  assert.equal(shown.length, 3);
  assert.deepEqual(shown.map((story) => story.id), ["1", "2", "3"]);
});

test("home shows only the three latest published updates", () => {
  const updates = Array.from({ length: 5 }, (_, i) => ({ id: String(i), date: `2026-11-${20 + i}`, title: `Update ${i}`, description: "Verified change", published: i !== 4 }));
  assert.deepEqual(visibleUpdates(updates, 3).map((update) => update.id), ["3", "2", "1"]);
  assert.equal(visibleUpdates(updates).length, 4);
});

test("missing verified content stays absent instead of becoming demo data", () => {
  assert.deepEqual(visibleStories(coachStories), []);
  assert.deepEqual(visibleUpdates(productUpdates), []);
});