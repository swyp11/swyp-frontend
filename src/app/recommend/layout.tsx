import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "드레스 추천 - 체형별 맞춤 추천",
  description: "체형 데이터를 기반으로 가장 잘 어울리는 드레스를 추천해드립니다. 체형, 팔길이, 다리길이, 목길이, 얼굴형을 선택하세요.",
  keywords: ["드레스 추천", "체형", "맞춤 추천", "웨딩드레스", "드레스 스타일"],
};

export default function RecommendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
