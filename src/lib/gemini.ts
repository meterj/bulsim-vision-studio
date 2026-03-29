import { GoogleGenAI, Type } from "@google/genai";
import { SHAMANIC_KNOWLEDGE } from "../constants";

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

// Safety categories and thresholds as string types compatible with the SDK
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
      사용자의 의도를 한국 전통 무속 상징 체계로 해석해줘.
      입력: "${userInput}"

      지식 기반:
      - 색채: ${JSON.stringify(SHAMANIC_KNOWLEDGE.colors)}
      - 문양: ${JSON.stringify(SHAMANIC_KNOWLEDGE.patterns)}
      - 무구: ${JSON.stringify(SHAMANIC_KNOWLEDGE.mugu)}
      - 신격: ${JSON.stringify(SHAMANIC_KNOWLEDGE.deities)}
      - 제의 목적: ${JSON.stringify(SHAMANIC_KNOWLEDGE.ritual_purposes)}
      - 제의 공간: ${JSON.stringify(SHAMANIC_KNOWLEDGE.ritual_spaces)}
      - 금기 사항: ${JSON.stringify(SHAMANIC_KNOWLEDGE.taboos)}

      해석 원칙:
      1. 장식용 판타지가 아닌, 실제 무속인이 표현할 법한 정통성을 유지할 것.
      2. 의례 목적에 맞는 신격과 무구, 공간을 선정할 것.
      3. 금기 사항을 엄격히 준수할 것 (공포, 고어, 타 종교 상징 혼입 금지).

      다음 JSON 형식으로 응답해줘:
      {
        "intent": "의도 카테고리",
        "selectedSymbols": ["선택된 문양/무구 ID 리스트"],
        "selectedColors": ["선택된 색채 ID 리스트"],
        "deity": "선정된 신격 이름과 의미",
        "ritualPurpose": "선정된 제의 목적 이름과 의미",
        "ritualSpace": "선정된 제의 공간 이름과 의미",
        "composition": "장면 구성 방식 설명",
        "explanation": "이 이미지가 왜 이렇게 구성되었는지에 대한 한국어 설명 (신격, 무구, 색채의 연관성 포함)",
        "englishPrompt": "Stable Diffusion/DALL-E 스타일의 상세한 영어 프롬프트. 한국 무속의 정통성과 신비로움을 강조할 것."
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
    throw new Error("SAFETY_BLOCK: 무속 콘텐츠가 안전 필터에 의해 차단되었습니다.");
  }

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from AI");
  }

  try {
    // Clean up potential markdown code blocks if they exist (though responseMimeType should prevent them)
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Failed to parse AI response as JSON:", text);
    throw new Error("Invalid AI response format");
  }
}

export async function generateShamanicImage(
  prompt: string, 
  aspectRatio: string = "1:1", 
  mode: 'vision' | 'talisman' = 'vision',
  artStyle: string = 'musindo',
  resolution: '512px' | '1K' | '2K' | '4K' = '1K'
): Promise<string> {
  // Map user requested ratios to API supported ones if necessary
  const supportedRatios: Record<string, string> = {
    "1:1": "1:1",
    "16:9": "16:9",
    "9:16": "9:16",
    "2:3": "3:4", // Closest supported
    "3:2": "4:3"  // Closest supported
  };

  const ratio = supportedRatios[aspectRatio] || "1:1";

  const artStylePrompts: Record<string, string> = {
    'musindo': 'Traditional Korean Shamanic Deity painting (Musindo). Bold black outlines, vibrant Obangsaek colors, and heavy gold leaf accents. Formal and majestic.',
    'minhwa': 'Korean Folk Art (Minhwa) style. Warm, earthy tones mixed with vibrant accents, expressive and slightly whimsical characters, detailed textures of traditional paper.',
    'bulhwa': 'Korean Buddhist Painting (Bulhwa) style. Extremely intricate details, delicate lines, sophisticated color harmony, and a sense of divine serenity.',
    'modern': 'Modern Shamanic Digital Art. A fusion of traditional Korean motifs with contemporary cinematic lighting, glowing spiritual effects, and high-definition textures.'
  };

  const selectedArtStyle = artStylePrompts[artStyle] || artStylePrompts['musindo'];

  const systemPrompt = mode === 'vision' 
    ? `An authentic, high-quality ${selectedArtStyle}. ${prompt}. 
       Key Features: Bold outlines, saturated Obangsaek colors (Red, Blue, Yellow, White, Black), and gold leaf (Kyeum-ni) highlights. 
       Composition: Symmetrical or centered divine figures with radiant halos. Background features stylized "Iwol-obong-do" style mountains, swirling traditional clouds, and sacred symbols. 
       Atmosphere: Majestic, powerful, and spiritually charged. 
       Avoid: 3D render look, photorealism, horror, generic fantasy, Japanese/Chinese styles.`
    : `An authentic Korean Shamanic Talisman (Bujeok). ${prompt}.
       Visual Style: Deep red cinnabar (Jusa) ink with visible brush strokes on aged yellow mulberry paper. 
       Content: Mysterious, stylized abstract spiritual symbols and flowing calligraphic lines. 
       Composition: Centered, vertical, with thick borders. 
       Texture: Fibrous paper texture, slightly bleeding ink. 
       CRITICAL: No readable text, no letters, no characters, no alphabet, no hangul, no hanja, no numbers. Only abstract spiritual symbols.
       Avoid: Modern digital fonts, clean vector lines, unrelated occult symbols.`;

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
