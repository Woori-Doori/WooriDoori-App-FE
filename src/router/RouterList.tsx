
/**
 * list 안에 내용은 아래와 같이 정의해주세요!
 * {path : '/test', element :<Test />}
 * 
 */

import Test from "@/components/Test";
import CalendarView from "@/pages/CalendarView";
import SearchIdView from "@/pages/SearchIdView";
import YourIdView from "@/pages/YourIdView";
import ResetPwView from "@/pages/ResetPwView";
import NewPwView from "@/pages/NewPwView";

// 메인 route list
const mainList : Array<any> = [ 
    {path : '/', element :<Test />}
];



const accountList = [
  { path: "/searchid", element: <SearchIdView /> },
  { path: "/yourid", element: <YourIdView /> },
  { path: "/resetpw", element: <ResetPwView /> },
  { path: "/newpw", element: <NewPwView /> },
];

// 유저 정보 route list
const authList : Array<any> = [ 
];


// 캘린더 route list
const calendarList : Array<any> = [{path : '/calendar', element :<CalendarView />}];


// 카드 route list
const cardList : Array<any> = [];




export const routerList = [
    ...mainList,
    ...accountList,
    ...authList,
    ...calendarList,
    ...cardList,
];