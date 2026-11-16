import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, ClipboardList, FileText, Mic, Pause, Play, RotateCcw, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import coachIcon from "@/assets/coach-app-icon.png.asset.json";
import memberIcon from "@/assets/member-app-icon.png.asset.json";

/** Progressive enhancement: no content is hidden before JavaScript runs. */
export function HomeMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined" || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lightweight = Boolean(device.connection?.saveData || (device.deviceMemory && device.deviceMemory <= 4) || navigator.hardwareConcurrency <= 4);
    root.dataset.motionQuality = lightweight ? "simple" : "full";
    const animations = new Set<Animation>();
    const animate = (el: Element, frames: Keyframe[], delay = 0) => {
      if (preference.matches) return;
      const animation = el.animate(frames, { duration: lightweight ? 240 : 520, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
    };
    root.querySelectorAll("[data-hero-enter]").forEach((el, index) => {
      animate(el, [{ opacity: 0.7, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], index * 60);
    });
    let previousScroll = window.scrollY;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      const direction = window.scrollY < previousScroll ? -1 : 1;
      previousScroll = window.scrollY;
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        const index = Number(entry.target.getAttribute("data-motion-order") || 0);
        animate(entry.target, [{ opacity: 0.65, transform: `translateY(${direction * 10}px)` }, { opacity: 1, transform: "translateY(0)" }], Math.min(index * 55, 120));
        if (!lightweight) entry.target.querySelectorAll("figure").forEach((el, i) => {
          animate(el, [{ transform: `translateY(${12 + i * 4}px) scale(0.985)` }, { transform: "translateY(0) scale(1)" }], Math.min(i * 70, 140));
        });
      }
    }, { threshold: 0, rootMargin: "0px 0px 25% 0px" });
    root.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const stop = () => { for (const animation of animations) animation.cancel(); animations.clear(); };
    const onPreference = () => { if (preference.matches) stop(); };
    preference.addEventListener("change", onPreference);
    return () => { observer.disconnect(); stop(); preference.removeEventListener("change", onPreference); };
  }, []);
  return <div ref={ref} className="kerri-motion">{children}</div>;
}

/** Finite illustrative playback, stopped offscreen, in background tabs and on reduced-motion devices. */
function useIllustration(steps: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(steps - 1);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [foreground, setForeground] = useState(true);
  const started = useRef(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const simple = Boolean(device.connection?.saveData || (device.deviceMemory && device.deviceMemory <= 4) || navigator.hardwareConcurrency <= 4);
    const change = () => { setReduced(preference.matches || simple); if (preference.matches || simple) { setPlaying(false); setPhase(steps - 1); } };
    change();
    preference.addEventListener("change", change);
    const visibility = () => setForeground(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    const el = ref.current;
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    if (el && observer) observer.observe(el);
    return () => { observer?.disconnect(); preference.removeEventListener("change", change); document.removeEventListener("visibilitychange", visibility); };
  }, [steps]);
  useEffect(() => {
    if (!visible || reduced || started.current) return;
    started.current = true;
    setPhase(0);
    setPlaying(true);
  }, [visible, reduced]);
  useEffect(() => {
    if (!playing || !visible || !foreground || reduced) return;
    if (phase >= steps - 1) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setPhase((current) => current + 1), 1800);
    return () => window.clearTimeout(timer);
  }, [playing, visible, foreground, reduced, phase, steps]);
  const replay = () => { started.current = true; setPhase(0); setPlaying(!reduced); };
  const select = (value: number) => { started.current = true; setPlaying(false); setPhase(value); };
  return { ref, phase, playing, reduced, replay, select, toggle: () => {
    started.current = true;
    if (phase >= steps - 1) { replay(); return; }
    setPlaying((current) => !current);
  } };
}

function Playback({ playing, reduced, replay, toggle }: { playing: boolean; reduced: boolean; replay: () => void; toggle: () => void }) {
  return <div className="flex shrink-0 gap-1">
    {!reduced && <Button variant="ghost" size="icon" onClick={toggle} aria-label={playing ? "예시 일시정지" : "예시 재생"} title={playing ? "예시 일시정지" : "예시 재생"}>{playing ? <Pause /> : <Play />}</Button>}
    <Button variant="ghost" size="icon" onClick={replay} aria-label="예시 다시 보기" title="예시 다시 보기"><RotateCcw /></Button>
  </div>;
}

const reportSteps = [
  { icon: Mic, title: "음성·메모", items: ["포핸드 타점 교정", "백핸드 밀어치기"] },
  { icon: Sparkles, title: "AI 레슨 기록", items: ["레슨 요약", "잘한 점", "교정 포인트", "다음 목표"] },
  { icon: ClipboardList, title: "코치 검토", items: ["레슨 요약", "잘한 점", "교정 포인트", "다음 목표"] },
  { icon: Send, title: "회원에게 전달", items: ["레슨 리포트", "다음 목표"] },
];

