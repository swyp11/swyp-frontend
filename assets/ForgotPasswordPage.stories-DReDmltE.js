import{u,r as c,j as e}from"./iframe-BXIlaz2d.js";import{B as f}from"./BackHeader-Cx1EfD0_.js";import{F as h}from"./FieldLabel-BpkJpxf0.js";import{B as x}from"./Button-81gYiLei.js";import{w as y}from"./decorators-Cos6l-TR.js";import"./preload-helper-ByZkdcDp.js";function d(){const n=u(),[s,p]=c.useState(""),[o,i]=c.useState(!1),l=s&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),m=async()=>{if(!(!l||o)){i(!0);try{if(!(await fetch("/api/auth/request-verification",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})})).ok)throw new Error("인증 요청에 실패했습니다.");sessionStorage.setItem("verificationEmail",s),n.push("/forgot-password/email")}catch(r){console.error("Verification request error:",r),alert("인증 요청 중 오류가 발생했습니다.")}finally{i(!1)}}};return e.jsxs("div",{className:"bg-white flex flex-col h-screen mx-auto",style:{width:"var(--app-width)"},children:[e.jsx(f,{title:"임시 비밀번호 발급"}),e.jsxs("div",{className:"flex-1 px-4 py-8 overflow-y-auto flex flex-col justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsxs("h1",{className:"title-1 text-on-surface",children:["임시 비밀번호 발급을 위해",e.jsx("br",{}),"계정인증을 진행해주세요."]}),e.jsxs("div",{className:"flex gap-2 items-end",children:[e.jsx("div",{className:"flex-1",children:e.jsx(h,{label:"이메일",required:!0,placeholder:"이메일을 입력해주세요",value:s,onChange:r=>p(r.target.value),fieldProps:{type:"email",autoComplete:"email"}})}),e.jsx("button",{onClick:m,disabled:!l||o,className:"btn btn-secondary h-12 px-5 whitespace-nowrap",children:o?"요청 중...":"인증요청"})]})]}),e.jsx(x,{variant:"primary",colorType:"accent",className:"w-full opacity-40",disabled:!0,children:"다음"})]})]})}d.__docgenInfo={description:"",methods:[],displayName:"ForgotPasswordPage"};const N={title:"Pages/Auth/ForgotPasswordPage",component:d,decorators:[y],parameters:{layout:"fullscreen",nextjs:{appDirectory:!0,navigation:{pathname:"/forgot-password"}}},tags:["autodocs"]},t={parameters:{docs:{description:{story:"비밀번호 찾기 1단계 - 사용자의 계정 정보(이름, 생년월일, 휴대폰 번호)를 확인합니다."}}}},a={parameters:{docs:{description:{story:"입력 필드가 채워진 상태"}}},play:async({canvasElement:n})=>{}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '비밀번호 찾기 1단계 - 사용자의 계정 정보(이름, 생년월일, 휴대폰 번호)를 확인합니다.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '입력 필드가 채워진 상태'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    // This would need to be implemented with proper Storybook interactions
    // For now, it serves as a visual reference
  }
}`,...a.parameters?.docs?.source}}};const E=["Default","FilledForm"];export{t as Default,a as FilledForm,E as __namedExportsOrder,N as default};
