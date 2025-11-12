import{u as y,r as s,j as e,n as b,g as N}from"./iframe-BXIlaz2d.js";import{C as t}from"./CalendarSelect-D0mqBlXL.js";import{w as v}from"./withAuth-CJcshunz.js";import{w as g}from"./decorators-Cos6l-TR.js";import"./preload-helper-ByZkdcDp.js";function x(){const o=y(),[n,h]=s.useState(""),[i,f]=s.useState(""),[d,w]=s.useState("2025. 10. 25"),[m,D]=s.useState("2025. 10. 25"),[p,k]=s.useState("오전 9시"),[u,C]=s.useState("오전 10시"),j=a=>{if(a.preventDefault(),!n.trim()){alert("제목을 입력해주세요.");return}console.log({title:n,description:i,startDate:d,endDate:m,startTime:p,endTime:u}),o.back()};return e.jsxs("div",{className:"flex flex-col h-full bg-white",style:{width:"var(--app-width)",maxWidth:"var(--app-width)",margin:"0 auto"},children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-[13px] border-b border-[#f1f1f1] shrink-0",children:[e.jsx("button",{onClick:()=>o.back(),className:"w-10 h-10 flex items-center justify-center",children:e.jsx(b,{className:"relative w-6 h-6",alt:"",src:N("/img/arrow_back.svg"),width:24,height:24})}),e.jsx("h1",{className:"body-3 font-semibold text-on-surface",children:"일정 생성"}),e.jsx("div",{className:"w-10 h-10 opacity-0"})]}),e.jsxs("form",{onSubmit:j,className:"flex-1 flex flex-col min-h-0",children:[e.jsxs("div",{className:"flex-1 overflow-y-auto px-4 py-6 space-y-6",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"body-3 font-medium text-on-surface",children:"날짜"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(t,{value:d,onClick:()=>{},className:"flex-1 h-12"}),e.jsx("span",{className:"body-2-medium text-on-surface",children:"-"}),e.jsx(t,{value:m,onClick:()=>{},className:"flex-1 h-12"})]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"body-3 font-medium text-on-surface",children:"시간"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(t,{value:p,onClick:()=>{},className:"flex-1 h-12"}),e.jsx("span",{className:"body-2-medium text-on-surface",children:"-"}),e.jsx(t,{value:u,onClick:()=>{},className:"flex-1 h-12"})]})]}),e.jsxs("div",{className:"field-label",children:[e.jsx("div",{className:"field-label-text",children:e.jsx("span",{children:"제목"})}),e.jsx("input",{type:"text",value:n,onChange:a=>h(a.target.value),placeholder:"제목",className:"field"})]}),e.jsxs("div",{className:"field-label",children:[e.jsx("div",{className:"field-label-text",children:e.jsx("span",{children:"설명"})}),e.jsx("textarea",{value:i,onChange:a=>f(a.target.value),placeholder:"설명",rows:5,className:"field field-textbox resize-none"})]})]}),e.jsx("div",{className:"p-4 border-t border-[#f1f1f1] shrink-0",children:e.jsx("button",{type:"submit",className:"w-full h-11 bg-primary rounded-sm flex items-center justify-center",children:e.jsx("span",{className:"body-2-medium text-white",children:"완료"})})})]})]})}const S=v(x);x.__docgenInfo={description:"",methods:[],displayName:"AddSchedulePage"};const W={title:"Pages/Schedule/AddSchedulePage",component:S,decorators:[g],parameters:{layout:"fullscreen",nextjs:{appDirectory:!0}},tags:["autodocs"]},r={parameters:{docs:{description:{story:"일정 추가 페이지 - 새로운 일정을 생성할 수 있는 폼 화면입니다."}}}},c={parameters:{docs:{description:{story:"빈 폼 상태 - 모든 필드가 초기 상태입니다."}}}},l={parameters:{docs:{description:{story:"데이터 입력 상태 - 사용자가 일정 정보를 입력하는 중입니다."}}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '일정 추가 페이지 - 새로운 일정을 생성할 수 있는 폼 화면입니다.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '빈 폼 상태 - 모든 필드가 초기 상태입니다.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '데이터 입력 상태 - 사용자가 일정 정보를 입력하는 중입니다.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};const F=["Default","EmptyForm","WithData"];export{r as Default,c as EmptyForm,l as WithData,F as __namedExportsOrder,W as default};
