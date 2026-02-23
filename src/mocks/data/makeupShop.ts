import type { MakeupShopResponse } from '@/types/shop';

const names = [
  '르누아 메이크업', '글로우업 스튜디오', '뷰티메종', '아뜰리에 드 뷰티',
  '메이크업바이제이', '블러썸뷰티', '라뷰 스튜디오', '디올라 메이크업',
  '셀레나 뷰티', '프리마 메이크업', '로즈골드 뷰티', '비비안 스튜디오',
  '엘르 메이크업', '글래머러스 뷰티', '미뉴에트 스튜디오',
  '샤넬리아 메이크업', '크리스틴 뷰티', '플라워바이 뷰티',
  '러블리 메이크업', '아이리스 스튜디오', '퓨어뷰티', '소피아 메이크업',
  '벨라 뷰티샵', '루시드 스튜디오', '메이로즈 뷰티',
];

const descriptions = [
  '자연스러운 글로우 메이크업 전문', '트렌디한 메이크업 전문 스튜디오',
  '프랑스 감성 뷰티 하우스', '아뜰리에 스타일 프리미엄 메이크업',
  '연예인 담당 아티스트 운영', '피부결 살리는 메이크업',
  '자연광 스튜디오 보유', '럭셔리 메이크업 서비스',
  '셀럽 전문 메이크업', '프리미엄 웨딩 메이크업',
  '로즈골드 컨셉 전문', '빈티지 감성 메이크업',
  '엘르 추천 뷰티샵', '화려한 글래머 메이크업',
  '우아한 클래식 스타일', '하이엔드 메이크업 전문',
  '자연스러운 생얼 메이크업', '꽃 장식 헤어 전문',
  '사랑스러운 웨딩 메이크업', '아이리스 컨셉 전문',
  '순수한 뷰티 스타일', '소피아 감성 메이크업',
  '벨라 프리미엄 뷰티', '투명한 피부 메이크업',
  '장미 컨셉 뷰티 전문',
];

const addresses = [
  '서울시 강남구 청담동', '서울시 서초구 반포동',
  '서울시 마포구 연남동', '서울시 용산구 한남동',
  '서울시 강남구 신사동', '서울시 송파구 잠실동',
  '서울시 강남구 압구정동', '서울시 서초구 서초동',
  '서울시 강남구 역삼동', '서울시 중구 명동',
  '서울시 서초구 방배동', '서울시 강남구 논현동',
  '서울시 종로구 삼청동', '서울시 성북구 성북동',
  '서울시 서대문구 연희동', '서울시 용산구 이태원동',
  '서울시 마포구 합정동', '서울시 강동구 천호동',
  '서울시 영등포구 여의도동', '서울시 송파구 방이동',
  '서울시 강남구 대치동', '서울시 서초구 잠원동',
  '서울시 마포구 서교동', '서울시 강남구 도곡동',
  '서울시 성동구 성수동',
];

const serviceTypes = ['WEDDING', 'STUDIO', 'PERSONAL', 'SPECIAL_EVENT', 'BRIDAL'];
const specialties = ['글로우 메이크업', '내추럴 메이크업', '글래머 메이크업', '빈티지 메이크업', '클래식 메이크업'];

export const mockMakeupShops: MakeupShopResponse[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: names[i],
  shopName: names[i],
  address: addresses[i],
  serviceType: serviceTypes[i % 5],
  basePrice: [150000, 200000, 250000, 180000, 300000][i % 5],
  coverImage: `/images/tb_makeup_shop/tb_makeup_shop_${i + 1}.png`,
  imageUrl: `/images/tb_makeup_shop/tb_makeup_shop_${i + 1}.png`,
  phone: `02-${String(3000 + i).slice(0, 4)}-${String(8000 + i * 100).slice(0, 4)}`,
  snsUrl: `https://instagram.com/makeupshop${i + 1}`,
  specialty: specialties[i % 5],
  avgRating: [4.8, 4.5, 4.9, 4.3, 4.7][i % 5],
  onSiteAvailable: i % 3 !== 0,
  bookmarkCount: Math.floor(Math.random() * 200) + 10,
  isLiked: i % 5 === 0,
}));
