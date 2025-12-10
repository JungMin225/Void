// src/components/MonkTalkSection.jsx
import React, { useMemo, useRef, useEffect } from "react";
import "./MonkTalkSection.css";
import hoverSfx from "../assets/sfx/cut.wav"; // 경로 맞춰주세요

const CARD_COLORS = [
  "gold",
  "mint",
  "sky",
  "blue",
  "blue-strong",
  "purple",
  "pink",
  "rose",
  "orange",
];

// ✅ 사용자 제공 인용문 데이터
const QUOTES = [
  {
    speaker: "법정스님",
    text:
      "무소유란 아무것도 갖지 않는다는 것이 아니라, 불필요한 것을 갖지 않는다는 뜻이다.",
    // source: "에세이 《무소유》",
    // ref: "talktalkhealing.tth.kr",
  },
  {
    speaker: "혜민스님",
    text:
      "좋은 인연이란 시작이 좋은 인연이 아니라 끝이 좋은 인연입니다.",
    // source: "《멈추면 비로소 보이는 것들》",
    // ref: "clsrndhqk7958.tistory.com",
  },
  {
    speaker: "법륜스님",
    text:
      "욕심을 버리면 나는 지금 이대로도 괜찮고, 애쓰고 긴장할 일도 없어진다.",
    // source: "즉문즉설 법문",
    // ref: "dreamymom.tistory.com",
  },
  {
    speaker: "성철스님",
    text: "산은 산이요, 물은 물이로다.",
    // source: "해인사 백일법문",
    // ref: "beopbo.com",
  },
  {
    speaker: "숭산스님",
    text: "마음이 행복하면 온 우주가 행복하다.",
    // source: "《부처가 부처를 묻다》",
    // ref: "bud1080.tistory.com",
  },
  {
    speaker: "현각스님",
    text: "당신은 이미 완전하다. 단지 아직 그걸 모를 뿐!",
    // source: "인터뷰 발언 (2009)",
    // ref: "ijejutoday.com",
  },
  {
    speaker: "대행스님",
    text:
      "최선을 다해 사랑하고 자비를 베풀되, 그에 대한 집착은 두지 마세요.",
    // source: "한마음선원 정기법회 법문",
    // ref: "hanmaum.org",
  },
  {
    speaker: "명성스님",
    text:
      "청정한 마음을 지니는 것은 일곱 가지 보석을 갖는 것보다 가치 있는 일입니다.",
    // source: "인터뷰 (2010)",
    // ref: "mk.co.kr",
  },
  {
    speaker: "원효대사",
    text:
      "일체유심조(一切唯心造), 모든 것은 오직 마음이 지어내는 것입니다.",
    // source: "『화엄경』 인용 전승 및 원효 관련 일화",
    // ref: "ibulgyo.com",
  },
];

export default function MonkTalkSection() {
  const audioRef = useRef(null);
  const lastPlayRef = useRef(0);

  useEffect(() => {
    const a = new Audio(hoverSfx);
    a.preload = "auto";
    a.volume = 0.35;
    audioRef.current = a;

    return () => {
      audioRef.current = null;
    };
  }, []);

  const playHover = () => {
    const a = audioRef.current;
    if (!a) return;

    const now = performance.now();
    if (now - lastPlayRef.current < 80) return;
    lastPlayRef.current = now;

    try {
      a.currentTime = 0;
      a.play();
    } catch {
      // 일부 환경에서 재생이 막힐 수 있음
    }
  };

  // ✅ 기존 cards 생성 로직을 "실데이터 기반"으로 교체
  const cards = useMemo(() => {
    return QUOTES.map((q, i) => ({
      id: `monk-talk-card-${i + 1}`,
      speaker: q.speaker,
      text: q.text,
      tone: CARD_COLORS[i] ?? "gold",
    }));
  }, []);

  return (
    <section className="dharma-page monk-talk-section">
      <div className="dharma-layout">
        <div className="dharma-content" aria-labelledby="monk-talk-title">
          <h2 id="monk-talk-title" className="sr-only">
            법문
          </h2>

          <div className="dharma-grid">
            {cards.map((c) => (
              <article
                key={c.id}
                className={`dharma-card tone-${c.tone}`}
                data-tone={c.tone}
                onPointerEnter={playHover}
              >
                <h3 className="dharma-card__speaker">{c.speaker}</h3>
                <div className="dharma-card__rule" />
                <p className="dharma-card__text">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
