import { WeddingHallVenueType } from '@/types/weddingHall';
import type { WeddingHallResponse } from '@/types/weddingHall';

const venueTypes: WeddingHallVenueType[] = [
  WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL,
  WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL, WeddingHallVenueType.CONVENTION,
  WeddingHallVenueType.HOUSE, WeddingHallVenueType.HOUSE, WeddingHallVenueType.CONVENTION,
  WeddingHallVenueType.HOUSE, WeddingHallVenueType.CONVENTION, WeddingHallVenueType.CONVENTION,
  WeddingHallVenueType.CONVENTION, WeddingHallVenueType.CONVENTION, WeddingHallVenueType.HOUSE,
  WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL,
  WeddingHallVenueType.CONVENTION, WeddingHallVenueType.HOTEL,
];

export const mockWeddingHalls: WeddingHallResponse[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: [
    '더 라움', '그랜드 하얏트 서울', '신라호텔 웨딩홀',
    '롯데호텔 크리스탈볼룸', '르메르디앙 서울', '아펠가모 양재',
    '더 채플앳청담', '앨리스 가든', '노블발렌티 수서',
    '빌라드지디', '루이비스 컨벤션', '소노펠리체',
    '더컨벤션 강남', '그랜드힐 컨벤션', '아모리스홀',
    '포시즌스 서울', '파크하얏트 서울', '반얀트리 클럽',
    '세빌리아 웨딩홀', '더 리버사이드 호텔',
  ][i],
  address: [
    '서울시 강남구 역삼동', '서울시 용산구 한남동',
    '서울시 중구 장충동', '서울시 중구 소공동',
    '서울시 강남구 역삼동', '서울시 서초구 양재동',
    '서울시 강남구 청담동', '서울시 서초구 서초동',
    '서울시 강남구 수서동', '서울시 마포구 합정동',
    '서울시 강남구 논현동', '서울시 서초구 방배동',
    '서울시 강남구 대치동', '서울시 송파구 잠실동',
    '서울시 강남구 삼성동', '서울시 종로구 새문안로',
    '서울시 강남구 테헤란로', '서울시 중구 장충동',
    '서울시 서초구 반포동', '서울시 영등포구 여의도동',
  ][i],
  phone: `02-${String(2000 + i).slice(0, 4)}-${String(7000 + i * 100).slice(0, 4)}`,
  email: `wedding${i + 1}@example.com`,
  parking: [200, 300, 500, 150, 250, 100, 80, 120, 180, 350, 400, 160, 220, 280, 190, 600, 450, 230, 170, 310][i],
  imageUrl: `/images/tb_wedding_hall/tb_wedding_hall_${i + 1}.png`,
  venueType: venueTypes[i],
  isLiked: i % 4 === 0,
}));
