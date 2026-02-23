import { http, HttpResponse } from 'msw';

/**
 * 실제 LLM 백엔드(dress_data.py) 기반 12개 웨딩 드레스 스타일 DB
 */
const WEDDING_DRESS_STYLES: Record<
  string,
  {
    description: string;
    styling_tips: string[];
    suitable_for: string[];
  }
> = {
  A라인: {
    description:
      '상체는 슬림하게, 허리부터 A자 형태로 퍼지는 클래식한 스타일. 가장 보편적이고 다양한 체형에 어울리는 만능 실루엣입니다.',
    styling_tips: [
      '하이힐로 다리 라인을 더욱 길어 보이게 연출',
      '심플한 목걸이나 귀걸이로 포인트',
      '업스타일 헤어로 목선 강조',
      '베일은 미디엄 길이가 조화로움',
      '허리 라인에 벨트나 새시로 포인트 가능',
    ],
    suitable_for: ['medium', '짧은 다리', '보통 팔', '짧은 목', '보통 목', 'oval', 'wide'],
  },
  볼가운: {
    description:
      '프린세스 같은 풍성한 스커트가 특징. 동화 속 공주님 같은 화려하고 드라마틱한 느낌을 연출합니다.',
    styling_tips: [
      '티아라나 크라운으로 프린세스 분위기 연출',
      '롱 베일로 드라마틱한 효과',
      '심플한 액세서리로 드레스가 주인공이 되도록',
      '하이힐 필수 (스커트 길이 고려)',
      '볼륨있는 헤어스타일이나 우아한 업스타일',
    ],
    suitable_for: [
      'thin', 'medium', 'heavy',
      '짧은 다리', '보통 다리',
      '긴 목', '보통 목', '넓은 어깨',
      '짧은 팔', '보통 팔',
      'oval', 'long', 'wide',
    ],
  },
  머메이드: {
    description:
      '인어의 꼬리처럼 무릎 아래부터 퍼지는 섹시한 실루엣. 몸매를 그대로 드러내는 글래머러스한 스타일입니다.',
    styling_tips: [
      '자신감 있는 포즈와 워킹 연습 필수',
      '심플한 귀걸이와 팔찌로 우아함 더하기',
      '다운 헤어나 웨이브로 여성스러움 강조',
      '누드톤 하이힐로 다리 라인 연장',
      '보정 속옷으로 완벽한 실루엣 완성',
    ],
    suitable_for: [
      'thin', 'medium',
      '긴 다리', '보통 다리',
      '긴 목', '보통 목',
      '긴 팔', '보통 팔',
      'oval', 'wide', 'angular', 'long',
    ],
  },
  엠파이어: {
    description:
      '가슴 바로 아래에서 시작되는 하이 웨이스트 라인이 특징. 편안하면서도 우아한 느낌을 줍니다.',
    styling_tips: [
      '롱 베일로 로맨틱한 분위기 강조',
      '섬세한 헤어 액세서리나 화관',
      '자연스러운 웨이브 헤어',
      '심플한 샌들이나 로우힐도 어울림',
      '목선 강조하는 목걸이',
    ],
    suitable_for: [
      'thin', 'medium', 'heavy',
      '짧은 다리', '보통 다리', '긴 다리',
      '긴 목', '보통 목',
      '짧은 팔', '보통 팔', '긴 팔',
      'oval', 'long', 'wide',
    ],
  },
  시스: {
    description:
      '몸에 자연스럽게 떨어지는 슬림한 실루엣. 미니멀하고 모던한 느낌의 세련된 스타일입니다.',
    styling_tips: [
      '볼드한 액세서리로 포인트',
      '스트레이트 헤어나 세련된 업스타일',
      '스테이트먼트 귀걸이나 목걸이',
      '미니멀한 부케',
      '샤프한 하이힐로 스타일 완성',
    ],
    suitable_for: [
      'thin',
      '긴 다리', '보통 다리',
      '긴 목', '보통 목',
      '짧은 팔', '보통 팔', '긴 팔',
      'oval', 'wide', 'angular', 'long',
    ],
  },
  트럼펫: {
    description:
      '머메이드와 유사하지만 무릎 위 허벅지 중간부터 퍼지는 스타일. 머메이드보다 움직임이 편안합니다.',
    styling_tips: [
      '미디엄 길이 베일로 균형감',
      '세련된 업스타일 헤어',
      '우아한 목걸이와 귀걸이',
      '하이힐로 다리 라인 연장',
      '클래식한 부케',
    ],
    suitable_for: [
      'thin', 'medium',
      '긴 다리', '보통 다리',
      '긴 목', '보통 목',
      '짧은 팔', '보통 팔', '긴 팔',
      'oval', 'wide', 'angular', 'long',
    ],
  },
  프린세스: {
    description:
      '볼가운과 유사하지만 더 풍성하고 화려한 스타일. 최고의 드라마틱함을 원하는 신부에게 완벽합니다.',
    styling_tips: [
      '티아라나 왕관으로 공주님 컨셉 완성',
      '카테드럴 베일로 웅장함 더하기',
      '화려한 헤어 업스타일',
      '심플한 액세서리로 밸런스',
      '드라마틱한 부케',
    ],
    suitable_for: [
      'thin', 'medium', 'heavy',
      '짧은 다리', '보통 다리', '긴 다리',
      '긴 목', '보통 목',
      '짧은 팔', '보통 팔',
      'oval', 'long', 'wide',
    ],
  },
  슬립드레스: {
    description:
      '속옷에서 영감을 받은 미니멀한 스타일. 실크 같은 소재로 흘러내리는 듯한 우아함이 특징입니다.',
    styling_tips: [
      '섬세한 레이어드 목걸이',
      '자연스러운 웨이브 헤어',
      '미니멀한 귀걸이',
      '누드톤 스트랩 샌들',
      '작고 심플한 부케',
    ],
    suitable_for: [
      'thin',
      '긴 다리', '보통 다리',
      '긴 목', '보통 목',
      '짧은 팔', '보통 팔', '긴 팔',
      'oval', 'wide', 'angular', 'long',
    ],
  },
  티어드: {
    description:
      '여러 겹의 레이어가 층층이 쌓인 로맨틱한 스타일. 움직일 때마다 풍성하게 펼쳐지는 매력이 있습니다.',
    styling_tips: [
      '자연스러운 웨이브나 반묶음 헤어',
      '빈티지 액세서리',
      '화관이나 꽃 헤어핀',
      '레이스 베일',
      '와일드 플라워 부케',
    ],
    suitable_for: [
      'thin', 'medium', 'heavy',
      '긴 다리', '보통 다리', '짧은 다리',
      '짧은 목', '보통 목', '긴 목',
      '짧은 팔', '보통 팔', '긴 팔',
      'oval', 'wide', 'angular',
    ],
  },
  '하이-로우': {
    description:
      '앞은 짧고 뒤는 긴 비대칭 헴라인. 다리를 드러내면서도 드레스의 우아함을 유지하는 독특한 스타일입니다.',
    styling_tips: [
      '스테이트먼트 슈즈로 포인트 (발목이 보이니까)',
      '세련된 업스타일로 균형',
      '볼드한 귀걸이',
      '짧은 베일이나 베일 없이',
      '컴팩트한 부케',
    ],
    suitable_for: [
      'thin', 'medium',
      '긴 다리', '보통 다리',
      '긴 목', '보통 목',
      '짧은 팔', '보통 팔', '긴 팔',
      'oval', 'wide', 'angular', 'long',
    ],
  },
  오프숄더: {
    description:
      '어깨를 드러내는 네크라인으로 우아하고 로맨틱한 분위기. 쇄골과 목선을 아름답게 강조합니다.',
    styling_tips: [
      '목걸이보다는 귀걸이로 포인트',
      '다운 헤어나 한쪽으로 넘긴 헤어',
      '쇄골라인 강조하는 메이크업',
      '어깨 라인 관리 중요',
      '심플한 팔찌나 링',
    ],
    suitable_for: [
      'thin', 'medium', 'heavy',
      '긴 다리', '보통 다리', '짧은 다리',
      '긴 목', '보통 목',
      '짧은 팔', '보통 팔',
      'oval', 'wide', 'angular', 'long',
    ],
  },
  홀터넥: {
    description:
      '목 뒤에서 묶이는 스타일로 등과 어깨를 드러냅니다. 섹시하면서도 우아한 느낌을 줍니다.',
    styling_tips: [
      '업스타일 헤어 필수',
      '스테이트먼트 귀걸이',
      '목걸이는 생략 (네크라인 방해)',
      '등 라인 관리 중요',
      '하이힐로 전체 비율 맞추기',
    ],
    suitable_for: [
      'thin', 'medium',
      '긴 다리', '보통 다리',
      '긴 목', '보통 목', '넓은 어깨',
      '긴 팔', '보통 팔',
      'angular', 'oval', 'wide',
    ],
  },
};

