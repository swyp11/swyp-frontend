import{g as s,r as l,j as e}from"./iframe-BXIlaz2d.js";import{T as c}from"./TabBar-DCQpbWtV.js";import"./preload-helper-ByZkdcDp.js";const b={title:"Components/UI/TabBar",component:c,parameters:{layout:"fullscreen"},tags:["autodocs"]},a=[{id:"home",icon:s("/img/home.svg"),label:"홈",href:"/main"},{id:"style",icon:s("/img/face-retouching-natural.svg"),label:"스타일",href:"/recommend"},{id:"calendar",icon:s("/img/calendar-month.svg"),label:"캘린더",href:"/schedule"},{id:"my",icon:s("/img/person.svg"),label:"마이",href:"/my"}],t={args:{items:a,activeTab:"home"}},r={args:{items:a,activeTab:"style"}},n={args:{items:a,activeTab:"calendar"}},i={args:{items:a,activeTab:"home"},render:()=>{const[o,m]=l.useState("home");return e.jsxs("div",{style:{position:"relative",height:"100vh"},children:[e.jsx("div",{style:{padding:"20px"},children:e.jsxs("p",{children:["현재 선택된 탭: ",o]})}),e.jsx("div",{style:{position:"fixed",bottom:0,left:0,right:0},children:e.jsx(c,{items:a,activeTab:o,onTabChange:m})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleTabs,
    activeTab: 'home'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleTabs,
    activeTab: 'style'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleTabs,
    activeTab: 'calendar'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleTabs,
    activeTab: 'home'
  },
  render: () => {
    const [activeTab, setActiveTab] = useState('home');
    return <div style={{
      position: 'relative',
      height: '100vh'
    }}>
        <div style={{
        padding: '20px'
      }}>
          <p>현재 선택된 탭: {activeTab}</p>
        </div>
        <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
      }}>
          <TabBar items={sampleTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>;
  }
}`,...i.parameters?.docs?.source}}};const g=["Default","StyleActive","CalendarActive","Interactive"];export{n as CalendarActive,t as Default,i as Interactive,r as StyleActive,g as __namedExportsOrder,b as default};
