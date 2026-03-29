export const BUDDHIST_KNOWLEDGE = {
  deities: [
    {
      category: "부처님 (Buddha)",
      items: [
        { id: "sakyamuni", name: "석가모니불", meaning: "무상정등각의 상징, 근본 부처님", description: "보리수 아래 성불하신 장엄한 모습" },
        { id: "amitabha", name: "아미타불", meaning: "극락정토로 인도하는 무한한 광명", description: "서방정토의 주인, 아미타여래" },
        { id: "bhaisajyaguru", name: "약사여래불", meaning: "중생의 질병과 고통을 치유", description: "약함을 든 약사불의 대자대비" },
        { id: "vairocana", name: "비로자나불", meaning: "우주 전체에 가득한 진리의 빛", description: "법신불로서의 거대한 존재감" }
      ]
    },
    {
      category: "보살님 (Bodhisattva)",
      items: [
        { id: "avalokitesvara", name: "관세음보살", meaning: "중생의 소리를 듣는 무한한 자비", description: "미소와 감로수 병, 자비의 화신" },
        { id: "kshitigarbha", name: "지장보살", meaning: "모든 중생을 구제하려는 거대 원력", description: "지옥 문에서 중생을 구제하는 원력" },
        { id: "manjusri", name: "문수보살", meaning: "최고의 지혜와 통찰력의 상징", description: "지혜의 칼과 사자를 탄 모습" },
        { id: "samantabhadra", name: "보현보살", meaning: "실천과 행원의 화신", description: "코끼리를 탄 채 자비를 실천함" }
      ]
    }
  ],
  prayer_purposes: [
    { id: "enlightenment", name: "정진/깨달음", meaning: "수행을 통한 내면의 지혜 발견" },
    { id: "compassion", name: "자비/사랑", meaning: "모든 생명에 대한 대자대비의 마음" },
    { id: "healing", name: "치유/평온", meaning: "번뇌를 씻고 심신을 조화롭게 함" },
    { id: "protection", name: "가호/벽사", meaning: "외적인 장애로부터 보호받음" },
    { id: "prosperity", name: "번영/풍요", meaning: "세상에서의 안정과 공덕의 조화" }
  ],
  spaces: [
    { id: "daewungjeon", name: "대웅전/법당", meaning: "중심 도량의 위엄과 신성함" },
    { id: "sansadang", name: "산사/사찰", meaning: "자연 속 청정한 수행의 공간" },
    { id: "seoktab", name: "석탑/도량", meaning: "진리의 상징과 기도의 기둥" },
    { id: "lotus_land", name: "연꽃 피는 극락국토", meaning: "오염되지 않은 청정한 세계" },
    { id: "buddhist_cave", name: "석굴/수행처", meaning: "깊은 집중과 깨달음의 공간" }
  ],
  patterns: [
    { id: "lotus", name: "연꽃 (Lotus)", meaning: "처염상정, 깨끗함과 신성함" },
    { id: "dharma_wheel", name: "법륜 (Dharma Wheel)", meaning: "부처님의 가르침이 멈추지 않음" },
    { id: "mandala", name: "만다라 (Mandala)", meaning: "우주적 대조화와 깨달음의 지도" },
    { id: "swastika", name: "만자 (Manja)", meaning: "수만 가지 복덕이 깃든 신성한 기호" }
  ],
  bulguji: [
    { id: "moktak", name: "목탁", meaning: "정진과 각성을 깨우는 소리" },
    { id: "yeomju", name: "염주", meaning: "번뇌를 끊고 정념을 이어감" },
    { id: "beomjong", name: "범종", meaning: "지옥 중생까지 구제하는 울림" },
    { id: "candle", name: "공양 촛불", meaning: "지혜의 빛으로 어둠을 밝힘" }
  ],
  colors: [
    { id: "gold", name: "황금색 (Gold)", hex: "#f59e0b", meaning: "부처님의 무색광명과 고귀함" },
    { id: "lotus_pink", name: "연꽃 핑크 (Lotus Pink)", hex: "#fda4af", meaning: "자비와 청정함" },
    { id: "deep_blue", name: "쪽빛 (Deep Indigo)", hex: "#1e1b4b", meaning: "지혜와 영원함" },
    { id: "stone_gray", name: "석조 회색 (Stone)", hex: "#44403c", meaning: "불상과 탑의 단단한 믿음" },
    { id: "cream", name: "미색 (Cream)", hex: "#fcf9f1", meaning: "순결과 평온의 기초" }
  ]
};

