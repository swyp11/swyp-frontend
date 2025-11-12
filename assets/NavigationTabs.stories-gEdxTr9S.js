import{r as i,j as e}from"./iframe-BXIlaz2d.js";import{N as r}from"./NavigationTabs-CuxIs8pF.js";import"./preload-helper-ByZkdcDp.js";const p={title:"Components/UI/NavigationTabs",component:r,parameters:{layout:"padded"},tags:["autodocs"]},n=[{id:"dress",label:"드레스"},{id:"studio",label:"스튜디오"},{id:"makeup",label:"메이크업"},{id:"hair",label:"헤어"},{id:"venue",label:"예식장"}],s={args:{tabs:n,activeTab:"dress",onTabChange:a=>console.log("Tab changed:",a)}},t={args:{tabs:n,activeTab:"studio",onTabChange:a=>console.log("Tab changed:",a)}},b={args:{tabs:n,activeTab:"dress",onTabChange:a=>console.log("Tab changed:",a)},render:()=>{const[a,d]=i.useState("dress");return e.jsxs("div",{children:[e.jsx(r,{tabs:n,activeTab:a,onTabChange:d}),e.jsx("div",{style:{marginTop:"20px",padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"8px"},children:e.jsxs("p",{children:["현재 선택된 탭: ",e.jsx("strong",{children:n.find(l=>l.id===a)?.label})]})})]})}},o={args:{tabs:[{id:"tab1",label:"탭1"},{id:"tab2",label:"탭2"},{id:"tab3",label:"탭3"},{id:"tab4",label:"탭4"},{id:"tab5",label:"탭5"},{id:"tab6",label:"탭6"},{id:"tab7",label:"탭7"},{id:"tab8",label:"탭8"}],activeTab:"tab1",onTabChange:a=>console.log("Tab changed:",a)}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    activeTab: 'dress',
    onTabChange: tab => console.log('Tab changed:', tab)
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    activeTab: 'studio',
    onTabChange: tab => console.log('Tab changed:', tab)
  }
}`,...t.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    activeTab: 'dress',
    onTabChange: tab => console.log('Tab changed:', tab)
  },
  render: () => {
    const [activeTab, setActiveTab] = useState('dress');
    return <div>
        <NavigationTabs tabs={sampleTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
          <p>현재 선택된 탭: <strong>{sampleTabs.find(tab => tab.id === activeTab)?.label}</strong></p>
        </div>
      </div>;
  }
}`,...b.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: [{
      id: 'tab1',
      label: '탭1'
    }, {
      id: 'tab2',
      label: '탭2'
    }, {
      id: 'tab3',
      label: '탭3'
    }, {
      id: 'tab4',
      label: '탭4'
    }, {
      id: 'tab5',
      label: '탭5'
    }, {
      id: 'tab6',
      label: '탭6'
    }, {
      id: 'tab7',
      label: '탭7'
    }, {
      id: 'tab8',
      label: '탭8'
    }],
    activeTab: 'tab1',
    onTabChange: tab => console.log('Tab changed:', tab)
  }
}`,...o.parameters?.docs?.source}}};const m=["Default","SecondTabActive","Interactive","ManyTabs"];export{s as Default,b as Interactive,o as ManyTabs,t as SecondTabActive,m as __namedExportsOrder,p as default};
