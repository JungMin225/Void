// src/components/MonkTalkSection.jsx
import React, { useMemo, useRef, useEffect } from "react";
import "./MonkTalkSection.css";
import hoverSfx from "../assets/sfx/cut.wav"; // 경로 맞춰주세요

const SAMPLE_TEXT =
  "행복할 때는 행복에 매달리지 말라. 불행할 때는 이를 그냥 받아들이라. 그러면서 자신의 삶을 순간순간 지켜보라. 맑은 정신으로 지켜보라.";

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

  const cards = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      id: `monk-talk-card-${i + 1}`,
      speaker: "OO 스님",
      text: SAMPLE_TEXT,
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
                onPointerEnter={playHover} // hover 느낌 + 터치 환경도 안전
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
