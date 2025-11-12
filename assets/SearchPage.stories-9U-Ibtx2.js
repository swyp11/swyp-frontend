import{j as s,r as i,u as k,f as D,n as T,g as P}from"./iframe-BXIlaz2d.js";import{B as _}from"./BackHeader-Cx1EfD0_.js";import"./Button-81gYiLei.js";import"./FieldLabel-BpkJpxf0.js";import"./TabBar-DCQpbWtV.js";import"./Tooltip-D0PmNOGd.js";import"./GNB-Cei53FoB.js";import"./CalendarSelect-D0mqBlXL.js";import"./Chip-DzV2jjrU.js";import"./OptionGroup-BoJmsQxc.js";import{S as $}from"./SearchInput-GBiqzGf9.js";import"./NavigationTabs-CuxIs8pF.js";import{N as I}from"./NavigationTabSection-CdU4sVkM.js";import{u as A}from"./useDress-D5hcqQRH.js";import{u as H,a as U,b as B}from"./useWeddingHall-iTqHod9N.js";import{w as Q}from"./decorators-Cos6l-TR.js";import"./preload-helper-ByZkdcDp.js";import"./client-Chm_LENq.js";function F(){const c=k(),l=D(),a=l.get("q")||"",d=l.get("tab")||"wedding-hall",[t,p]=i.useState(a),[r,m]=i.useState(d);i.useEffect(()=>{p(a),m(d)},[a,d]);const{data:g,isLoading:f}=H({sort:"RECENT"}),{data:x,isLoading:b}=U({shopName:a,sort:"RECENT"}),{data:j,isLoading:y}=B({shopName:a,sort:"RECENT"}),{data:N,isLoading:v}=A({shopNameContains:a,sort:"RECENT"}),S=()=>{switch(r){case"wedding-hall":return{data:g,isLoading:f};case"dress-shop":return{data:x,isLoading:b};case"makeup-shop":return{data:j,isLoading:y};case"dress":return{data:N,isLoading:v};default:return{data:[],isLoading:!1}}},{data:L,isLoading:w}=S(),u=(L||[]).map(e=>{const q=e.image||e.imageUrl||e.thumbnail||"/img/placeholder.jpg";return{id:e.id,title:e.shopName||e.hallName||e.dressName||e.title,description:e.address||e.description,image:q}}),C=()=>{t.trim()&&c.push(`/search?q=${encodeURIComponent(t)}&tab=${r}`)},E=e=>{m(e),c.push(`/search?q=${encodeURIComponent(t)}&tab=${e}`,{scroll:!1})},R=e=>{c.push(`/detail/${e}?tab=${r}`)};return s.jsxs(s.Fragment,{children:[s.jsx(_,{title:""}),s.jsx("div",{className:"px-4 py-4 border-b border-[#f1f1f1]",children:s.jsx($,{value:t,onChange:e=>p(e.target.value),onSearch:C,placeholder:"검색어를 입력하세요"})}),s.jsx(I,{activeTab:r,onTabChange:E}),s.jsx("div",{className:"flex-1 overflow-y-auto px-4 py-4",children:w?s.jsx("div",{className:"flex items-center justify-center py-20",children:s.jsx("p",{className:"body-2 text-on-surface-subtle",children:"검색 중..."})}):u.length===0?s.jsx("div",{className:"flex items-center justify-center py-20",children:s.jsx("p",{className:"body-2 text-on-surface-subtle",children:a?"검색 결과가 없습니다.":"검색어를 입력해주세요."})}):s.jsx("div",{className:"flex flex-col gap-4",children:u.map(e=>s.jsxs("div",{onClick:()=>R(e.id),className:"flex items-center gap-4 cursor-pointer hover:bg-surface-1 p-3 rounded-lg transition-colors",children:[s.jsx("div",{className:"w-20 h-20 bg-surface-2 rounded-lg overflow-hidden shrink-0",children:s.jsx(T,{src:P(e.image),alt:e.title,width:80,height:80,className:"w-full h-full object-cover"})}),s.jsxs("div",{className:"flex-1 min-w-0",children:[s.jsx("h3",{className:"body-1-medium text-on-surface truncate mb-1",children:e.title}),e.description&&s.jsx("p",{className:"label-1 text-on-surface-subtle truncate",children:e.description})]})]},e.id))})})]})}function h(){return s.jsx(i.Suspense,{fallback:s.jsx("div",{children:"Loading..."}),children:s.jsx(F,{})})}h.__docgenInfo={description:"",methods:[],displayName:"SearchPage"};const ie={title:"Pages/SearchPage",component:h,decorators:[Q],parameters:{layout:"fullscreen",nextjs:{appDirectory:!0,navigation:{pathname:"/search",query:{q:"웨딩홀",tab:"wedding-hall"}}}},tags:["autodocs"]},n={parameters:{docs:{description:{story:"검색 결과 페이지 - 검색어에 따른 결과를 그리드 형태로 표시합니다."}}}},o={parameters:{nextjs:{appDirectory:!0,navigation:{pathname:"/search",query:{q:"nonexistent",tab:"wedding-hall"}}},docs:{description:{story:"검색 결과가 없는 경우"}}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '검색 결과 페이지 - 검색어에 따른 결과를 그리드 형태로 표시합니다.'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/search',
        query: {
          q: 'nonexistent',
          tab: 'wedding-hall'
        }
      }
    },
    docs: {
      description: {
        story: '검색 결과가 없는 경우'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};const ce=["Default","EmptyResults"];export{n as Default,o as EmptyResults,ce as __namedExportsOrder,ie as default};
