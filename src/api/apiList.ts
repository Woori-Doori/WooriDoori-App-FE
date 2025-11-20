import axiosInstance from "./axiosInstance";
import axios from "axios";
import { ERROR_RESPONSE } from "./errorResponse";

export const apiList = {
  // 로그인 API
  login: async (memberId: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", { 
        id: memberId, 
        password: password
      });
      
      // 백엔드 응답 구조: { statusCode, resultMsg, resultData: { name, tokens: { accessToken, refreshToken } } }
      const resultData = response.data.resultData;
      
      if (resultData && resultData.tokens && resultData.tokens.accessToken) {
        return {
          success: true,
          data: {
            name: resultData.name,
            accessToken: resultData.tokens.accessToken,
            refreshToken: resultData.tokens.refreshToken,
          },
        };
      } else {
        return {
          success: false,
          result: "FAIL",
          resultMsg: "토큰을 받지 못했습니다.",
        };
      }
    } catch (err: any) {
      console.error("로그인 에러:", err);
      
      // 백엔드 에러 응답 구조: { statusCode, errorName, errorResultMsg }
      const errorName = err?.response?.data?.errorName;
      const errorResultMsg = err?.response?.data?.errorResultMsg;
      
      // ERROR_RESPONSE에서 에러 메시지 찾기
      let errorMessage = errorResultMsg;
      if (errorName && ERROR_RESPONSE[errorName]) {
        errorMessage = ERROR_RESPONSE[errorName].message;
      }
      
      return {
        success: false,
        result: "FAIL",
        resultMsg: errorMessage || err?.response?.data?.resultMsg || err?.message || "로그인에 실패했습니다.",
        resultCode: err?.response?.data?.statusCode,
        errorName: errorName,
      };
    }
  },

  // 회원가입
  signup: (data: { email: string; password: string; name: string }) => axiosInstance.post("/test2", data),

  // 메인 페이지 데이터
  getMain: async () => {
    const response = await axiosInstance.get("/main");
    return response.data.resultData;
  },

  // 토큰 재발급 API
  // interceptor를 거치지 않도록 기본 axios 사용 (순환 참조 및 재발급 무한 루프 방지)
  reissue: async (accessToken: string, refreshToken: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reissue`,
        {
          accessToken,
          refreshToken,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      // 백엔드 응답 구조: { grantType, accessToken, refreshToken, accessTokenExpiresIn }
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      
      if (newAccessToken && newRefreshToken) {
        return {
          success: true,
          data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        };
      } else {
        return {
          success: false,
          resultMsg: "토큰 재발급 실패: 응답에 토큰이 없습니다",
        };
      }
    } catch (err: any) {
      console.error("토큰 재발급 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.message || "토큰 재발급에 실패했습니다.",
      };
    }
  },

  // 소비 내역 API
  // 월별 소비 내역 조회
  getMonthlySpendings: async (targetDate: string) => {
    try {
      const response = await axiosInstance.get("/history/calendar", {
        params: { targetDate },
      });
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("월별 소비 내역 조회 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "소비 내역 조회에 실패했습니다.",
      };
    }
  },

  // 소비 내역 상세 조회
  getSpendingDetail: async (historyId: number) => {
    try {
      const response = await axiosInstance.get(`/history/calendar/detail/${historyId}`);
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("소비 내역 상세 조회 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "상세 내역 조회에 실패했습니다.",
      };
    }
  },

  // 지출 합계 포함 여부 수정
  updateIncludeTotal: async (historyId: number, includeInTotal: boolean) => {
    try {
      const response = await axiosInstance.patch(`/history/calendar/${historyId}/${includeInTotal}`);
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("지출 합계 포함 여부 수정 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "수정에 실패했습니다.",
      };
    }
  },

  // 카테고리 수정
  updateCategory: async (historyId: number, category: string) => {
    try {
      const response = await axiosInstance.patch(`/history/calendar/${historyId}/category`, {
        category,
      });
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("카테고리 수정 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "카테고리 수정에 실패했습니다.",
      };
    }
  },

  // 더치페이 인원 수정
  updateDutchpay: async (historyId: number, count: number) => {
    try {
      const response = await axiosInstance.patch(`/history/calendar/${historyId}/dutchpay`, {
        count,
      });
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("더치페이 수정 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "더치페이 수정에 실패했습니다.",
      };
    }
  },

  // 소비 금액 수정
  updatePrice: async (historyId: number, price: number) => {
    try {
      const response = await axiosInstance.patch(`/history/calendar/${historyId}/price`, {
        price,
      });
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("금액 수정 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "금액 수정에 실패했습니다.",
      };
    }
  },

  // 소비 일기 API
  // 월별 일기 조회
  getMonthlyDiaries: async (targetDate: string) => {
    try {
      const response = await axiosInstance.get("/diary", {
        params: { targetDate },
      });
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("월별 일기 조회 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "일기 조회에 실패했습니다.",
      };
    }
  },

  // 일기 상세 조회
  getDiaryDetail: async (diaryId: number) => {
    try {
      const response = await axiosInstance.get(`/diary/${diaryId}`);
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("일기 상세 조회 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "일기 상세 조회에 실패했습니다.",
      };
    }
  },

  // 일기 생성
  createDiary: async (diaryDay: string, diaryEmotion: string, diaryContent: string) => {
    try {
      const response = await axiosInstance.post("/diary/insertDiary", {
        diaryDay,
        diaryEmotion,
        diaryContent,
      });
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("일기 생성 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "일기 생성에 실패했습니다.",
      };
    }
  },

  // 일기 수정
  updateDiary: async (diaryId: number, diaryEmotion?: string, diaryContent?: string) => {
    try {
      const requestBody: { diaryEmotion?: string; diaryContent?: string } = {};
      if (diaryEmotion !== undefined) requestBody.diaryEmotion = diaryEmotion;
      if (diaryContent !== undefined) requestBody.diaryContent = diaryContent;

      const response = await axiosInstance.put(`/diary/updateDiary/${diaryId}`, requestBody);
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("일기 수정 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "일기 수정에 실패했습니다.",
      };
    }
  },

  // 일기 삭제
  deleteDiary: async (diaryId: number) => {
    try {
      const response = await axiosInstance.delete(`/diary/${diaryId}`);
      return {
        success: true,
        data: response.data.resultData,
      };
    } catch (err: any) {
      console.error("일기 삭제 에러:", err);
      return {
        success: false,
        resultMsg: err?.response?.data?.errorResultMsg || err?.response?.data?.resultMsg || "일기 삭제에 실패했습니다.",
      };
    }
  },
};
