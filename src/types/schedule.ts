/**
 * 일정 관련 타입 정의
 * Backend DTO와 정확히 일치하도록 작성
 */

// 일정 등록/수정 요청
export interface ScheduleRequest {
  title: string;                  // @NotNull in backend
  description?: string;
  scheduleDate: string;           // @NotNull in backend, LocalDate → string (YYYY-MM-DD)
  startTime?: string;             // LocalTime → string (HH:mm:ss)
  endTime?: string;               // LocalTime → string (HH:mm:ss)
  location?: string;
}

// 일정 응답
export interface ScheduleResponse {
  id: number;
  userId: number;
  title: string;
  description?: string;
  scheduleDate: string;           // LocalDate → string (YYYY-MM-DD)
  startTime?: string;             // LocalTime → string (HH:mm:ss)
  endTime?: string;               // LocalTime → string (HH:mm:ss)
  location?: string;
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
