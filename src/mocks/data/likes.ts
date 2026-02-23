import { LikesType } from '@/types/likes';
import type { LikesResponse } from '@/types/likes';
import { mockDresses } from './dress';
import { mockDressShops } from './dressShop';
import { mockWeddingHalls } from './weddingHall';
import { mockMakeupShops } from './makeupShop';
import { mockHalls } from './hall';

export const mockLikes: LikesResponse[] = [
  {
    id: 1,
    likesType: LikesType.DRESS,
    targetId: 1,
    updateDt: '2026-02-10T10:00:00',
    itemDetails: mockDresses[0],
  },
  {
    id: 2,
    likesType: LikesType.DRESS,
    targetId: 4,
    updateDt: '2026-02-11T10:00:00',
    itemDetails: mockDresses[3],
  },
  {
    id: 3,
    likesType: LikesType.DRESS_SHOP,
    targetId: 1,
    updateDt: '2026-02-12T10:00:00',
    itemDetails: mockDressShops[0],
  },
  {
    id: 4,
    likesType: LikesType.WEDDING_HALL,
    targetId: 1,
    updateDt: '2026-02-13T10:00:00',
    itemDetails: mockWeddingHalls[0],
  },
  {
    id: 5,
    likesType: LikesType.MAKEUP_SHOP,
    targetId: 1,
    updateDt: '2026-02-14T10:00:00',
    itemDetails: mockMakeupShops[0],
  },
  {
    id: 6,
    likesType: LikesType.HALL,
    targetId: 1,
    updateDt: '2026-02-15T10:00:00',
    itemDetails: mockHalls[0],
  },
];
