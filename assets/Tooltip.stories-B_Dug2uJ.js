import{j as t}from"./iframe-BXIlaz2d.js";import{T as o}from"./Tooltip-D0PmNOGd.js";import"./preload-helper-ByZkdcDp.js";const c={title:"Components/UI/Tooltip",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{text:{control:"text",description:"툴팁 텍스트"},position:{control:"select",options:["top","bottom","left","right","top-start","top-end"],description:"툴팁 위치"},showArrow:{control:"boolean",description:"화살표 표시 여부"}}},e={args:{text:"툴팁 텍스트",position:"top",showArrow:!0}},r={args:{text:"화살표 없는 툴팁",position:"top",showArrow:!1}},s={args:{text:"이것은 긴 텍스트를 가진 툴팁입니다. 여러 줄로 표시될 수 있습니다.",position:"top",showArrow:!0}},i={args:{text:"툴팁 텍스트",position:"top",showArrow:!0},render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"100px",padding:"100px"},children:[t.jsx(o,{text:"Top",position:"top"}),t.jsx(o,{text:"Bottom",position:"bottom"}),t.jsx(o,{text:"Left",position:"left"}),t.jsx(o,{text:"Right",position:"right"}),t.jsx(o,{text:"Top Start",position:"top-start"}),t.jsx(o,{text:"Top End",position:"top-end"})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    text: '툴팁 텍스트',
    position: 'top',
    showArrow: true
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: '화살표 없는 툴팁',
    position: 'top',
    showArrow: false
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: '이것은 긴 텍스트를 가진 툴팁입니다. 여러 줄로 표시될 수 있습니다.',
    position: 'top',
    showArrow: true
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: '툴팁 텍스트',
    position: 'top',
    showArrow: true
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '100px',
    padding: '100px'
  }}>
      <Tooltip text="Top" position="top" />
      <Tooltip text="Bottom" position="bottom" />
      <Tooltip text="Left" position="left" />
      <Tooltip text="Right" position="right" />
      <Tooltip text="Top Start" position="top-start" />
      <Tooltip text="Top End" position="top-end" />
    </div>
}`,...i.parameters?.docs?.source}}};const x=["Default","WithoutArrow","LongText","AllPositions"];export{i as AllPositions,e as Default,s as LongText,r as WithoutArrow,x as __namedExportsOrder,c as default};
