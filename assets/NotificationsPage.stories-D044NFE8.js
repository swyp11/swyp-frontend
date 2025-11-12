import{u as d,r as m,j as e,n as c,g as i}from"./iframe-BXIlaz2d.js";import{w as p}from"./withAuth-CJcshunz.js";import{w as u}from"./decorators-Cos6l-TR.js";import"./preload-helper-ByZkdcDp.js";function l(){const o=d(),[n]=m.useState([{id:1,label:"{{label}}",description:"{{description}}",timestamp:"10분 전"},{id:2,label:"캘린더",description:'오늘 "강남역 드레스샵 투어예약" 일정이 있습니다.',timestamp:"10월 25일"}]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-[13px] border-b border-[#f1f1f1] bg-white",children:[e.jsx("div",{className:"flex items-center justify-center gap-[10px] px-4 py-0",children:e.jsx("button",{onClick:()=>o.back(),className:"w-6 h-6 overflow-hidden","aria-label":"뒤로가기",children:e.jsx(c,{className:"relative w-6 h-6",alt:"",src:i("/img/arrow_back.svg"),width:24,height:24})})}),e.jsx("p",{className:"body-2-medium text-on-surface",children:"알림"}),e.jsx("div",{className:"flex items-center justify-center gap-[10px] px-4 py-0 opacity-0",children:e.jsx("div",{className:"w-6 h-6 overflow-hidden",children:e.jsx(c,{className:"relative w-6 h-6",alt:"",src:i("/img/arrow_back.svg"),width:24,height:24})})})]}),e.jsx("div",{className:"flex-1 flex flex-col bg-white overflow-y-auto",children:n.map(s=>e.jsxs("div",{className:"flex flex-col gap-2 p-4 border-b border-[#f1f1f1] bg-white",children:[e.jsxs("div",{className:"flex items-start justify-between w-full text-on-surface-subtle body-2",children:[e.jsx("p",{className:"body-2-medium",children:s.label}),e.jsx("p",{className:"body-2",children:s.timestamp})]}),e.jsx("p",{className:"body-2-medium text-on-surface w-full",children:s.description})]},s.id))})]})}const f=p(l);l.__docgenInfo={description:"",methods:[],displayName:"NotificationsPage"};const g={title:"Pages/NotificationsPage",component:f,decorators:[u],parameters:{layout:"fullscreen",nextjs:{appDirectory:!0}},tags:["autodocs"]},t={parameters:{docs:{description:{story:"알림 페이지 - 사용자에게 전달된 알림 목록을 확인하고 관리하는 화면입니다."}}}},a={parameters:{docs:{description:{story:"읽지 않은 알림이 있는 알림 페이지입니다. 읽지 않은 알림은 하이라이트 표시됩니다."}}}},r={parameters:{docs:{description:{story:"모든 알림을 읽은 상태의 알림 페이지입니다."}}},play:async({canvasElement:o})=>{const s=o.querySelector("button:last-of-type");s&&s.textContent?.includes("모두 읽음")&&s.click()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '알림 페이지 - 사용자에게 전달된 알림 목록을 확인하고 관리하는 화면입니다.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '읽지 않은 알림이 있는 알림 페이지입니다. 읽지 않은 알림은 하이라이트 표시됩니다.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '모든 알림을 읽은 상태의 알림 페이지입니다.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = canvasElement;
    const markAllReadButton = canvas.querySelector('button:last-of-type') as HTMLButtonElement;
    if (markAllReadButton && markAllReadButton.textContent?.includes('모두 읽음')) {
      markAllReadButton.click();
    }
  }
}`,...r.parameters?.docs?.source}}};const N=["Default","WithUnreadNotifications","AllReadNotifications"];export{r as AllReadNotifications,t as Default,a as WithUnreadNotifications,N as __namedExportsOrder,g as default};
