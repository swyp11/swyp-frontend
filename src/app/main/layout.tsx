import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "메인 - 드레스샵 찾기",
  // description: "웨딩홀, 드레스, 메이크업샵을 찾아보세요. 인기있는 드레스샵과 지역별 매장을 확인할 수 있습니다.",
  description: "웨딩홀, 드레스을 찾아보세요. 인기있는 드레스샵과 지역별 매장을 확인할 수 있습니다.",
  keywords: ["웨딩", "드레스", "웨딩홀", "메이크업샵", "결혼", "예식장"],
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
