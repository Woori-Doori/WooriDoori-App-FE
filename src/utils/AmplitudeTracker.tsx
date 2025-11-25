import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

/**
 * Amplitude 분석 초기화 컴포넌트
 * 세션 리플레이 및 자동 캡처 기능 포함
 */
const AmplitudeTracker = () => {
  useEffect(() => {
    // 로컬호스트에서는 기록하지 않음
    if (window.location.href.includes('localhost')) {
      return;
    }

    const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY || '17e05f26d143e7d8c1553714212c9f10';
    
    // 세션 리플레이 플러그인 추가
    amplitude.add(sessionReplayPlugin());
    
    // Amplitude 초기화
    amplitude.init(apiKey, {
      autocapture: {
        attribution: true,
        fileDownloads: true,
        formInteractions: true,
        pageViews: true,
        sessions: true,
        elementInteractions: true,
        networkTracking: true,
        webVitals: true,
        frustrationInteractions: true,
      },
    });
  }, []);

  return null;
};

export default AmplitudeTracker;

