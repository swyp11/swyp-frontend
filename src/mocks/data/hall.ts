import type { HallResponse } from '@/types/weddingHall';

export const mockHalls: HallResponse[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: [
    '그랜드볼룸', '크리스탈홀', '가든테라스',
    '스카이라운지', '더채플', '루미에르홀',
    '프레스티지홀', '로즈가든', '헤리티지홀',
    '셀레스트홀', '다이아몬드홀', '플래티넘홀',
    '에메랄드홀', '사파이어홀', '오팔홀',
  ][i],
  capacityMin: [100, 80, 50, 60, 40, 120, 150, 30, 200, 90, 180, 160, 70, 110, 55][i],
  capacityMax: [300, 200, 150, 120, 80, 250, 400, 60, 500, 180, 350, 300, 140, 220, 100][i],
  hallType: ['GRAND_BALLROOM', 'CONVENTION', 'GARDEN', 'SKY_LOUNGE', 'CHAPEL', 'CONVENTION', 'GRAND_BALLROOM', 'GARDEN', 'GRAND_BALLROOM', 'SKY_LOUNGE', 'GRAND_BALLROOM', 'CONVENTION', 'CHAPEL', 'CONVENTION', 'SMALL_GATHERING'][i],
  floorNo: [1, 2, 1, 15, 1, 3, 2, 1, 1, 20, 2, 3, 1, 4, 1][i],
  lightType: ['MIXED', 'ARTIFICIAL', 'NATURAL', 'NATURAL', 'MIXED', 'ARTIFICIAL', 'MIXED', 'NATURAL', 'MIXED', 'NATURAL', 'ARTIFICIAL', 'MIXED', 'NATURAL', 'ARTIFICIAL', 'NATURAL'][i],
  areaM2: [500, 350, 200, 180, 120, 400, 600, 80, 800, 250, 550, 450, 150, 300, 100][i],
  ceilingHeight: [8, 6, 4, 5, 7, 6, 9, 3.5, 10, 5.5, 8.5, 7, 6, 5, 4][i],
  stage: [true, true, false, false, true, true, true, false, true, false, true, true, false, true, false][i],
  ledWall: [true, true, false, false, false, true, true, false, true, true, true, true, false, true, false][i],
  aisleLength: [20, 15, 10, 8, 12, 18, 25, 6, 30, 12, 22, 20, 8, 16, 7][i],
  pillar: [false, false, false, false, false, true, false, false, true, false, false, true, false, false, false][i],
  status: true,
  desc: [
    '최대 300명 수용 가능한 대형 연회홀', '크리스탈 샹들리에가 빛나는 홀',
    '자연 채광이 아름다운 가든 웨딩', '도심 스카이라인이 보이는 라운지',
    '엄숙한 채플 웨딩', '루미에르 조명의 우아한 공간',
    '프리미엄 대형 연회장', '소규모 프라이빗 가든',
    '500명 수용 대규모 행사장', '하늘이 보이는 스카이 웨딩',
    '다이아몬드 컨셉의 럭셔리 홀', '널찍한 플래티넘 연회장',
    '아담한 채플 분위기', '중대형 컨벤션 홀', '소규모 모임 전용 홀',
  ][i],
  regDt: `2026-0${Math.min(i % 3 + 1, 2)}-${String(10 + i).slice(0, 2)}T10:00:00`,
  imageUrl: `/images/tb_hall/tb_hall_${i + 1}.png`,
}));

// 웨딩홀 ID → 홀 매핑 (각 웨딩홀에 2~3개 홀)
export const weddingHallToHalls: Record<number, number[]> = {
  1: [1, 2, 3],
  2: [4, 5],
  3: [6, 7],
  4: [8, 9],
  5: [10, 11],
  6: [12, 13],
  7: [14, 15],
};
