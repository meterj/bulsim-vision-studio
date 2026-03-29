import { GoogleGenAI, Type } from "@google/genai";
import { BUDDHIST_KNOWLEDGE } from "../constants";

const getApiKey = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('GEMINI_API_KEY') || "";
  }
  return "";
};

function getAIClient() {
  const key = getApiKey();
  if (!key) throw new Error("API_KEY_NOT_FOUND");
  return new GoogleGenAI({ apiKey: key });
}

// Safety categories and thresholds
const SAFETY_SETTINGS = [
  { category: "HARM_CATEGORY_HARASSMENT" as any, threshold: "BLOCK_ONLY_HIGH" as any },
  { category: "HARM_CATEGORY_HATE_SPEECH" as any, threshold: "BLOCK_ONLY_HIGH" as any },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT" as any, threshold: "BLOCK_ONLY_HIGH" as any },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT" as any, threshold: "BLOCK_ONLY_HIGH" as any }
];

export interface InterpretationResult {
  intent: string;
  selectedSymbols: string[];
  selectedColors: string[];
  deity: string;
  ritualPurpose: string;
  ritualSpace: string;
  composition: string;
  explanation: string;
  englishPrompt: string;
}

export async function interpretUserIntent(userInput: string): Promise<InterpretationResult> {
  const response = await getAIClient().models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `
      사용자의 의도를 '범불교적(Universal Buddhism)' 상징 체계로 해석해줘.
      중요: 모든 종파를 아우르는 숭고한 불교 미학(부처님, 보살님, 사찰, 보법)에 집중할 것. 무속적인 요소는 철저히 배제함.
      입력: "${userInput}"

      지식 기반:
      - 색채: ${JSON.stringify(BUDDHIST_KNOWLEDGE.colors)}
      - 문양: ${JSON.stringify(BUDDHIST_KNOWLEDGE.patterns)}
      - 불구: ${JSON.stringify(BUDDHIST_KNOWLEDGE.bulguji)}
      - 신격: ${JSON.stringify(BUDDHIST_KNOWLEDGE.deities)}
      - 기도 목적: ${JSON.stringify(BUDDHIST_KNOWLEDGE.prayer_purposes)}
      - 수행 공간: ${JSON.stringify(BUDDHIST_KNOWLEDGE.spaces)}
      - 금기 사항: ${JSON.stringify(BUDDHIST_KNOWLEDGE.taboos)}

      해석 원칙:
      1. 고요하고 장엄하며 자비로운 불교적 분위기를 유지할 것.
      2. 사용자의 소망을 불교의 자비(Metta)와 지혜(Prajna)의 관점에서 해석할 것.
      3. 금기 사항을 엄격히 준수할 것 (무속적 요소 절대 금지).

      다음 JSON 형식으로 응답해줘:
      {
        "intent": "의도 카테고리",
        "selectedSymbols": ["선택된 문양/불구 ID 리스트"],
        "selectedColors": ["선택된 색채 ID 리스트"],
        "deity": "선정된 부처님/보살님 이름과 의미",
        "ritualPurpose": "선정된 기도/수행 목적 이름과 의미",
        "ritualSpace": "선정된 수행 공간 이름 (대웅전, 산사 등)",
        "composition": "장면 구성 방식 (수직적 장엄함 또는 수평적 평온함 강조)",
        "explanation": "이 이미지가 왜 이렇게 구성되었는지에 대한 한국어 설명",
        "englishPrompt": "Detailed English prompt emphasizing sublime Buddhist aesthetics. Focus on Buddhist scroll painting (Taenghwa) or Zen ink wash style, lotus motifs, and golden halos."
      }
    `,
    config: {
      responseMimeType: "application/json",
      safetySettings: SAFETY_SETTINGS,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          intent: { type: Type.STRING },
          selectedSymbols: { type: Type.ARRAY, items: { type: Type.STRING } },
          selectedColors: { type: Type.ARRAY, items: { type: Type.STRING } },
          deity: { type: Type.STRING },
          ritualPurpose: { type: Type.STRING },
          ritualSpace: { type: Type.STRING },
          composition: { type: Type.STRING },
          explanation: { type: Type.STRING },
          englishPrompt: { type: Type.STRING }
        },
        required: ["intent", "selectedSymbols", "selectedColors", "deity", "ritualPurpose", "ritualSpace", "composition", "explanation", "englishPrompt"]
      }
    }
  });

  if (response.candidates?.[0]?.finishReason === "SAFETY") {
    throw new Error("SAFETY_BLOCK: 불교 콘텐츠가 안전 필터에 의해 차단되었습니다.");
  }

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from AI");
  }

  try {
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Failed to parse AI response as JSON:", text);
    throw new Error("Invalid AI response format");
  }
}