export const INTENT_CATEGORIES: Record<string, string> = {
  "보호/벽사": "모든 재액과 해로운 기운을 막아내고 수행자를 보호합니다.",
  "복/재물": "공덕의 결실이 현세의 풍요로 이어지기를 발원합니다.",
  "치유/회복": "병마를 가라앉히고 심신의 건강과 조화를 되찾습니다.",
  "천도/추모": "떠나간 영가가 극락왕생할 수 있도록 인도합니다.",
  "안녕/가정": "가정의 화목과 모든 식구의 평안을 서원합니다.",
  "학업/합격": "지혜를 닦아 시험과 학문에서 좋은 결과를 얻습니다.",
  "인연/사랑": "자비로운 마음으로 소중한 인연을 맺고 깊게 합니다.",
  "사업/번창": "정당한 노력으로 큰 번영을 이루고 베푸는 삶을 삽니다.",
  "정화/결계": "도량이나 마음의 부정함을 씻고 청정한 공간을 만듭니다.",
  "승진/영전": "자신의 소임에서 인정받고 더 큰 공덕을 쌓는 자리로 갑니다.",
  "태교/순산": "새로운 생명이 지혜와 자비 속에서 탄생하기를 기도합니다.",
  "여행/무사고": "떠나는 길과 돌아오는 길에 장애가 없기를 기원합니다.",
  "소원성취": "그동안 쌓은 공덕으로 간절한 발원이 이루어지길 서원합니다.",
  "건강/장수": "무병장수하여 수행을 오래 이어가고 모든 고통에서 벗어납니다.",
  "금전/횡재": "예상치 못한 인연으로 재물적 장애가 해결되기를 바랍니다.",
  "구설/차단": "타인의 비난이나 오해로부터 벗어나 명예가 지켜지길 빕니다.",
  "화합/조직": "함께 수행하거나 일하는 대중들이 하나가 되게 합니다.",
  "영감/창의": "내면의 밝은 빛을 일깨워 새로운 지혜와 영감을 얻습니다.",
  "심신/안정": "불안과 공포를 버리고 깊은 평온함 속에 머무릅니다.",
  "액운/소멸": "불행을 가져오는 묵은 업장을 소멸하고 길을 틉니다.",
  "귀인/상봉": "성장을 도와줄 귀한 인연이나 선지식을 만나게 합니다.",
  "터주/가람수호": "거처하는 공간의 호법신이 신성함을 지켜주기를 청합니다.",
  "명예/권위": "덕망을 쌓아 세상의 존경을 받고 가르침을 폅니다.",
  "승리/경쟁": "선한 경쟁에서 이기고 올바른 결과를 쟁취합니다.",
  "꿈/해몽": "밤사이 나타난 몽상(夢相)에서 부처님의 지혜를 찾습니다.",
  "용기/극복": "어려움과 두려움을 떨치고 한 걸음 더 나아갈 용기를 얻습니다.",
  "지혜/통찰": "진리를 꿰뚫어 보는 혜안을 얻어 번뇌를 끊어냅니다.",
  "매매/성사": "복잡한 세속의 거래가 원만하고 공정하게 이루어지길 빕니다.",
  "화해/용서": "상대와의 앙금을 풀고 미움 없는 자비의 마음을 가집니다.",
  "가피/영험": "수행과 기도의 끝에 얻는 신묘하고 영험한 힘을 기원합니다."
};
