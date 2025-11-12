/**
 * 일정 관련 타입 정의
 */

// 일정 응답
export interface ScheduleResponse {
  id: number;
  userId?: number;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  category?: ScheduleCategory;
  isAllDay?: boolean;
  reminder?: number; // 알림 (분 단위)
  createdAt?: string;
  updatedAt?: string;
}

// 일정 등록/수정 요청
export interface ScheduleRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  category?: ScheduleCategory;
  isAllDay?: boolean;
  reminder?: number;
}

// 월별 일정 응답
export interface ScheduleMonthResponse {
  date: string;
  events: ScheduleResponse[];
}

// 주별 일정 응답
export interface ScheduleWeekResponse {
  date: string;
  dayOfWeek: number;
  events: ScheduleResponse[];
}

// 일정 카테고리
export type ScheduleCategory =
  | 'WEDDING_HALL'
  | 'DRESS'
  | 'MAKEUP'
  | 'PHOTO'
  | 'INVITATION'
  | 'CEREMONY'
  | 'MEETING'
  | 'OTHER';
