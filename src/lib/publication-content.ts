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
export const productUpdates: ProductUpdate[] = [
  {
    id: "v1.2.0",
    date: "2026-11-21",
    version: "1.2.0",
    title: "결제·회원 관리와 AI 레슨 기록 화면 개선",
    description:
      "• 결제 및 구독 연동 안정화\n• 회원 상세 화면 개선 (결제 수정, 출석 회차 수정)\n• AI 레슨 기록 화면 디자인 개선\n• 버그 수정 및 성능 향상",
    published: true,
  },
];

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