import{j as e}from"./iframe-BXIlaz2d.js";import{C as a}from"./Chip-DzV2jjrU.js";import"./preload-helper-ByZkdcDp.js";const d={title:"Components/UI/Chip",component:a,parameters:{layout:"centered"},tags:["autodocs"]},l={args:{label:"기본 Chip",variant:"default",selected:!1}},r={args:{label:"선택된 Chip",variant:"default",selected:!0}},t={args:{label:"Pill Chip",variant:"pill",selected:!1}},s={args:{label:"기본 Chip",variant:"default",selected:!1},render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(a,{label:"Default",variant:"default"}),e.jsx(a,{label:"Default Selected",variant:"default",selected:!0}),e.jsx(a,{label:"Pill",variant:"pill"}),e.jsx(a,{label:"Pill Selected",variant:"pill",selected:!0})]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: '기본 Chip',
    variant: 'default',
    selected: false
  }
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: '선택된 Chip',
    variant: 'default',
    selected: true
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Pill Chip',
    variant: 'pill',
    selected: false
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: '기본 Chip',
    variant: 'default',
    selected: false
  },
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Chip label="Default" variant="default" />
      <Chip label="Default Selected" variant="default" selected />
      <Chip label="Pill" variant="pill" />
      <Chip label="Pill Selected" variant="pill" selected />
    </div>
}`,...s.parameters?.docs?.source}}};const c=["Default","DefaultSelected","Pill","AllVariants"];export{s as AllVariants,l as Default,r as DefaultSelected,t as Pill,c as __namedExportsOrder,d as default};
