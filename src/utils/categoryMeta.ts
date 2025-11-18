import { img } from "@/assets/img";

type CategoryMeta = {
  label: string;
  color: string;
  icon: string;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  CAFE: { label: "카페/간식", color: "#FFB6B9", icon: img.drinkIcon },
  FOOD: { label: "식비", color: "#FF715B", icon: img.foodIcon },
  ALCOHOL_ENTERTAINMENT: { label: "술/유흥", color: "#C44536", icon: img.entertainmentIcon },
  CONVENIENCE_STORE: { label: "편의점", color: "#FFC456", icon: img.martIcon },
  EDUCATION: { label: "교육/육아", color: "#969191", icon: img.educationIcon },
  SHOPPING: { label: "쇼핑/마트", color: "#345BD1", icon: img.shoppingIcon },
  ETC: { label: "기타", color: "#E4EAF0", icon: img.etcIcon },
  TRANSPORTATION: { label: "교통/자동차", color: "#34D1BF", icon: img.trafficIcon },
  HOUSING: { label: "주거/관리", color: "#6B5DD3", icon: img.residenceIcon },
  HOSPITAL: { label: "병원/건강", color: "#31BB66", icon: img.hospitalIcon },
  TRANSFER: { label: "이체", color: "#FFF495", icon: img.transferIcon },
  TRAVEL: { label: "여행/숙박", color: "#4C8B73", icon: img.travelIcon },
  TELECOM: { label: "통신", color: "#41A4FF", icon: img.phoneIcon },
  ALL: { label: "전체", color: "#C4C4C4", icon: img.etcIcon },
};

export const getCategoryMeta = (category?: string): CategoryMeta => {
  if (!category) {
    return CATEGORY_META.ETC;
  }
  const key = category.toUpperCase();
  return CATEGORY_META[key] || CATEGORY_META.ETC;
};

