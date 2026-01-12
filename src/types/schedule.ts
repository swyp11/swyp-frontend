/**
 * 일정 관련 타입 정의
 * Backend DTO와 정확히 일치하도록 작성
 */

// 서비스 타입 (백엔드 ServiceType enum과 일치)
export type ServiceType =
  | 'AUTH'
  | 'USER'
  | 'BOOK'
  | 'TICKETING'
  | 'TRAVEL'
  | 'FESTIVAL'
  | 'WEDDING';

// 일정 등록/수정 요청
export interface ScheduleRequest {
  serviceType: ServiceType;       // 필수: 서비스 타입
  refId?: number;                 // 선택: 원본 서비스의 ID
  title: string;                  // @NotNull in backend
  memo?: string;                  // description → memo (백엔드 DTO에 맞춤)
  startDate: string;              // LocalDate → string (YYYY-MM-DD)
  endDate: string;                // LocalDate → string (YYYY-MM-DD)
  startTime?: string;             // LocalTime → string (HH:mm:ss)
  endTime?: string;               // LocalTime → string (HH:mm:ss)
}

// 일정 응답
export interface ScheduleResponse {
  id: number;
  serviceType: ServiceType;       // 서비스 타입
  refId?: number;                 // 원본 서비스의 ID
  userId: number;
  title: string;
  memo?: string;                  // description → memo (백엔드 DTO에 맞춤)
  startDate: string;              // LocalDate → string (YYYY-MM-DD)
  endDate: string;                // LocalDate → string (YYYY-MM-DD)
  startTime?: string;             // LocalTime → string (HH:mm:ss)
  endTime?: string;               // LocalTime → string (HH:mm:ss)
  createdAt: string;              // LocalDateTime → string (ISO-8601)
  updatedAt: string;              // LocalDateTime → string (ISO-8601)
}

// 월별 일정 응답
export interface ScheduleMonthResponse {
  date: string;                   // LocalDate → string (YYYY-MM-DD)
  schedules: ScheduleResponse[];  // Backend uses 'schedules', not 'events'
}

// 주별 일정 응답
export interface ScheduleWeekResponse {
  date: string;                   // LocalDate → string (YYYY-MM-DD)
  dayOfWeek: number;              // int in backend (1-7, Monday-Sunday)
  schedules: ScheduleResponse[];  // Backend uses 'schedules', not 'events'
}
