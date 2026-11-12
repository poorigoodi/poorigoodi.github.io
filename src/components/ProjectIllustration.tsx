import React from 'react';
import { ProjectItem } from '../data/portfolioData';

export const ProjectIllustration: React.FC<{ type: ProjectItem['svgType'] }> = ({ type }) => {
  switch (type) {
    case 'rag':
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          <rect
            x="20"
            y="25"
            width="70"
            height="90"
            rx="10"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <line x1="34" y1="48" x2="76" y2="48" stroke="#FF6B5B" strokeWidth="2" />
          <line
            x1="34"
            y1="68"
            x2="76"
            y2="68"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <line
            x1="34"
            y1="88"
            x2="64"
            y2="88"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <path d="M90 70 L 145 70" stroke="#FF6B5B" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle
            cx="170"
            cy="70"
            r="26"
            fill="#FF6B5B"
            fillOpacity="0.15"
            stroke="#FF6B5B"
            strokeWidth="1.5"
          />
          <circle cx="170" cy="70" r="8" fill="#FF6B5B" />
          <path d="M196 70 L 240 70" stroke="#FF6B5B" strokeWidth="1.5" />
          <rect
            x="240"
            y="38"
            width="60"
            height="64"
            rx="12"
            fill="#FF6B5B"
            fillOpacity="0.12"
            stroke="#FF6B5B"
            strokeWidth="1.5"
          />
          <text
            x="270"
            y="74"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="JetBrains Mono"
            fontSize="10"
            fontWeight="600"
          >
            EVAL
          </text>
        </svg>
      );

    case 'kg':
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          <line
            x1="85"
            y1="40"
            x2="160"
            y2="70"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <line
            x1="85"
            y1="105"
            x2="160"
            y2="70"
            stroke="#FF6B5B"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="70"
            x2="235"
            y2="40"
            stroke="#FF6B5B"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="70"
            x2="235"
            y2="105"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <line
            x1="85"
            y1="40"
            x2="85"
            y2="105"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line
            x1="235"
            y1="40"
            x2="235"
            y2="105"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx="85"
            cy="40"
            r="14"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <circle
            cx="85"
            cy="105"
            r="14"
            fill="#FF6B5B"
            fillOpacity="0.2"
            stroke="#FF6B5B"
            strokeWidth="1.5"
          />
          <circle cx="160" cy="70" r="22" fill="#FF6B5B" />
          <text
            x="160"
            y="74"
            textAnchor="middle"
            fill="#F4EDE0"
            fontFamily="JetBrains Mono"
            fontSize="10"
            fontWeight="700"
          >
            KG
          </text>
          <circle
            cx="235"
            cy="40"
            r="14"
            fill="#FF6B5B"
            fillOpacity="0.2"
            stroke="#FF6B5B"
            strokeWidth="1.5"
          />
          <circle
            cx="235"
            cy="105"
            r="14"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'cv':
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          {/* Bounding Box Corners */}
          <path d="M55 40 V 26 H 72" stroke="#FF6B5B" strokeWidth="2" strokeLinecap="round" />
          <path d="M265 40 V 26 H 248" stroke="#FF6B5B" strokeWidth="2" strokeLinecap="round" />
          <path d="M55 100 V 114 H 72" stroke="#FF6B5B" strokeWidth="2" strokeLinecap="round" />
          <path d="M265 100 V 114 H 248" stroke="#FF6B5B" strokeWidth="2" strokeLinecap="round" />
          {/* Kinematic Pose Skeleton */}
          <circle cx="145" cy="36" r="7" fill="#FF6B5B" />
          <path
            d="M145 43 L 142 74 L 118 98 M142 74 L 170 96 M120 56 L 144 52 L 172 60"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="118" cy="98" r="4" fill="#FF6B5B" />
          <circle cx="170" cy="96" r="4" fill="#FF6B5B" />
          <circle cx="172" cy="60" r="4" fill="#FF6B5B" />
          <rect
            x="194"
            y="44"
            width="58"
            height="48"
            rx="8"
            fill="#FF6B5B"
            fillOpacity="0.13"
            stroke="#FF6B5B"
            strokeWidth="1.2"
          />
          <text
            x="223"
            y="66"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="JetBrains Mono"
            fontSize="8.5"
            fontWeight="700"
          >
            POSE 60FPS
          </text>
          <text
            x="223"
            y="80"
            textAnchor="middle"
            fill="#FF6B5B"
            fontFamily="JetBrains Mono"
            fontSize="8"
          >
            98.4% IoU
          </text>
        </svg>
      );

    case 'eval':
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          <line
            x1="40"
            y1="110"
            x2="280"
            y2="110"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <rect x="65" y="65" width="28" height="45" rx="6" fill="currentColor" fillOpacity="0.15" />
          <rect x="115" y="45" width="28" height="65" rx="6" fill="currentColor" fillOpacity="0.25" />
          <rect x="165" y="30" width="28" height="80" rx="6" fill="#FF6B5B" />
          <rect x="215" y="50" width="28" height="60" rx="6" fill="#FF6B5B" fillOpacity="0.45" />
          <path d="M79 60 L 129 40 L 179 24 L 229 44" stroke="#FF6B5B" strokeWidth="2" />
          <circle cx="179" cy="24" r="5" fill="#FF6B5B" />
        </svg>
      );

    case 'speech':
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          <rect x="45" y="60" width="6" height="20" rx="3" fill="currentColor" fillOpacity="0.25" />
          <rect x="65" y="42" width="6" height="56" rx="3" fill="currentColor" fillOpacity="0.35" />
          <rect x="85" y="52" width="6" height="36" rx="3" fill="#FF6B5B" fillOpacity="0.6" />
          <rect x="105" y="28" width="6" height="84" rx="3" fill="#FF6B5B" />
          <rect x="125" y="45" width="6" height="50" rx="3" fill="#FF6B5B" fillOpacity="0.8" />
          <rect x="145" y="62" width="6" height="16" rx="3" fill="currentColor" fillOpacity="0.3" />
          <rect x="165" y="34" width="6" height="72" rx="3" fill="#FF6B5B" />
          <rect x="185" y="48" width="6" height="44" rx="3" fill="currentColor" fillOpacity="0.35" />
          <rect x="205" y="24" width="6" height="92" rx="3" fill="#FF6B5B" />
          <rect x="225" y="44" width="6" height="52" rx="3" fill="#FF6B5B" fillOpacity="0.6" />
          <rect x="245" y="56" width="6" height="28" rx="3" fill="currentColor" fillOpacity="0.3" />
          <rect x="265" y="62" width="6" height="16" rx="3" fill="currentColor" fillOpacity="0.2" />
        </svg>
      );

    case 'medical':
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          <path
            d="M30 75 L 95 75 L 112 40 L 130 105 L 150 28 L 170 95 L 185 62 L 200 75 L 290 75"
            stroke="#FF6B5B"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="150" cy="28" r="5" fill="#FF6B5B" />
          <rect
            x="225"
            y="30"
            width="52"
            height="26"
            rx="6"
            fill="#FF6B5B"
            fillOpacity="0.15"
            stroke="#FF6B5B"
            strokeWidth="1.2"
          />
          <text
            x="251"
            y="47"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="JetBrains Mono"
            fontSize="9"
            fontWeight="600"
          >
            AI + MD
          </text>
        </svg>
      );

    case 'hackathon':
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          <polygon
            points="160,24 196,45 196,87 160,108 124,87 124,45"
            fill="#FF6B5B"
            fillOpacity="0.14"
            stroke="#FF6B5B"
            strokeWidth="1.75"
          />
          <circle cx="160" cy="66" r="14" fill="#FF6B5B" />
          <text
            x="160"
            y="70"
            textAnchor="middle"
            fill="#F4EDE0"
            fontFamily="JetBrains Mono"
            fontSize="9"
            fontWeight="700"
          >
            K8S
          </text>
          <path
            d="M68 66 H 120 M200 66 H 252"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="62" cy="66" r="8" stroke="#FF6B5B" strokeWidth="1.5" />
          <circle cx="258" cy="66" r="8" stroke="#FF6B5B" strokeWidth="1.5" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
          <circle cx="80" cy="40" r="8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="80" cy="70" r="8" fill="#FF6B5B" />
          <circle cx="80" cy="100" r="8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="160" cy="30" r="8" fill="#FF6B5B" fillOpacity="0.6" />
          <circle cx="160" cy="70" r="10" fill="#FF6B5B" />
          <circle cx="160" cy="110" r="8" fill="#FF6B5B" fillOpacity="0.6" />
          <circle cx="240" cy="52" r="8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="240" cy="88" r="8" fill="#FF6B5B" />
          <path
            d="M88 70 L 150 30 M88 70 L 150 70 M88 70 L 150 110 M170 70 L 232 52 M170 70 L 232 88"
            stroke="#FF6B5B"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <path
            d="M88 40 L 150 70 M88 100 L 150 70"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.2"
          />
        </svg>
      );
  }
};
