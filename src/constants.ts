/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SHAMANIC_KNOWLEDGE = {
  colors: [
    { id: 'blue', name: '청색 (Blue)', meaning: '시작, 탄생, 하늘, 생명의 기운', hex: '#0000FF' },
    { id: 'red', name: '홍색 (Red)', meaning: '절정, 땅, 강한 양기, 생동감, 벽사', hex: '#FF0000' },
    { id: 'yellow', name: '황색 (Yellow)', meaning: '중심, 균형, 우주의 축, 신성함', hex: '#FFFF00' },
    { id: 'green', name: '연두색 (Light Green)', meaning: '극락, 천도, 맑은 목적지, 생명력', hex: '#90EE90' },
    { id: 'jade', name: '옥색 (Jade)', meaning: '하늘, 맑음, 신격의 고결함, 숭고함', hex: '#00A86B' },
    { id: 'peach', name: '분홍 피치마 (Peach Pink)', meaning: '고난, 희생, 인간적 비극, 구원의 서사', hex: '#FFDAB9' },
    { id: 'white', name: '백색 (White)', meaning: '순수, 결백, 신성한 기운, 정화', hex: '#FFFFFF' },
    { id: 'purple', name: '자색 (Purple)', meaning: '고귀함, 신비로운 권위, 영적 깊이', hex: '#800080' }
  ],
  deities: [
    { 
      category: '가정과 생활 (Household)',
      items: [
        { id: 'seongju', name: '성주신', meaning: '집안의 기둥, 가옥의 수호와 번영', detailedDescription: '성주신은 가옥의 수호신으로, 집의 대들보에 거주한다고 믿어집니다. 새로 집을 짓거나 이사를 할 때 성주받이 굿을 통해 봉안하며, 집안의 평안과 가운의 번창을 관장합니다. 무신도에서는 대개 인자한 노인의 모습으로 묘사됩니다.' },
        { id: 'jowang', name: '조왕신', meaning: '부엌의 신, 생활의 안정과 보살핌', detailedDescription: '조왕신은 부엌을 관장하는 화신(火神)이자 가택 신앙의 핵심입니다. 매일 아침 정화수를 떠놓고 가족의 안녕을 비는 대상이며, 집안의 모든 일을 하늘에 보고하는 역할을 한다고 전해집니다. 주로 부엌 벽면에 모셔집니다.' },
        { id: 'samshin', name: '삼신', meaning: '출산과 자손의 점지, 아이의 건강', detailedDescription: '삼신(또는 삼신할머니)은 아이의 탄생과 성장을 관장하는 가택신의 하나입니다. 안방의 윗목이나 벽장에 모셔지며, 아이가 태어날 때 산모와 아이를 보호하고 건강하게 자라도록 보살핍니다. 무신도에서는 인자한 할머니나 세 분의 여신으로 표현됩니다.' },
        { id: 'jesok', name: '제석신', meaning: '재복, 수명, 생산의 근원', detailedDescription: '제석신은 불교의 제석천에서 유래된 신격으로, 인간의 수명과 복록, 그리고 농경의 풍요를 주관합니다. 주로 흰 고깔을 쓰고 가사를 입은 승려의 모습으로 묘사되며, 청정하고 고결한 기운을 상징합니다.' },
        { id: 'josang', name: '조상신', meaning: '뿌리와 보호, 집안의 내력' },
        { id: 'teoju', name: '터주신', meaning: '집터의 수호, 공간의 안정' }
      ]
    },
    {
      category: '우주와 질서 (Cosmic)',
      items: [
        { id: 'chilseong', name: '칠성신', meaning: '수명, 운명, 북두칠성의 질서', detailedDescription: '북두칠성을 신격화한 칠성신은 인간의 수명과 복록, 그리고 비를 내리는 농경의 신으로 숭배됩니다. 불교와 도교의 영향이 혼합되어 있으며, 무신도에서는 일곱 분의 신선이나 부처의 모습으로 장엄하게 표현됩니다.' },
        { id: 'cheonshin', name: '천신', meaning: '하늘의 주인, 절대적 질서' },
        { id: 'yongshin', name: '용신/용왕', meaning: '물의 정화, 풍요, 변화의 힘', detailedDescription: '용신은 바다, 강, 우물 등 물을 관장하는 강력한 신격입니다. 어촌에서는 풍어제(용왕제)를 통해 풍어와 안전을 기원하며, 농촌에서는 기우제의 대상이 됩니다. 화려한 용의 형상이나 위엄 있는 왕의 모습으로 묘사됩니다.' },
        { id: 'sanshin', name: '산신', meaning: '산의 기운, 지역의 수호와 위엄', detailedDescription: '산신은 특정 산을 지키는 수호신이자 산의 정령입니다. 마을의 안녕과 호환(虎患) 예방을 위해 모셔지며, 대개 호랑이를 거느린 위엄 있는 노인의 모습으로 그려집니다. 산의 웅장함과 자연의 경외감을 시각화합니다.' }
      ]
    },
    {
      category: '장군과 수호 (Guardian)',
      items: [
        { id: 'janggun', name: '장군신', meaning: '강력한 수호, 벽사, 위엄', detailedDescription: '장군신은 역사적 실존 인물이나 전설적인 영웅이 신격화된 존재입니다. 최영 장군, 임경업 장군 등이 대표적이며, 강력한 무력으로 악귀를 물리치고 국가와 마을을 수호합니다. 화려한 갑옷과 무기를 갖춘 위풍당당한 모습으로 묘사됩니다.' },
        { id: 'shinjang', name: '신장신/오방신장', meaning: '방위의 보호, 악귀 제압', detailedDescription: '오방신장은 동, 서, 남, 북, 중앙의 다섯 방위를 지키는 수호신들입니다. 각 방위를 상징하는 색상(청, 백, 적, 흑, 황)의 갑옷을 입고 있으며, 귀신을 쫓고 부정을 쳐내는 강력한 벽사의 힘을 상징합니다.' },
        { id: 'daegam', name: '대감신', meaning: '재물, 권위, 남성적 강한 기운' }
      ]
    },
    {
      category: '영감과 동자 (Spirit Child)',
      items: [
        { id: 'dongja', name: '동자/태자', meaning: '맑은 감응, 영적 연결, 예리한 점사' },
        { id: 'myeongdu', name: '명두', meaning: '어린 영의 맑은 기운, 접신' },
        { id: 'momju', name: '몸주신', meaning: '무당의 근본 신, 영적 중심' }
      ]
    },
    {
      category: '예능과 신명 (Entertainment)',
      items: [
        { id: 'changbu', name: '창부신', meaning: '흥, 말재주, 판의 에너지, 신명' },
        { id: 'bari', name: '바리공주', meaning: '희생, 구원, 천도, 숭고한 인도자', detailedDescription: '바리공주는 오구대왕의 일곱째 딸로, 부모를 살리기 위해 서천서역국에서 생명수를 구해온 효녀이자 한국 무속의 시조신 중 하나입니다. 망자를 저승으로 인도하는 역할을 하며, 무신도에서는 화려한 활옷을 입고 꽃을 든 모습으로 그려집니다.' }
      ]
    }
  ],
  ritual_purposes: [
    { id: 'chibyeong', name: '치병 (Healing)', meaning: '질병의 퇴치와 건강 회복' },
    { id: 'jaesu', name: '재수 (Wealth)', meaning: '재물운과 사업의 번창' },
    { id: 'cheondo', name: '천도 (Guiding)', meaning: '망자의 넋을 극락으로 인도' },
    { id: 'byeoksa', name: '벽사/액막이 (Warding)', meaning: '악귀와 재앙의 차단' },
    { id: 'gija', name: '기자 (Progeny)', meaning: '자손의 점지와 안녕 기원' },
    { id: 'antaek', name: '안택 (Household Peace)', meaning: '집안의 평안과 터의 안정' },
    { id: 'jeomsa', name: '점사 (Divination)', meaning: '운명 해석과 영적 교감' }
  ],
  ritual_spaces: [
    { id: 'shindan', name: '신단 중심', meaning: '신성한 기물이 진설된 정적인 공간' },
    { id: 'gutcheong', name: '굿청 중심', meaning: '제의가 벌어지는 역동적인 현장' },
    { id: 'dangsan', name: '마을 당산', meaning: '거대한 고목과 돌무더기의 수호 공간' },
    { id: 'sanshin_je', name: '산신 제장', meaning: '깊은 산속 바위와 소나무 아래의 제단' },
    { id: 'cheondo_je', name: '천도 제장', meaning: '송신의 길과 빛의 축이 있는 공간' }
  ],
  patterns: [
    { id: 'saljang', name: '살장 (Saljang)', meaning: '신성한 경계, 악기운 차단', description: '마름모, 삼각형 반복 구조', visualCharacteristics: '기하학적인 마름모와 삼각형이 반복되는 구조로, 날카로운 직선들이 악한 기운이 침범하지 못하도록 촘촘한 결계를 형성하는 시각적 특징을 가집니다. 주로 붉은색과 검은색의 대비가 강합니다.' },
    { id: 'jijeon', name: '지전 (Jijeon)', meaning: '재물, 공양, 길상', description: '엽전형 원 구조, 반복 배열', visualCharacteristics: '엽전 모양의 원형이 사슬처럼 이어지거나 뭉쳐진 형태입니다. 종이를 오려 만든 입체적인 질감이 강조되며, 황금색이나 흰색으로 표현되어 풍요로운 재물을 상징합니다.' },
    { id: 'seongjukkot', name: '성주꽃 (Seongjukkot)', meaning: '가정의 평안과 번영', description: '꽃 중심 대칭 구조', visualCharacteristics: '꽃잎이 중심에서 사방으로 대칭을 이루며 뻗어나가는 화려한 방사형 구조입니다. 선명한 오방색이 조화롭게 배치되어 생명력과 번영의 에너지를 시각화합니다.' },
    { id: 'flower_lattice', name: '꽃창살 (Flower Lattice)', meaning: '성스러운 중심 공간', description: '연꽃과 모란 교차 패턴' },
    { id: 'yeonkkot', name: '연꽃 문양', meaning: '순결, 생명, 창조', description: '만개한 연꽃의 대칭 구조', visualCharacteristics: '부드러운 곡선의 꽃잎이 겹겹이 쌓인 만개한 형태입니다. 맑고 깨끗한 분홍색이나 흰색이 주를 이루며, 진흙 속에서 피어난 고결함을 나타내는 정제된 미감을 보여줍니다.' },
    { id: 'moran', name: '모란 문양', meaning: '부귀, 행복', description: '풍성한 꽃잎의 화려한 문양', visualCharacteristics: '풍성하고 겹겹이 쌓인 꽃잎이 특징인 화려한 꽃 문양입니다. 주로 붉은색과 분홍색이 강조되며, 부귀영화와 세속적인 행복을 상징하는 풍요로운 시각적 부피감을 가집니다.' },
    { id: 'cheoljjukdae', name: '철쭉대 패턴', meaning: '치유, 생명력, 건강', description: '45도 회전 반복 다이아 패턴', visualCharacteristics: '45도 기울어진 다이아몬드 형태가 격자로 반복되는 구조입니다. 직선의 교차점마다 작은 꽃이나 점이 배치되어 생동감 넘치는 리듬감을 형성하며, 치유의 에너지가 퍼져나가는 형상을 띱니다.' },
    { id: 'jowanggi', name: '조왕기 패턴', meaning: '보살핌, 생활 수호', description: '대칭 꽃잎형 추상화' }
  ],
  mugu: [
    { id: 'fan', name: '무당부채 (일월선)', meaning: '해와 달, 선신을 부르는 도구', description: '해, 달, 팔선녀 그림', visualCharacteristics: '해(일)와 달(월)이 좌우에 배치되고 중앙에 여덟 선녀가 그려진 화려한 부채입니다. 펼쳤을 때 반원형의 넓은 면적을 차지하며, 대나무 살의 질감과 채색된 한지의 부드움이 공존합니다.' },
    { id: 'bells', name: '칠성방울', meaning: '신을 맞이하고 말을 전하는 파동의 도구', description: '동합금 금속 질감', visualCharacteristics: '일곱 개의 작은 방울이 묶여 있는 형태로, 흔들 때마다 맑고 날카로운 금속성 파동을 일으킵니다. 황동색의 묵직한 질감과 붉은색 매듭 장식이 시각적 포인트입니다.' },
    { id: 'shinkal', name: '신칼/장검', meaning: '액운 절단, 수호의 힘', description: '날카로운 금속성과 신성한 장식', visualCharacteristics: '날카롭고 매끄러운 금속 날을 가진 칼로, 손잡이 부분에는 오색 천(신포)이 길게 늘어져 있어 휘두를 때 역동적인 움직임을 만들어냅니다. 차가운 금속성과 화려한 천의 대비가 특징입니다.' },
    { id: 'gime', name: '기메 (종이무구)', meaning: '신이 하강하는 통로, 신성한 종이 장식', description: '정교하게 오려낸 하얀 종이', visualCharacteristics: '순백의 한지를 정교하게 오려 만든 종이 장식입니다. 얇고 가벼운 종이의 질감이 강조되며, 바람에 흔들리는 섬세한 칼선들이 영적인 통로를 형상화하는 기하학적 패턴을 이룹니다.' },
    { id: 'jijeon_mugu', name: '지전', meaning: '재물과 공양의 상징', description: '종이로 만든 엽전 뭉치', visualCharacteristics: '흰색이나 금색 한지를 엽전 모양으로 오려 길게 꿰어 만든 무구입니다. 겹겹이 쌓인 종이의 층이 풍성한 재물을 연상시키며, 굿판에서 흔들릴 때 발생하는 가벼운 종이의 움직임이 영적인 감응을 시각화합니다.' },
    { id: 'candles', name: '신단 촛불', meaning: '영적인 밝힘과 기원', description: '타오르는 촛불과 연기', visualCharacteristics: '어둠을 밝히는 촛불의 일렁이는 불꽃과 그 위로 피어오르는 가느다란 연기가 특징입니다. 따뜻한 주황빛 광원과 대비되는 주변의 어둠이 신비로운 분위기를 조성하며, 정성 어린 기원의 마음을 시각적으로 전달합니다.' }
  ],
  taboos: [
    '공포영화식 악마 연출 금지',
    '피범벅 고어 무속 금지',
    '전통 근거 없는 짬뽕 신앙 비주얼 금지',
    '지나친 섹슈얼라이징 금지',
    '무속 비하/조롱/밈화 금지',
    '신격을 괴물처럼 묘사하는 것 금지',
    '의례 목적이 없는 허세형 판타지 신전 이미지 금지'
  ]
};

