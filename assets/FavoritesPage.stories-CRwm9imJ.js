import{j as e,r,u as j,f as N,n as F,g as T}from"./iframe-BXIlaz2d.js";import{B as S}from"./BackHeader-Cx1EfD0_.js";import{w}from"./decorators-Cos6l-TR.js";import"./preload-helper-ByZkdcDp.js";function E(){const l=j(),d=N(),[t,m]=r.useState([]),[u,f]=r.useState("웨딩홀"),[y,p]=r.useState(!0),[x,h]=r.useState(null);r.useEffect(()=>{const s=d.get("tab");(s==="웨딩홀"||s==="드레스")&&f(s)},[d]),r.useEffect(()=>{(async()=>{p(!0),h(null);try{m([])}catch(a){console.error("[Favorites] Fetch error:",a),h(a instanceof Error?a.message:"서버 오류가 발생했습니다.")}finally{p(!1)}})()},[u]);const b=s=>{f(s),l.push(`/my/favorites?tab=${s}`,{scroll:!1})},g=s=>{m(a=>a.map(n=>n.id===s?{...n,isFavorite:!n.isFavorite}:n))};return e.jsxs(e.Fragment,{children:[e.jsx(S,{title:"찜"}),e.jsx("div",{className:"flex border-b border-[#f1f1f1]",children:["웨딩홀","드레스"].map(s=>e.jsxs("button",{onClick:()=>b(s),className:`flex-1 py-3 body-2 transition-colors relative ${u===s?"text-primary font-medium":"text-on-surface-subtle"}`,children:[s,u===s&&e.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-[2px]"})]},s))}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:y?e.jsx("div",{className:"flex items-center justify-center py-20",children:e.jsx("p",{className:"body-2 text-on-surface-subtle",children:"로딩 중..."})}):x?e.jsx("div",{className:"flex items-center justify-center py-20",children:e.jsx("p",{className:"body-2 text-alert",children:x})}):t.length===0?e.jsx("div",{className:"flex items-center justify-center py-20",children:e.jsx("p",{className:"body-2 text-on-surface-subtle",children:"찜한 항목이 없습니다."})}):t.map(s=>e.jsxs("div",{className:"flex items-center gap-4 px-4 py-4 border-b border-[#f1f1f1] bg-white",children:[e.jsx("div",{className:"w-16 h-16 bg-surface-2 rounded-lg overflow-hidden shrink-0",children:e.jsx("div",{className:"w-full h-full flex items-center justify-center text-on-surface-subtlest text-xs",children:"이미지"})}),e.jsxs("div",{className:"flex-1 min-w-0 flex flex-col gap-1",children:[e.jsx("h3",{className:"body-1-medium text-on-surface truncate",children:s.title}),e.jsx("p",{className:"label-1 text-on-surface-subtle",children:s.category})]}),e.jsx("button",{onClick:()=>g(s.id),className:"p-2 flex items-center justify-center shrink-0","aria-label":s.isFavorite?"찜 해제":"찜하기",children:e.jsx(F,{className:"relative w-6 h-6",alt:"",src:T("/img/favorite_color.svg"),width:24,height:24})})]},s.id))})]})}function v(){return e.jsx(r.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:e.jsx(E,{})})}v.__docgenInfo={description:"",methods:[],displayName:"FavoritesPage"};const D={title:"Pages/FavoritesPage",component:v,decorators:[w],parameters:{layout:"fullscreen",nextjs:{appDirectory:!0}},tags:["autodocs"]},o={parameters:{docs:{description:{story:"찜 목록 페이지 - 사용자가 찜한 웨딩홀과 드레스를 관리하는 화면입니다."}}}},c={parameters:{docs:{description:{story:"웨딩홀 탭이 활성화된 찜 목록 페이지입니다."}}}},i={parameters:{docs:{description:{story:"드레스 탭이 활성화된 찜 목록 페이지입니다."}}},play:async({canvasElement:l})=>{const t=l.querySelectorAll("button")[2];t&&t.click()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '찜 목록 페이지 - 사용자가 찜한 웨딩홀과 드레스를 관리하는 화면입니다.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '웨딩홀 탭이 활성화된 찜 목록 페이지입니다.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '드레스 탭이 활성화된 찜 목록 페이지입니다.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = canvasElement;
    const dressTab = canvas.querySelectorAll('button')[2] as HTMLButtonElement;
    if (dressTab) {
      dressTab.click();
    }
  }
}`,...i.parameters?.docs?.source}}};const L=["Default","WeddingHallTab","DressTab"];export{o as Default,i as DressTab,c as WeddingHallTab,L as __namedExportsOrder,D as default};