/**
 * 사용자 체형 정보를 기반으로 suitable_for 매칭 점수 계산
 */
function calculateMatchScore(
  suitableFor: string[],
  params: {
    body_type: string;
    arm_length: string;
    leg_length: string;
    neck_length: string;
    face_shape: string;
  }
): number {
  let score = 0;

  // body_type 매칭 (가장 중요)
  if (suitableFor.includes(params.body_type)) score += 3;

  // 팔 길이 매칭
  const armMap: Record<string, string> = { short: '짧은 팔', medium: '보통 팔', long: '긴 팔' };
  if (suitableFor.includes(armMap[params.arm_length])) score += 1;

  // 다리 길이 매칭
  const legMap: Record<string, string> = { short: '짧은 다리', medium: '보통 다리', long: '긴 다리' };
  if (suitableFor.includes(legMap[params.leg_length])) score += 1;

  // 목 길이 매칭
  const neckMap: Record<string, string> = { short: '짧은 목', medium: '보통 목', long: '긴 목' };
  if (suitableFor.includes(neckMap[params.neck_length])) score += 1;

  // 얼굴형 매칭
  if (suitableFor.includes(params.face_shape)) score += 1;

  return score;
}

/**
 * 체형별 왜 추천되는지 설명 생성
 */
function generateWhyRecommended(styleName: string, bodyType: string): string {
  const bodyLabel = bodyType === 'thin' ? '마른' : bodyType === 'heavy' ? '통통한' : '보통';
  const reasons: Record<string, Record<string, string>> = {
    A라인: {
      thin: '마른 체형에 A라인은 자연스러운 곡선미를 부여하여 여성스러운 실루엣을 완성합니다.',
      medium: '보통 체형에 A라인은 신체 비율을 가장 이상적으로 보여주는 클래식한 선택입니다.',
      heavy: '통통한 체형에 A라인은 하체를 자연스럽게 커버하면서 날씬해 보이는 효과를 줍니다.',
    },
    볼가운: {
      thin: '마른 체형에 볼가운은 풍성한 볼륨감을 더해 균형 잡힌 실루엣을 만들어줍니다.',
      medium: '보통 체형에 볼가운은 허리를 강조하고 드라마틱한 분위기를 연출합니다.',
      heavy: '통통한 체형에 볼가운은 풍성한 스커트로 하체 비율을 보완하고 허리를 강조합니다.',
    },
    머메이드: {
      thin: '마른 체형에 머메이드는 몸의 라인을 따라 세련된 실루엣을 만들어줍니다.',
      medium: '보통 체형에 머메이드 드레스는 자연스러운 곡선미를 극대화하여 세련된 실루엣을 완성합니다.',
      heavy: '통통한 체형에도 잘 맞는 머메이드 라인으로 우아한 곡선미를 연출할 수 있습니다.',
    },
    엠파이어: {
      thin: '마른 체형에 엠파이어 라인은 가벼운 소재의 흐름으로 우아한 분위기를 연출합니다.',
      medium: '보통 체형에 엠파이어 라인은 편안하면서도 우아한 실루엣을 만들어줍니다.',
      heavy: '통통한 체형에 엠파이어 라인은 복부를 자연스럽게 가려주며 우아한 라인을 만듭니다.',
    },
    시스: {
      thin: '마른 체형에 시스 드레스는 깔끔한 직선 라인으로 모던하고 세련된 이미지를 완성합니다.',
      medium: '보통 체형에 시스 드레스는 깔끔한 라인으로 세련되고 모던한 이미지를 만들어줍니다.',
      heavy: '통통한 체형에도 자연스럽게 떨어지는 시스 라인으로 편안하고 세련된 느낌을 줍니다.',
    },
  };

  return reasons[styleName]?.[bodyType] || `${bodyLabel} 체형에 ${styleName} 스타일은 체형의 장점을 살려주는 추천 드레스입니다.`;
}

