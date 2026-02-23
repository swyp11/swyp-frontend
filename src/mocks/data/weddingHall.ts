import { WeddingHallVenueType } from '@/types/weddingHall';
import type { WeddingHallResponse } from '@/types/weddingHall';

const hallNames = [
  '더 라움', '그랜드 하얏트 서울', '신라호텔 웨딩홀',
  '롯데호텔 크리스탈볼룸', '르메르디앙 서울', '아펠가모 양재',
  '더 채플앳청담', '앨리스 가든', '노블발렌티 수서',
  '빌라드지디', '루이비스 컨벤션', '소노펠리체',
  '더컨벤션 강남', '그랜드힐 컨벤션', '아모리스홀',
  '포시즌스 서울', '파크하얏트 서울', '반얀트리 클럽',
  '세빌리아 웨딩홀', '더 리버사이드 호텔',
];

const addresses = [
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
];

const venueTypes: WeddingHallVenueType[] = [
  WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL,
  WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL, WeddingHallVenueType.CONVENTION,
  WeddingHallVenueType.HOUSE, WeddingHallVenueType.HOUSE, WeddingHallVenueType.CONVENTION,
  WeddingHallVenueType.HOUSE, WeddingHallVenueType.CONVENTION, WeddingHallVenueType.CONVENTION,
  WeddingHallVenueType.CONVENTION, WeddingHallVenueType.CONVENTION, WeddingHallVenueType.HOUSE,
  WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL, WeddingHallVenueType.HOTEL,
  WeddingHallVenueType.CONVENTION, WeddingHallVenueType.HOTEL,
];

const hallTypes = [
  'HOTEL', 'HOTEL', 'HOTEL', 'HOTEL', 'HOTEL',
  'CONVENTION', 'HOUSE', 'HOUSE', 'CONVENTION', 'HOUSE',
  'CONVENTION', 'CONVENTION', 'CONVENTION', 'CONVENTION', 'HOUSE',
  'HOTEL', 'HOTEL', 'HOTEL', 'CONVENTION', 'HOTEL',
];

export const mockWeddingHalls: WeddingHallResponse[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: hallNames[i],
  address: addresses[i],
  hallType: hallTypes[i],
  description: `${hallNames[i]} - 프리미엄 웨딩 서비스`,
  minGuarantee: [100, 150, 200, 120, 80, 60, 50, 40, 100, 70, 130, 90, 110, 140, 50, 200, 180, 150, 80, 120][i],
  maxCapacity: [300, 500, 400, 350, 250, 200, 150, 100, 300, 180, 350, 280, 320, 400, 120, 600, 450, 300, 200, 350][i],
  mealPrice: [80000, 120000, 100000, 90000, 70000, 65000, 60000, 55000, 85000, 60000, 75000, 70000, 80000, 95000, 50000, 150000, 130000, 110000, 65000, 90000][i],
  hallRentalPrice: [3000000, 5000000, 4500000, 4000000, 2500000, 2000000, 1500000, 1000000, 3500000, 1800000, 2800000, 2200000, 3000000, 3800000, 1200000, 8000000, 6000000, 5000000, 2000000, 3500000][i],
  coverImage: `/images/tb_wedding_hall/tb_wedding_hall_${i + 1}.png`,
  imageUrl: `/images/tb_wedding_hall/tb_wedding_hall_${i + 1}.png`,
  avgRating: [4.8, 4.9, 4.7, 4.6, 4.5, 4.4, 4.8, 4.3, 4.5, 4.2, 4.6, 4.4, 4.3, 4.5, 4.7, 4.9, 4.8, 4.7, 4.3, 4.5][i],
  reviewCount: [120, 250, 180, 150, 90, 60, 45, 30, 100, 55, 130, 80, 110, 140, 35, 300, 220, 160, 50, 95][i],
  bookmarkCount: [200, 400, 300, 250, 150, 100, 80, 50, 180, 90, 220, 130, 170, 230, 60, 500, 380, 280, 80, 160][i],
  phone: `02-${String(2000 + i).slice(0, 4)}-${String(7000 + i * 100).slice(0, 4)}`,
  email: `wedding${i + 1}@example.com`,
  parking: [200, 300, 500, 150, 250, 100, 80, 120, 180, 350, 400, 160, 220, 280, 190, 600, 450, 230, 170, 310][i],
  venueType: venueTypes[i],
  isLiked: i % 4 === 0,
}));
