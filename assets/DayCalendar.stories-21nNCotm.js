import{D as a}from"./DayCalendar-shAPUin0.js";import"./iframe-BXIlaz2d.js";import"./preload-helper-ByZkdcDp.js";const d={title:"Components/Schedule/DayCalendar",component:a,parameters:{layout:"fullscreen"},tags:["autodocs"]},o=[{id:"1",title:"드레스 투어",startTime:10,duration:2,color:"#f3335d"},{id:"2",title:"스튜디오 촬영",startTime:14,duration:3,color:"#562699"},{id:"3",title:"웨딩 플래너 미팅",startTime:18,duration:1,color:"#5bb16b"}],t={args:{currentDate:new Date(2024,9,25),events:o}},e={args:{currentDate:new Date(2024,9,25),events:[]}},r={args:{currentDate:new Date(2024,9,25),events:[{id:"1",title:"아침 미팅",startTime:9,duration:1,color:"#562699"},{id:"2",title:"드레스 투어",startTime:10,duration:2,color:"#f3335d"},{id:"3",title:"점심",startTime:12,duration:1,color:"#5bb16b"},{id:"4",title:"스튜디오 촬영",startTime:14,duration:3,color:"#562699"},{id:"5",title:"웨딩 플래너 미팅",startTime:18,duration:1,color:"#5bb16b"},{id:"6",title:"저녁 식사",startTime:19,duration:1,color:"#f3335d"}]}},n={args:{currentDate:new Date(2024,9,25),events:[{id:"1",title:"종일 행사",startTime:9,duration:10,color:"#562699"}]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    currentDate: new Date(2024, 9, 25),
    events: sampleEvents
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    currentDate: new Date(2024, 9, 25),
    events: []
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    currentDate: new Date(2024, 9, 25),
    events: [{
      id: '1',
      title: '아침 미팅',
      startTime: 9,
      duration: 1,
      color: '#562699'
    }, {
      id: '2',
      title: '드레스 투어',
      startTime: 10,
      duration: 2,
      color: '#f3335d'
    }, {
      id: '3',
      title: '점심',
      startTime: 12,
      duration: 1,
      color: '#5bb16b'
    }, {
      id: '4',
      title: '스튜디오 촬영',
      startTime: 14,
      duration: 3,
      color: '#562699'
    }, {
      id: '5',
      title: '웨딩 플래너 미팅',
      startTime: 18,
      duration: 1,
      color: '#5bb16b'
    }, {
      id: '6',
      title: '저녁 식사',
      startTime: 19,
      duration: 1,
      color: '#f3335d'
    }]
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    currentDate: new Date(2024, 9, 25),
    events: [{
      id: '1',
      title: '종일 행사',
      startTime: 9,
      duration: 10,
      color: '#562699'
    }]
  }
}`,...n.parameters?.docs?.source}}};const l=["Default","NoEvents","ManyEvents","LongEvent"];export{t as Default,n as LongEvent,r as ManyEvents,e as NoEvents,l as __namedExportsOrder,d as default};
