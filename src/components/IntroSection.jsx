// src/components/IntroSection.jsx
import React, { useEffect, useRef, useState } from 'react';

function IntroSection() {
  const rootRef = useRef(null);
  const [cellSize, setCellSize] = useState(140);
  const [gridCell, setGridCell] = useState({ x: null, y: null });

  useEffect(() => {
    if (!rootRef.current) return;
    const value = getComputedStyle(rootRef.current)
      .getPropertyValue('--grid-cell-size')
      .trim();
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed)) setCellSize(parsed);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellX = Math.floor(x / cellSize) * cellSize;
    const cellY = Math.floor(y / cellSize) * cellSize;

    setGridCell((prev) =>
      prev.x === cellX && prev.y === cellY ? prev : { x: cellX, y: cellY }
    );
  };

  const handleMouseLeave = () => setGridCell({ x: null, y: null });

  return (
    <div
      className="intro-root"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="intro-orbit intro-orbit-left">
        <svg
          className="intro-orbit-svg intro-orbit-svg-main"
          viewBox="0 0 200 240"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="bluePetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78dcff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00559a" stopOpacity="0.95" />
            </linearGradient>

            <path
              id="blue-petal-path"
              d="M100,120 C 95,105 88,90 100,70 C 112,90 105,105 100,120 Z"
            />
          </defs>

          <circle
            className="ripple-circle ripple-circle-1"
            cx="100"
            cy="120"
            r="60"
          />
          <circle
            className="ripple-circle ripple-circle-2"
            cx="100"
            cy="120"
            r="60"
          />
          <circle
            className="ripple-circle ripple-circle-3"
            cx="100"
            cy="120"
            r="60"
          />

          <circle
            className="orbit-ring orbit-ring-main"
            cx="100"
            cy="120"
            r="95"
          />

          <g className="intro-flower-svg intro-flower-svg-main">
            {Array.from({ length: 8 }).map((_, i) => (
              <use
                key={i}
                href="#blue-petal-path"
                className="intro-petal-svg intro-petal-svg-main"
                fill="url(#bluePetal)"
                transform={`rotate(${i * 45} 100 120)`} // 중심 (100,120) 기준 45도씩
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="intro-center">
        <h1 className="intro-logo">VØID</h1>
        <p className="intro-sub">내 마음이 평화를 만드는 원천</p>
      </div>

      <div className="intro-orbit intro-orbit-right">
        <svg
          className="intro-orbit-svg intro-orbit-svg-sub"
          viewBox="0 0 200 240"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="pinkPetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe6f5" />
              <stop offset="55%" stopColor="#ffbde3" />
              <stop offset="100%" stopColor="#ff87c7" />
            </linearGradient>

            <path
              id="pink-petal-path"
              d="M100,120 C 95,105 88,90 100,70 C 112,90 105,105 100,120 Z"
            />
          </defs>

          <g className="intro-flower-svg intro-flower-svg-sub">
            {Array.from({ length: 8 }).map((_, i) => (
              <use
                key={i}
                href="#pink-petal-path"
                className="intro-petal-svg intro-petal-svg-sub"
                fill="url(#pinkPetal)"
                transform={`rotate(${i * 45} 100 120)`} // 동일하게 (100,120) 중심
              />
            ))}
          </g>
        </svg>
      </div>

      <button className="intro-sound-pill">
        <span className="intro-sound-dot" />
        <span>소리</span>
      </button>

      {gridCell.x !== null && (
        <div
          className="grid-orbit-wrapper"
          style={{ left: `${gridCell.x}px`, top: `${gridCell.y}px` }}
        >
          <div className="grid-orbit-path">
            <span className="grid-orbit-dot grid-orbit-dot--main" />
            <span className="grid-orbit-dot grid-orbit-dot--echo echo-1" />
            <span className="grid-orbit-dot grid-orbit-dot--echo echo-2" />
            <span className="grid-orbit-dot grid-orbit-dot--echo echo-3" />
            <span className="grid-orbit-dot grid-orbit-dot--echo echo-4" />
          </div>
        </div>
      )}
    </div>
  );
}

export default IntroSection;
