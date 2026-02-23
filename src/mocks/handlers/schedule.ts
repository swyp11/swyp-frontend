import { http, HttpResponse } from 'msw';
import { mockSchedules } from '../data';
import type { ScheduleResponse, ScheduleMonthResponse, ScheduleWeekResponse } from '@/types/schedule';

let schedules: ScheduleResponse[] = [...mockSchedules];
let nextId = schedules.length + 1;

export const scheduleHandlers = [
  // 일정 생성
  http.post('/api/schedule', async ({ request }) => {
    const body = (await request.json()) as Partial<ScheduleResponse>;
    const now = new Date().toISOString();
    const newSchedule: ScheduleResponse = {
      id: nextId++,
      serviceType: body.serviceType || 'WEDDING',
      userId: 1,
      title: body.title || '새 일정',
      memo: body.memo,
      startDate: body.startDate || new Date().toISOString().split('T')[0],
      endDate: body.endDate || new Date().toISOString().split('T')[0],
      startTime: body.startTime,
      endTime: body.endTime,
      createdAt: now,
      updatedAt: now,
    };
    schedules.push(newSchedule);
    return HttpResponse.json({ success: true, data: newSchedule });
  }),

  // 월별 일정 조회
  http.get('/api/schedule/month', ({ request }) => {
    const url = new URL(request.url);
    const year = Number(url.searchParams.get('year'));
    const month = Number(url.searchParams.get('month'));

    const filtered = schedules.filter((s) => {
      const d = new Date(s.startDate);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });

    // 날짜별 그룹핑
    const grouped = new Map<string, ScheduleResponse[]>();
    filtered.forEach((s) => {
      const existing = grouped.get(s.startDate) || [];
      existing.push(s);
      grouped.set(s.startDate, existing);
    });

    const result: ScheduleMonthResponse[] = Array.from(grouped.entries()).map(
      ([date, daySchedules]) => ({ date, schedules: daySchedules })
    );

    return HttpResponse.json({ success: true, data: result });
  }),

  // 주별 일정 조회
  http.get('/api/schedule/week', ({ request }) => {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate') || '';
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    const filtered = schedules.filter((s) => {
      const d = new Date(s.startDate);
      return d >= start && d <= end;
    });

    const result: ScheduleWeekResponse[] = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(start);
      current.setDate(current.getDate() + i);
      const dateStr = current.toISOString().split('T')[0];
      const daySchedules = filtered.filter((s) => s.startDate === dateStr);
      result.push({
        date: dateStr,
        dayOfWeek: current.getDay() === 0 ? 7 : current.getDay(),
        schedules: daySchedules,
      });
    }

    return HttpResponse.json({ success: true, data: result });
  }),

  // 일별 일정 조회
  http.get('/api/schedule/day', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || '';
    const result = schedules.filter((s) => s.startDate === date);
    return HttpResponse.json({ success: true, data: result });
  }),

  // 일정 상세 조회
  http.get('/api/schedule/:id', ({ params }) => {
    const schedule = schedules.find((s) => s.id === Number(params.id));
    if (!schedule) {
      return HttpResponse.json(
        { success: false, error: '일정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ success: true, data: schedule });
  }),

  // 일정 수정
  http.put('/api/schedule/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<ScheduleResponse>;
    const index = schedules.findIndex((s) => s.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(
        { success: false, error: '일정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    schedules[index] = {
      ...schedules[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json({ success: true, data: schedules[index] });
  }),

  // 일정 삭제
  http.delete('/api/schedule/:id', ({ params }) => {
    schedules = schedules.filter((s) => s.id !== Number(params.id));
    return HttpResponse.json({ success: true, data: true });
  }),
];
