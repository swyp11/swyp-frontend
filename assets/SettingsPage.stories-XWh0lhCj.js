import{u as p,r as g,j as e,n as l,g as i}from"./iframe-BXIlaz2d.js";import{B as x}from"./BackHeader-Cx1EfD0_.js";import{w as f}from"./decorators-Cos6l-TR.js";import"./preload-helper-ByZkdcDp.js";function d(){const s=p(),[c,t]=g.useState(!1),u=[{icon:e.jsx(l,{className:"relative w-6 h-6",alt:"",src:i("/img/feed.svg"),width:24,height:24}),label:"이용약관",onClick:()=>{console.log("이용약관")}},{icon:e.jsx(l,{className:"relative w-6 h-6",alt:"",src:i("/img/policy.svg"),width:24,height:24}),label:"개인정보 처리방침",onClick:()=>{console.log("개인정보 처리방침")}},{icon:e.jsx(l,{className:"relative w-6 h-6",alt:"",src:i("/img/logout.svg"),width:24,height:24}),label:"로그아웃",onClick:()=>t(!0)}],m=()=>{console.log("로그아웃"),t(!1),s.push("/login")};return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"설정"}),e.jsx("div",{className:"flex flex-col gap-6 px-4 py-6",children:u.map((n,h)=>e.jsxs("button",{onClick:n.onClick,className:"flex items-center gap-3 w-full",children:[e.jsx("div",{className:"w-6 h-6 shrink-0",children:n.icon}),e.jsx("span",{className:"flex-1 text-left body-2-medium text-on-surface",children:n.label}),e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M9.29 6.71L10.7 5.3L17.4 12L10.7 18.7L9.29 17.29L14.58 12L9.29 6.71Z",fill:"#1F1E1E"})})]},h))}),c&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center",style:{backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:9999},onClick:()=>t(!1),children:e.jsxs("div",{className:"bg-white rounded-lg p-6 mx-4",style:{maxWidth:"320px",width:"90%"},onClick:n=>n.stopPropagation(),children:[e.jsx("p",{className:"body-2 text-on-surface text-center mb-6",children:"정말 로그아웃 하시겠습니까?"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>t(!1),className:"flex-1 h-12 border border-border rounded-lg bg-white text-on-surface body-2-medium",children:"취소"}),e.jsx("button",{onClick:m,className:"flex-1 h-12 bg-primary rounded-lg text-white body-2-medium",children:"로그아웃"})]})]})})]})}d.__docgenInfo={description:"",methods:[],displayName:"SettingsPage"};const j={title:"Pages/SettingsPage",component:d,decorators:[f],parameters:{layout:"fullscreen",nextjs:{appDirectory:!0}},tags:["autodocs"]},o={parameters:{docs:{description:{story:"설정 페이지 - 이용약관, 개인정보 처리방침, 로그아웃, 회원탈퇴 등을 관리하는 화면입니다."}}}},a={parameters:{docs:{description:{story:"로그아웃 모달이 표시된 설정 페이지입니다."}}},play:async({canvasElement:s})=>{const t=s.querySelector("button:nth-child(4)");t&&t.click()}},r={parameters:{docs:{description:{story:"회원탈퇴 모달이 표시된 설정 페이지입니다."}}},play:async({canvasElement:s})=>{const t=s.querySelector("button:nth-child(3)");t&&t.click()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '설정 페이지 - 이용약관, 개인정보 처리방침, 로그아웃, 회원탈퇴 등을 관리하는 화면입니다.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '로그아웃 모달이 표시된 설정 페이지입니다.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = canvasElement;
    const logoutButton = canvas.querySelector('button:nth-child(4)') as HTMLButtonElement;
    if (logoutButton) {
      logoutButton.click();
    }
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '회원탈퇴 모달이 표시된 설정 페이지입니다.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = canvasElement;
    const withdrawButton = canvas.querySelector('button:nth-child(3)') as HTMLButtonElement;
    if (withdrawButton) {
      withdrawButton.click();
    }
  }
}`,...r.parameters?.docs?.source}}};const k=["Default","WithLogoutModal","WithWithdrawModal"];export{o as Default,a as WithLogoutModal,r as WithWithdrawModal,k as __namedExportsOrder,j as default};