export function LessonFlow() {
  const demo = useIllustration(4);
  return <div ref={demo.ref} className="lesson-flow mx-auto mt-8 max-w-4xl text-primary-foreground" data-phase={demo.phase}>
    <div className="mb-4 flex items-center justify-between gap-3 border-b border-primary-foreground/15 pb-3">
      <p className="text-xs leading-5 text-primary-foreground/65">설명용 예시 · 실제 AI 처리 시간이나 상태가 아닙니다</p>
      <Playback {...demo} />
    </div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {reportSteps.map((step, index) => <div key={step.title} className={`flow-stage ${index <= demo.phase ? "is-complete" : ""} ${index === demo.phase ? "is-current" : ""}`}>
        <Button variant="ghost" onClick={() => demo.select(index)} aria-pressed={index === demo.phase} className="h-auto w-full justify-start gap-2 whitespace-normal px-0 py-2 text-sm hover:bg-transparent hover:text-primary">
          <step.icon className="shrink-0" /><span>{step.title}</span><span className="ml-auto text-xs text-primary-foreground/45">0{index + 1}</span>
        </Button>
        <div className="space-y-2 pt-2">{step.items.map((item, i) => <div key={item} className="report-fragment flex items-center gap-2 border-l-2 border-primary/50 pl-3 text-xs leading-5" data-order={i}>
          {index === 2 ? <Check size={12} className="text-primary" /> : <FileText size={12} className="text-primary-foreground/50" />}<span>{item}</span>
        </div>)}</div>
      </div>)}
    </div>
  </div>;
}

export function ManagementMotion() {
  const demo = useIllustration(3);
  const complete = demo.phase > 0;
  return <div ref={demo.ref} className="management-motion mt-5 border-y border-border py-3" data-phase={demo.phase}>
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs text-muted-foreground">익명 샘플 · 회원 A</p><Playback {...demo} />
    </div>
    <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold">테니스 레슨 <span className="font-normal text-muted-foreground">10:00</span></p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <span className={`sample-attendance ${complete ? "text-primary" : "text-muted-foreground"}`}>{complete ? "출석 완료" : "출석 예정"}</span>
          <span className="text-muted-foreground">{demo.phase === 2 ? "납부 완료" : "납부 확인 전"}</span>
        </div>
      </div>
      <div className="text-right"><p className="text-xs text-muted-foreground">남은 횟수</p><p className="mt-1 flex items-baseline justify-end gap-1 text-primary"><span key={complete ? 7 : 8} className="sample-count text-2xl font-semibold tabular-nums">{complete ? 7 : 8}</span><span className="text-xs">회</span></p></div>
    </div>
    <div className="mt-3 flex gap-1" aria-label="회원관리 예시 단계">{["일정", "출석·횟수", "납부"].map((text, index) => <Button key={text} size="sm" variant="ghost" className={`h-7 flex-1 px-1 text-xs ${demo.phase === index ? "text-primary" : "text-muted-foreground"}`} onClick={() => demo.select(index)} aria-pressed={demo.phase === index}>{text}</Button>)}</div>
  </div>;
}

export function AppConnection() {
  const demo = useIllustration(3);
  return <div ref={demo.ref} className="app-connection mx-auto mt-7 max-w-xl" data-phase={demo.phase}>
    <div className="mb-3 flex items-center justify-between gap-2"><p className="text-xs text-muted-foreground">레슨 리포트 전달 예시</p><Playback {...demo} /></div>
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-6">
      <div className="text-center"><img src={coachIcon.url} alt="케리 코치앱" loading="lazy" width={48} height={48} className="mx-auto h-12 w-12 rounded-xl" /><p className="mt-2 text-xs font-semibold">코치앱</p></div>
      <div className="relative min-w-0 border-t border-border pt-3">
        <div className={`transfer-report flex items-center justify-center gap-2 text-primary ${demo.phase >= 1 ? "is-sent" : ""}`}><FileText size={18} /><span className="text-xs font-medium">레슨 리포트</span><ArrowRight size={16} /></div>
      </div>
      <div className={`connection-member text-center ${demo.phase === 2 ? "is-received" : ""}`}><img src={memberIcon.url} alt="케리 회원앱" loading="lazy" width={48} height={48} className="mx-auto h-12 w-12 rounded-xl" /><p className="mt-2 text-xs font-semibold">회원앱</p></div>
    </div>
    <div className="mt-4 flex justify-center gap-2">{["레슨 기록", "코치 검토·전달", "회원 확인"].map((label, index) => <Button key={label} size="sm" variant="ghost" className={`h-7 px-2 text-xs ${index === demo.phase ? "text-primary" : "text-muted-foreground"}`} aria-pressed={index === demo.phase} onClick={() => demo.select(index)}>{label}</Button>)}</div>
  </div>;
}