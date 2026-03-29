import { InterpretationResult } from "./gemini";
import { BUDDHIST_KNOWLEDGE } from "../constants";

export function generateBuddhistHtml(
  input: string,
  imageUrl: string,
  result: InterpretationResult,
  options: { artStyle: string; intensity: number; visualStyle: string }
): string {
  const getSymbolDetails = (id: string) => {
    const flattenedDeities = BUDDHIST_KNOWLEDGE.deities.flatMap(d => d.items);
    return [
      ...BUDDHIST_KNOWLEDGE.patterns, 
      ...BUDDHIST_KNOWLEDGE.bulguji, 
      ...flattenedDeities,
      ...BUDDHIST_KNOWLEDGE.prayer_purposes,
      ...BUDDHIST_KNOWLEDGE.spaces
    ].find(s => s.id === id);
  };

  const artStyleNames: Record<string, string> = {
    'taenghwa': '탱화 (Buddhist Scroll Painting)',
    'zen_ink': '선묵화 (Zen Ink Wash)',
    'statue': '불상 조각 (Buddhist Sculpture)',
    'modern': '현대적 재해석 (Modern Buddhist Art)'
  };

  const visualStyleNames: Record<string, string> = {
    'human': '인간형 (Humanoid)',
    'avatar': '현신 (Avatar)',
    'phenomenon': '영적 현상 (Spiritual Phenomenon)',
    'symbol': '상징형 (Symbolic)',
    'space': '공간형 (Spatial)'
  };

  const getColorDetails = (id: string) => {
    return BUDDHIST_KNOWLEDGE.colors.find(c => c.id === id);
  };

  const symbolsHtml = result.selectedSymbols
    .map(id => {
      const s = getSymbolDetails(id);
      return s ? `
        <div class="symbol-card">
          <h3>${s.name}</h3>
          <p>${s.meaning}</p>
        </div>
      ` : '';
    })
    .join('');

  const colorsHtml = result.selectedColors
    .map(id => {
      const c = getColorDetails(id);
      return c ? `
        <div class="color-item">
          <div class="color-swatch" style="background-color: ${c.hex}"></div>
          <span>${c.name}</span>
        </div>
      ` : '';
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>불심 비전 리포트 - ${result.intent}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,300&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0c0a09;
            --accent: #d97706;
            --text: #f5f5f4;
            --glass: rgba(255, 255, 255, 0.03);
            --border: rgba(251, 191, 36, 0.1);
        }
        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 40px 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            margin-bottom: 60px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 40px;
        }
        h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 3rem;
            margin: 0;
            background: linear-gradient(to right, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle {
            text-transform: uppercase;
            letter-spacing: 0.3em;
            font-size: 0.8rem;
            opacity: 0.5;
            margin-top: 10px;
        }
        .main-image {
            width: 100%;
            border-radius: 32px;
            box-shadow: 0 40px 100px rgba(0,0,0,0.8);
            margin-bottom: 40px;
            border: 1px solid var(--border);
        }
        .section {
            background: var(--glass);
            border: 1px solid var(--border);
            border-radius: 32px;
            padding: 40px;
            margin-bottom: 40px;
            backdrop-filter: blur(20px);
        }
        h2 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.8rem;
            margin-top: 0;
            color: var(--accent);
            border-bottom: 1px solid var(--border);
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .intent-badge {
            display: inline-block;
            padding: 6px 18px;
            background: rgba(217, 119, 6, 0.1);
            border: 1px solid var(--accent);
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: bold;
            margin-bottom: 20px;
            color: #fbbf24;
        }
        .explanation {
            font-style: italic;
            font-size: 1.15rem;
            color: rgba(255,255,255,0.9);
            line-height: 1.8;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
        }
        .symbol-card {
            background: rgba(255,255,255,0.02);
            padding: 24px;
            border-radius: 20px;
            border: 1px solid var(--border);
        }
        .symbol-card h3 {
            margin: 0 0 10px 0;
            font-size: 1.05rem;
            color: #fbbf24;
        }
        .symbol-card p {
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.7;
        }
        .color-list {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        .color-item {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .color-swatch {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid var(--border);
            box-shadow: 0 0 15px rgba(0,0,0,0.3);
        }
        footer {
            text-align: center;
            margin-top: 60px;
            opacity: 0.4;
            font-size: 0.75rem;
            letter-spacing: 0.25em;
        }
        @media (max-width: 600px) {
            h1 { font-size: 2.2rem; }
            .section { padding: 25px; }
            .grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>BULSIM VISION V2.0</h1>
            <div class="subtitle">심인(心印) 가피 리포트</div>
        </header>

        <div class="section">
            <div class="intent-badge">${result.intent}</div>
            <p style="font-size: 1.1rem;"><strong>마음의 발원:</strong> "${input}"</p>
            <div class="grid" style="margin-top: 25px;">
                <div class="symbol-card">
                    <h3>부처님/보살님</h3>
                    <p>${result.deity}</p>
                </div>
                <div class="symbol-card">
                    <h3>기도 목적</h3>
                    <p>${result.ritualPurpose}</p>
                </div>
                <div class="symbol-card">
                    <h3>수행 공간</h3>
                    <p>${result.ritualSpace}</p>
                </div>
                <div class="symbol-card">
                    <h3>예술 양식</h3>
                    <p>${artStyleNames[options.artStyle] || options.artStyle}</p>
                </div>
                <div class="symbol-card">
                    <h3>시각 스타일</h3>
                    <p>${visualStyleNames[options.visualStyle] || options.visualStyle}</p>
                </div>
                <div class="symbol-card">
                    <h3>수행의 깊이</h3>
                    <p>${options.intensity}%</p>
                </div>
            </div>
            <div class="explanation" style="margin-top: 25px;">"${result.explanation}"</div>
        </div>

        <img src="${imageUrl}" class="main-image" alt="Generated Buddhist Vision">

        <div class="section">
            <h2>상징 해석 (Dharma Symbolism)</h2>
            <div class="grid">
                ${symbolsHtml}
            </div>
        </div>

        <div class="section">
            <h2>자비의 색채 (Compassionate Palette)</h2>
            <div class="color-list">
                ${colorsHtml}
            </div>
        </div>

        <div class="section">
            <h2>심상 구성 (Composition)</h2>
            <p style="font-size: 1.05rem; opacity: 0.9;">${result.composition}</p>
        </div>

        <footer>
            © 2026 BULSIM VISION V2.0 · 성불하십시오
        </footer>
    </div>
</body>
</html>
  `;
}