export const recommendHandlers = [
  http.post('/api/recommend', async ({ request }) => {
    const body = (await request.json()) as {
      arm_length: string;
      leg_length: string;
      neck_length: string;
      face_shape: string;
      body_type: string;
      num_recommendations: number;
    };

    const count = body.num_recommendations || 3;

    // 모든 스타일에 대해 매칭 점수 계산
    const scored = Object.entries(WEDDING_DRESS_STYLES).map(([name, style]) => ({
      name,
      style,
      score: calculateMatchScore(style.suitable_for, body),
    }));

    // 점수 높은 순으로 정렬
    scored.sort((a, b) => b.score - a.score);

    // 상위 N개 추천
    const recommendations = scored.slice(0, count).map(({ name, style }) => ({
      style_name: name,
      description: style.description,
      why_recommended: generateWhyRecommended(name, body.body_type),
      styling_tips: style.styling_tips,
    }));

    const bodyLabel = body.body_type === 'thin' ? '마른' : body.body_type === 'heavy' ? '통통한' : '보통';

    // 딜레이로 AI 응답 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return HttpResponse.json({
      success: true,
      data: {
        request_params: {
          body_type: body.body_type,
          arm_length: body.arm_length,
          face_shape: body.face_shape,
          leg_length: body.leg_length,
          neck_length: body.neck_length,
          num_recommendations: count,
        },
        recommendations,
        overall_advice: `${bodyLabel} 체형에는 체형의 장점을 살리면서 균형감 있는 실루엣을 만들어주는 드레스가 좋습니다. 피팅 시 여러 스타일을 직접 입어보시고, 거울 앞에서 움직여보며 가장 편안하고 아름다운 드레스를 선택하세요.`,
        cached: false,
      },
    });
  }),
];
