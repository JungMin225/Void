// src/components/TermsSection.jsx
import React, { useEffect, useMemo, useRef } from "react";
import "./TermsSection.css";

import UnionFrame from "../assets/images/Union.png";
import MainImage from "../assets/images/main.png";

function getScrollParent(el) {
  let node = el?.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const isScrollable =
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight;

    if (isScrollable) return node;
    node = node.parentElement;
  }
  return window;
}

export default function TermsSection() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const frameRef = useRef(null);
  const mainImgRef = useRef(null);

  const termRefs = useRef([]);

  const rafRef = useRef(0);

  const ease = (t) => t * t * (3 - 2 * t);
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  const TERMS = useMemo(
    () => [
      {
        id: "t1",
        title: "무상(無常)",
        body:
          "모든 것은 변한다는 뜻입니다. 순간을 붙잡기보다 변화 속에서 균형을 찾는 태도를 말합니다.",
        side: "right",
        pos: "rt",
      },
      {
        id: "t2",
        title: "연기(緣起)",
        body:
          "모든 존재는 원인과 조건이 모여 이루어집니다. 관계를 이해하면 감정도 사건도 다르게 보입니다.",
        side: "right",
        pos: "rm",
      },
      {
        id: "t3",
        title: "중도(中道)",
        body:
          "치우침 없이 바라보는 길입니다. 극단을 피하고 현재의 선택을 더 정확하게 조율하게 합니다.",
        side: "right",
        pos: "rb",
      },
      {
        id: "t4",
        title: "자비(慈悲)",
        body:
          "나와 타인에게 동시에 따뜻해지는 마음입니다. 판단보다 이해를 먼저 두는 실천을 뜻합니다.",
        side: "left",
        pos: "lb",
      },
      {
        id: "t5",
        title: "정념(正念)",
        body:
          "지금 이 순간을 또렷하게 알아차리는 힘입니다. 생각의 소음이 줄어들수록 삶이 선명해집니다.",
        side: "left",
        pos: "lm",
      },
      {
        id: "t6",
        title: "공(空)",
        body:
          "고정된 실체가 없다는 통찰입니다. 집착이 약해질수록 마음의 공간은 넓어집니다.",
        side: "left",
        pos: "lt",
      },
    ],
    []
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const left = leftLineRef.current;
    const right = rightLineRef.current;
    const frame = frameRef.current;
    const mainImg = mainImgRef.current;

    if (!wrap || !stage || !left || !right || !frame || !mainImg) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const FADE_PORTION = 0.22;
    const SCALE_FROM = 1.1;
    const SCALE_TO = 0.5;

    const PHASE1_END = 0.2;

    const applyPhase1 = (overall) => {
      const fadeRaw = overall / FADE_PORTION;
      const fadeP = clamp01(fadeRaw);

      const motionRaw = (overall - FADE_PORTION) / (1 - FADE_PORTION);
      const motionP = clamp01(motionRaw);

      const eFade = ease(fadeP);
      const eMotion = ease(motionP);

      // 1) 스테이지 페이드
      stage.style.opacity = `${eFade}`;

      // 2) 선 연결
      left.style.transform = `scaleX(${eMotion})`;
      right.style.transform = `scaleX(${eMotion})`;

      // 3) union 프레임 스케일
      const frameScale = SCALE_FROM + (SCALE_TO - SCALE_FROM) * eMotion;
      frame.style.transform = `translate(-50%, -50%) scale(${frameScale})`;

      // 4) 메인 이미지 흑백 -> 컬러
      const colorP = eMotion;
      const gray = 1 - colorP;
      mainImg.style.filter = `grayscale(${gray}) saturate(${0.7 + 0.3 * colorP})`;
    };

    const applyPhase2 = (overall) => {
      const nodes = termRefs.current;
      if (!nodes?.length) return;

      const textP = clamp01((overall - PHASE1_END) / (1 - PHASE1_END));
      const eText = ease(textP);

      const count = TERMS.length;
      const step = 1 / count;

      for (let i = 0; i < count; i++) {
        const el = nodes[i];
        if (!el) continue;

        const localRaw = (eText - i * step) / step;
        const local = clamp01(localRaw);
        const easedLocal = ease(local);

        const dir = TERMS[i].side === "left" ? 1 : -1;

        const distance = 28;

        el.style.opacity = `${easedLocal}`;

        el.style.transform = `translateX(${dir * (1 - easedLocal) * distance}px)`;
      }
    };

    const setPhase2Off = () => {
      const nodes = termRefs.current;
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        if (!el) continue;
        el.style.opacity = "0";
        el.style.transform = "translateX(0px)";
      }
    };

    const update = () => {
      rafRef.current = 0;

      if (prefersReduced) {
        stage.style.opacity = "1";
        left.style.transform = "scaleX(1)";
        right.style.transform = "scaleX(1)";
        frame.style.transform = "translate(-50%, -50%) scale(1)";
        mainImg.style.filter = "grayscale(0) saturate(1)";

        const nodes = termRefs.current;
        for (let i = 0; i < nodes.length; i++) {
          if (!nodes[i]) continue;
          nodes[i].style.opacity = "1";
          nodes[i].style.transform = "translateX(0px)";
        }
        return;
      }

      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh * 0.95;
      const end = vh * 0.05;

      const raw = (start - rect.top) / (start - end);
      const overall = clamp01(raw);

      applyPhase1(overall);

      if (overall < PHASE1_END) {
        setPhase2Off();
      } else {
        applyPhase2(overall);
      }
    };

    const onScrollOrResize = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    const scroller = getScrollParent(wrap);

    update();

    if (scroller === window) {
      window.addEventListener("scroll", onScrollOrResize, { passive: true });
    } else {
      scroller.addEventListener("scroll", onScrollOrResize, { passive: true });
    }
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (scroller === window) {
        window.removeEventListener("scroll", onScrollOrResize);
      } else {
        scroller.removeEventListener("scroll", onScrollOrResize);
      }
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [TERMS]);

  const setTermRef = (el) => {
    if (el && !termRefs.current.includes(el)) {
      termRefs.current.push(el);
    }
  };

  return (
    <section ref={wrapRef} className="terms-section">
      <div ref={stageRef} className="terms-stage">
        <div ref={leftLineRef} className="terms-line terms-line--left" />
        <div ref={rightLineRef} className="terms-line terms-line--right" />

        <div ref={frameRef} className="terms-frame">
          <img
            src={UnionFrame}
            alt=""
            className="terms-frame__img"
            draggable="false"
          />
        </div>

        <div className="terms-circle-holder">
          <div className="terms-circle" />
          <img
            ref={mainImgRef}
            src={MainImage}
            alt=""
            className="terms-main-img"
            draggable="false"
          />
        </div>

        <div className="terms-text-layer">
          {TERMS.map((t) => (
            <article
              key={t.id}
              ref={setTermRef}
              className={`terms-term-set side-${t.side} pos-${t.pos}`}
            >
              <h3 className="terms-term-title">{t.title}</h3>
              <p className="terms-term-body">{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