export async function generateBuddhistImage(
  prompt: string, 
  aspectRatio: string = "1:1", 
  mode: 'vision' | 'dharani' = 'vision',
  artStyle: string = 'taenghwa',
  resolution: '512px' | '1K' | '2K' | '4K' = '1K'
): Promise<string> {
  const supportedRatios: Record<string, string> = {
    "1:1": "1:1",
    "16:9": "16:9",
    "9:16": "9:16",
    "2:3": "3:4",
    "3:2": "4:3"
  };

  const ratio = supportedRatios[aspectRatio] || "1:1";

  const artStylePrompts: Record<string, string> = {
    'taenghwa': 'Exquisite Korean Buddhist scroll painting (Taenghwa). Ornate golden outlines, traditional mineral pigments, detailed deities, and celestial landscapes. Majestic and sacred.',
    'zen_ink': 'Zen Buddhist ink wash painting (Seon-muk-hwa). Minimalist brush strokes, meditative empty space, spiritual depth, and natural serenity. Sumi-e style.',
    'statue': 'Majestic Buddhist sculpture style, like Seokguram Grotto. Carved stone or gilded bronze texture, divine serenity, cinematic lighting, and a holy aura.',
    'modern': 'Modern Buddhist Digital Art. Ethereal light, floating lotus petals, transcendental geometry, and a peaceful futuristic atmosphere.'
  };

  const selectedArtStyle = artStylePrompts[artStyle] || artStylePrompts['taenghwa'];

  const systemPrompt = mode === 'vision' 
    ? `An exquisite, professional ${selectedArtStyle}. ${prompt}. 
       Visual Quality: Masterpiece, 8k resolution, divine and sophisticated art.
       Core Aesthetic: Sublime Buddhist light and compassion. Use complex golden halos (Gwang-bae), intricate lotus patterns, and harmonic color palettes.
       Fine Details: Traditional Dan-cheong architectural patterns, delicate silk textures, and sacred symbols like the Dharma Wheel.
       Composition: Perfectly balanced, centered divine figures or panoramic peaceful temple landscapes. Atmospheric depth with incense smoke and golden dust.
       CRITICAL: Strictly Buddhist origins. NO Shamanism, NO Shamanic flags, NO sharp blades, NO demonic elements.
       Atmosphere: Transcendental, compassionate, and deeply peaceful.`
    : `A sacred Buddhist Dharani or Sutra calligraphy art. ${prompt}.
       Visual Style: Masterful golden or black ink calligraphy on dark indigo or aged hanji paper.
       Content: Abstract spiritual energy flowing through sacred characters and Buddhist symbols (Lotus, Swastika).
       Composition: Centered, vertical, meditative layout with ornamental borders.
       Atmosphere: Divine, focused, and spiritually charged.
       CRITICAL: No readable modern text. Focus on the art of sacred script and symbols.`;

  const response = await getAIClient().models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: {
      parts: [
        {
          text: `${systemPrompt} Referrer policy: no-referrer.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: ratio as any,
        imageSize: resolution
      },
      safetySettings: SAFETY_SETTINGS
    }
  });

  if (response.candidates?.[0]?.finishReason === "SAFETY") {
    throw new Error("SAFETY_BLOCK: 이미지 생성 프롬프트가 안전 필터에 의해 차단되었습니다.");
  }

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Image generation failed");
}
