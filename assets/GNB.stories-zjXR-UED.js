import{G as r}from"./GNB-Cei53FoB.js";import"./iframe-BXIlaz2d.js";import"./preload-helper-ByZkdcDp.js";const n={title:"Components/UI/GNB",component:r,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{logo:{control:"text",description:"로고 텍스트"},logoHref:{control:"text",description:"로고 링크"},hasNotification:{control:"boolean",description:"알림 뱃지 표시 여부"},onNotificationClick:{action:"notification clicked"}}},o={args:{logo:"LOGO",logoHref:"/",hasNotification:!1}},t={args:{logo:"LOGO",logoHref:"/",hasNotification:!0}},a={args:{logo:"결혼준비",logoHref:"/main",hasNotification:!1}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    logo: 'LOGO',
    logoHref: '/',
    hasNotification: false
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    logo: 'LOGO',
    logoHref: '/',
    hasNotification: true
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    logo: '결혼준비',
    logoHref: '/main',
    hasNotification: false
  }
}`,...a.parameters?.docs?.source}}};const c=["Default","WithNotification","CustomLogo"];export{a as CustomLogo,o as Default,t as WithNotification,c as __namedExportsOrder,n as default};
