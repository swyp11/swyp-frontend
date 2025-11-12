import{j as r}from"./iframe-BXIlaz2d.js";import{B as e}from"./Button-81gYiLei.js";import"./preload-helper-ByZkdcDp.js";const l={title:"Components/UI/Button",component:e,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{variant:"primary",colorType:"accent",children:"Primary Button"}},t={args:{variant:"secondary",colorType:"accent",children:"Secondary Button"}},n={args:{variant:"filter",children:"지역",selected:!1}},c={args:{variant:"primary",colorType:"accent",children:"Primary Button"},render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[r.jsx(e,{variant:"primary",colorType:"accent",children:"Accent Primary"}),r.jsx(e,{variant:"secondary",colorType:"accent",children:"Accent Secondary"}),r.jsx(e,{variant:"tertiary",colorType:"accent",children:"Accent Tertiary"}),r.jsx(e,{variant:"filter",children:"필터"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    colorType: 'accent',
    children: 'Primary Button'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    colorType: 'accent',
    children: 'Secondary Button'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'filter',
    children: '지역',
    selected: false
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    colorType: 'accent',
    children: 'Primary Button'
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Button variant="primary" colorType="accent">Accent Primary</Button>
      <Button variant="secondary" colorType="accent">Accent Secondary</Button>
      <Button variant="tertiary" colorType="accent">Accent Tertiary</Button>
      <Button variant="filter">필터</Button>
    </div>
}`,...c.parameters?.docs?.source}}};const d=["AccentPrimary","AccentSecondary","Filter","AllVariants"];export{a as AccentPrimary,t as AccentSecondary,c as AllVariants,n as Filter,d as __namedExportsOrder,l as default};
