import{u as _,l as A,f as E,r as U,j as e,n as x,g as f}from"./iframe-BXIlaz2d.js";import{B as C}from"./BackHeader-Cx1EfD0_.js";import{a as $}from"./useDress-D5hcqQRH.js";import{d as F,e as R,f as W}from"./useWeddingHall-iTqHod9N.js";import{a as g,u as y}from"./client-Chm_LENq.js";import{u as j}from"./useMutation-JYB7MqBB.js";import{w as I}from"./decorators-Cos6l-TR.js";import"./preload-helper-ByZkdcDp.js";const v={store:async(a,r)=>(await g.post(`/api/likes/${a}/${r}`)).data,delete:async a=>(await g.delete(`/api/likes/${a}`)).data},M=()=>{const a=y();return j({mutationFn:({category:r,postId:i})=>v.store(r,i),onSuccess:()=>{a.invalidateQueries({queryKey:["likes"]}),a.invalidateQueries({queryKey:["dress"]}),a.invalidateQueries({queryKey:["dressShop"]}),a.invalidateQueries({queryKey:["makeupShop"]}),a.invalidateQueries({queryKey:["weddingHall"]}),a.invalidateQueries({queryKey:["hall"]})}})},O=()=>{const a=y();return j({mutationFn:r=>v.delete(r),onSuccess:()=>{a.invalidateQueries({queryKey:["likes"]}),a.invalidateQueries({queryKey:["dress"]}),a.invalidateQueries({queryKey:["dressShop"]}),a.invalidateQueries({queryKey:["makeupShop"]}),a.invalidateQueries({queryKey:["weddingHall"]}),a.invalidateQueries({queryKey:["hall"]})}})},T=()=>{const a=M(),r=O();return{toggleLikes:({isLiked:i,likesId:l,category:o,postId:m})=>i&&l?r.mutate(l):a.mutate({category:o,postId:m}),isLoading:a.isPending||r.isPending}};function b(){_();const a=A(),r=E(),i=Number(a.id),l=r.get("tab")||"wedding-hall",[o,m]=U.useState(!1),{data:N,isLoading:w}=F(i),{data:k,isLoading:S}=R(i),{data:D,isLoading:L}=W(i),{data:q,isLoading:P}=$(i),p=T(),H=()=>{switch(l){case"wedding-hall":return{data:N,isLoading:w};case"dress-shop":return{data:k,isLoading:S};case"makeup-shop":return{data:D,isLoading:L};case"dress":return{data:q,isLoading:P};default:return{data:null,isLoading:!1}}},{data:h,isLoading:K}=H(),t=h?(()=>{const s=h;let n=["/img/placeholder.jpg"];return s.images&&Array.isArray(s.images)&&s.images.length>0?n=s.images:(s.image||s.imageUrl||s.thumbnail)&&(n=[s.image||s.imageUrl||s.thumbnail]),{id:s.id,title:s.shopName||s.hallName||s.dressName||s.title||"업체명",phone:s.phone||"전화번호 없음",description:s.description||s.features||"소개 정보 없음",address:s.address||"주소 정보 없음",specialty:s.specialty||"",features:s.features||"",snsUrl:s.snsUrl||"",images:n,businessHours:[{day:"월",time:"10:00 - 20:00"},{day:"화",time:"10:00 - 20:00"},{day:"수",time:"10:00 - 20:00"},{day:"목",time:"10:00 - 20:00"},{day:"금",time:"10:00 - 20:00"},{day:"토",time:"10:00 - 20:00"},{day:"일",time:"휴무일"}]}})():null,Q=async()=>{try{await p.mutateAsync({targetType:l==="wedding-hall"?"WEDDING_HALL":l==="dress-shop"?"DRESS_SHOP":l==="makeup-shop"?"MAKEUP_SHOP":"DRESS",targetId:i}),m(!o)}catch(s){console.error("Error toggling favorite:",s)}};return K?e.jsx("div",{className:"bg-white flex items-center justify-center min-h-screen mx-auto",style:{width:"var(--app-width)"},children:e.jsx("p",{className:"body-2 text-on-surface-subtle",children:"로딩 중..."})}):t?e.jsxs("div",{className:"bg-white flex flex-col min-h-screen mx-auto",style:{width:"var(--app-width)"},children:[e.jsx(C,{title:t.title}),e.jsxs("div",{className:"flex-1 bg-white flex flex-col gap-6 p-6 overflow-y-auto",children:[e.jsx("div",{className:"flex gap-2 overflow-x-auto",children:t.images.map((s,n)=>e.jsx("div",{className:"relative flex-shrink-0 w-[280px] h-[280px] rounded-lg overflow-hidden",children:e.jsx(x,{src:f(s),alt:`${t.title} ${n+1}`,fill:!0,className:"object-cover"})},n))}),e.jsxs("div",{className:"flex items-center justify-center gap-2.5 w-full",children:[e.jsx("h2",{className:"title-1 text-on-surface flex-1",children:t.title}),e.jsx("button",{onClick:Q,disabled:p.isPending,className:"flex items-center gap-2.5 p-2","aria-label":o?"즐겨찾기 해제":"즐겨찾기 추가",children:e.jsx(x,{src:f(o?"/img/favorite_color.svg":"/img/favorite_border.svg"),alt:"즐겨찾기",width:24,height:24})})]}),e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[t.address&&e.jsxs("div",{className:"flex gap-4 items-start w-full",children:[e.jsx("p",{className:"body-2-medium text-on-surface-subtle flex-shrink-0",children:"주소"}),e.jsx("p",{className:"body-2 text-on-surface flex-1",children:t.address})]}),t.phone&&e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("p",{className:"body-2-medium text-on-surface-subtle flex-shrink-0",children:"전화번호"}),e.jsx("a",{href:`tel:${t.phone}`,className:"body-2 text-[#3190ff] flex items-center gap-1.5",children:t.phone})]}),t.snsUrl&&e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("p",{className:"body-2-medium text-on-surface-subtle flex-shrink-0",children:"SNS"}),e.jsx("a",{href:t.snsUrl,target:"_blank",rel:"noopener noreferrer",className:"body-2 text-[#3190ff] flex items-center gap-1.5",children:t.snsUrl})]}),t.specialty&&e.jsxs("div",{className:"flex gap-4 items-start w-full",children:[e.jsx("p",{className:"body-2-medium text-on-surface-subtle flex-shrink-0",children:"전문분야"}),e.jsx("p",{className:"body-2 text-on-surface flex-1",children:t.specialty})]}),t.features&&e.jsxs("div",{className:"flex gap-4 items-start w-full",children:[e.jsx("p",{className:"body-2-medium text-on-surface-subtle flex-shrink-0",children:"특징"}),e.jsx("p",{className:"body-2 text-on-surface flex-1",children:t.features})]}),t.description&&e.jsxs("div",{className:"flex gap-4 items-start w-full",children:[e.jsx("p",{className:"body-2-medium text-on-surface-subtle flex-shrink-0",children:"소개"}),e.jsx("p",{className:"body-2 text-on-surface flex-1",children:t.description})]}),t.businessHours&&e.jsxs("div",{className:"flex gap-4 items-start w-full",children:[e.jsx("p",{className:"body-2-medium text-on-surface-subtle flex-shrink-0",children:"영업시간"}),e.jsx("div",{className:"flex flex-col body-2 text-on-surface flex-1",children:t.businessHours.map((s,n)=>e.jsxs("p",{className:"whitespace-nowrap",children:[s.day,": ",s.time]},n))})]})]})]})]}):e.jsx("div",{className:"bg-white flex flex-col items-center justify-center min-h-screen mx-auto",style:{width:"var(--app-width)"},children:e.jsx("p",{className:"headline-3 text-on-surface mb-2",children:"항목을 찾을 수 없습니다"})})}b.__docgenInfo={description:"",methods:[],displayName:"DetailPage"};const ee={title:"Pages/DetailPage",component:b,decorators:[I],parameters:{layout:"fullscreen",nextjs:{appDirectory:!0,navigation:{pathname:"/detail/1"}}},tags:["autodocs"]},d={parameters:{docs:{description:{story:"상세보기 페이지 - 웨딩홀/드레스샵의 상세 정보를 표시합니다."}}}},c={parameters:{nextjs:{appDirectory:!0,navigation:{pathname:"/detail/1",query:{tab:"wedding-hall"}}},docs:{description:{story:"웨딩홀 상세보기"}}}},u={parameters:{nextjs:{appDirectory:!0,navigation:{pathname:"/detail/2",query:{tab:"dress"}}},docs:{description:{story:"드레스샵 상세보기"}}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        // story: '상세보기 페이지 - 웨딩홀/드레스샵/메이크업샵의 상세 정보를 표시합니다.',
        story: '상세보기 페이지 - 웨딩홀/드레스샵의 상세 정보를 표시합니다.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/detail/1',
        query: {
          tab: 'wedding-hall'
        }
      }
    },
    docs: {
      description: {
        story: '웨딩홀 상세보기'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/detail/2',
        query: {
          tab: 'dress'
        }
      }
    },
    docs: {
      description: {
        story: '드레스샵 상세보기'
      }
    }
  }
}`,...u.parameters?.docs?.source}}};const se=["Default","WeddingHall","DressShop"];export{d as Default,u as DressShop,c as WeddingHall,se as __namedExportsOrder,ee as default};