export type ShamanicIntent = 
  | '보호/벽사' 
  | '복/재물' 
  | '치유/회복' 
  | '천도/추모' 
  | '안녕/가정 평화' 
  | '신내림/영적 교감'
  | '학업/합격'
  | '인연/사랑'
  | '사업/번창'
  | '정화/결계'
  | '승진/영전'
  | '태교/순산'
  | '여행/무사고'
  | '소원성취'
  | '건강/장수'
  | '금전/횡재'
  | '구설/차단'
  | '화합/조직'
  | '영감/창의'
  | '심신/안정'
  | '액운/소멸'
  | '귀인/상봉'
  | '터주/수호'
  | '명예/권위'
  | '승리/경쟁'
  | '꿈/해몽'
  | '용기/극복'
  | '지혜/통찰'
  | '매매/성사'
  | '화해/용서';

export const INTENT_CATEGORIES: Record<ShamanicIntent, any> = {
  '보호/벽사': {
    symbols: ['saljang', 'fan', 'shinkal'],
    colors: ['red', 'blue'],
    keywords: ['막아줘', '지켜줘', '나쁜 기운', '액막이', '보호']
  },
  '복/재물': {
    symbols: ['jijeon', 'seongjukkot', 'dragon'],
    colors: ['yellow', 'red'],
    keywords: ['돈', '복', '번창', '풍요', '행운']
  },
  '치유/회복': {
    symbols: ['cheoljjukdae', 'yeonkkot'],
    colors: ['jade', 'green', 'white'],
    keywords: ['치유', '회복', '건강', '위로', '살림']
  },
  '천도/추모': {
    symbols: ['jade', 'green', 'bari', 'bells', 'yeonkkot'],
    colors: ['jade', 'green', 'white'],
    keywords: ['보내다', '떠나다', '편히', '극락', '위령']
  },
  '안녕/가정 평화': {
    symbols: ['seongjukkot', 'jowanggi', 'flower_lattice'],
    colors: ['yellow', 'red', 'blue'],
    keywords: ['가족', '집안', '평안', '화목', '무사안녕']
  },
  '신내림/영적 교감': {
    symbols: ['fan', 'bells'],
    colors: ['red', 'blue', 'yellow', 'purple'],
    keywords: ['신령', '교감', '제의', '하강', '영적 연결']
  },
  '학업/합격': {
    symbols: ['flower_lattice'],
    colors: ['blue', 'yellow', 'white'],
    keywords: ['공부', '합격', '시험', '지혜', '성취']
  },
  '인연/사랑': {
    symbols: ['seongjukkot', 'peach', 'yeonkkot'],
    colors: ['peach', 'red', 'white'],
    keywords: ['사랑', '인연', '결혼', '만남', '화합']
  },
  '사업/번창': {
    symbols: ['jijeon', 'saljang'],
    colors: ['yellow', 'red', 'blue'],
    keywords: ['사업', '성공', '거래', '확장', '번영']
  },
  '정화/결계': {
    symbols: ['saljang', 'jade', 'shinkal', 'white'],
    colors: ['jade', 'blue', 'white'],
    keywords: ['정화', '맑음', '결계', '청정', '기운']
  },
  '승진/영전': {
    symbols: ['seongjukkot'],
    colors: ['blue', 'red', 'purple'],
    keywords: ['승진', '성공', '명예', '지위', '발전']
  },
  '태교/순산': {
    symbols: ['jowanggi', 'cheoljjukdae', 'peach'],
    colors: ['peach', 'green', 'white'],
    keywords: ['아이', '태교', '순산', '생명', '보살핌']
  },
  '여행/무사고': {
    symbols: ['saljang'],
    colors: ['blue', 'yellow', 'white'],
    keywords: ['여행', '안전', '무사고', '길', '동행']
  },
  '소원성취': {
    symbols: ['fan', 'bells', 'seongjukkot'],
    colors: ['red', 'blue', 'yellow', 'jade', 'purple'],
    keywords: ['소원', '성취', '바람', '간절함', '이룸']
  },
  '건강/장수': {
    symbols: ['cheoljjukdae', 'yeonkkot'],
    colors: ['green', 'jade', 'white'],
    keywords: ['장수', '건강', '무병', '장수', '활력']
  },
  '금전/횡재': {
    symbols: ['jijeon', 'yellow'],
    colors: ['yellow', 'red', 'purple'],
    keywords: ['횡재', '금전', '대박', '뜻밖의', '이익']
  },
  '구설/차단': {
    symbols: ['shinkal', 'saljang'],
    colors: ['red', 'blue', 'white'],
    keywords: ['구설', '말썽', '차단', '입막음', '평온']
  },
  '화합/조직': {
    symbols: ['flower_lattice', 'seongjukkot'],
    colors: ['yellow', 'blue', 'red'],
    keywords: ['화합', '단결', '조직', '팀워크', '협력']
  },
  '영감/창의': {
    symbols: ['fan', 'purple'],
    colors: ['purple', 'blue', 'white'],
    keywords: ['영감', '창의', '아이디어', '예술', '직관']
  },
  '심신/안정': {
    symbols: ['yeonkkot', 'jade'],
    colors: ['jade', 'green', 'white'],
    keywords: ['안정', '평온', '명상', '휴식', '평화']
  },
  '액운/소멸': {
    symbols: ['shinkal', 'saljang'],
    colors: ['red', 'white', 'blue'],
    keywords: ['액운', '소멸', '정화', '제거', '청소']
  },
  '귀인/상봉': {
    symbols: ['seongjukkot'],
    colors: ['yellow', 'peach', 'blue'],
    keywords: ['귀인', '도움', '만남', '인연', '협력자']
  },
  '터주/수호': {
    symbols: ['jowanggi', 'saljang'],
    colors: ['yellow', 'red', 'blue'],
    keywords: ['터주', '수호', '땅', '건물', '안전']
  },
  '명예/권위': {
    symbols: ['purple'],
    colors: ['purple', 'red', 'yellow'],
    keywords: ['명예', '권위', '위엄', '인정', '존중']
  },
  '승리/경쟁': {
    symbols: ['shinkal', 'red'],
    colors: ['red', 'blue', 'yellow'],
    keywords: ['승리', '경쟁', '우승', '극복', '쟁취']
  },
  '꿈/해몽': {
    symbols: ['purple', 'bells'],
    colors: ['purple', 'blue', 'white'],
    keywords: ['꿈', '해몽', '예지', '무의식', '메시지']
  },
  '용기/극복': {
    symbols: ['shinkal', 'bari'],
    colors: ['red', 'blue', 'white'],
    keywords: ['용기', '극복', '도전', '의지', '힘']
  },
  '지혜/통찰': {
    symbols: ['jade'],
    colors: ['jade', 'blue', 'white'],
    keywords: ['지혜', '통찰', '안목', '판단', '깨달음']
  },
  '매매/성사': {
    symbols: ['jijeon', 'yellow'],
    colors: ['yellow', 'red', 'blue'],
    keywords: ['매매', '계약', '성사', '거래', '완료']
  },
  '화해/용서': {
    symbols: ['yeonkkot', 'peach', 'white'],
    colors: ['white', 'peach', 'green'],
    keywords: ['화해', '용서', '화합', '풀림', '이해']
  }
};
