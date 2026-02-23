import { authHandlers } from './auth';
import { userHandlers } from './user';
import { dressHandlers } from './dress';
import { dressShopHandlers } from './dressShop';
import { weddingHallHandlers } from './weddingHall';
import { hallHandlers } from './hall';
import { makeupShopHandlers } from './makeupShop';
import { likesHandlers } from './likes';
import { scheduleHandlers } from './schedule';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...dressHandlers,
  ...dressShopHandlers,
  ...weddingHallHandlers,
  ...hallHandlers,
  ...makeupShopHandlers,
  ...likesHandlers,
  ...scheduleHandlers,
];
