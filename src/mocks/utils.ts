/**
 * 배열을 Spring Data PageResponse 형태로 변환
 */
export function toPageResponse<T>(
  items: T[],
  page = 0,
  size = 20
) {
  const start = page * size;
  const content = items.slice(start, start + size);
  const totalElements = items.length;
  const totalPages = Math.ceil(totalElements / size);

  return {
    content,
    pageable: {
      pageNumber: page,
      pageSize: size,
      sort: [],
      offset: start,
      unpaged: false,
      paged: true,
    },
    totalPages,
    totalElements,
    last: page >= totalPages - 1,
    size,
    number: page,
    sort: [],
    numberOfElements: content.length,
    first: page === 0,
    empty: content.length === 0,
  };
}
