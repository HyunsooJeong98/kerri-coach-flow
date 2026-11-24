export type CoachStory = {
  id: string;
  quote: string;
  coach: string;
  sport?: string;
  region?: string;
  approved: boolean;
};

export type ProductUpdate = {
  id: string;
  date: string;
  version?: string;
  title: string;
  description: string;
  published: boolean;
};

// Only enter verified, approved material here. Empty collections stay hidden.
export const coachStories: CoachStory[] = [];
export const productUpdates: ProductUpdate[] = [];

export function visibleStories(stories: readonly CoachStory[]) {
  return stories.filter((story) => story.approved && story.quote.trim() && story.coach.trim()).slice(0, 3);
}

export function visibleUpdates(updates: readonly ProductUpdate[], limit?: number) {
  const published = updates
    .filter((update) => update.published && update.title.trim() && update.description.trim() && /^\d{4}-\d{2}-\d{2}$/.test(update.date) && Number.isFinite(Date.parse(update.date)))
    .sort((a, b) => b.date.localeCompare(a.date));
  return limit === undefined ? published : published.slice(0, limit);
}

export const surveySource: { audience: string; respondentCount?: number; period?: string } = {
  audience: "개인 레슨 이용자",
};