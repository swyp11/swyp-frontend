import{r as p,j as o}from"./iframe-BXIlaz2d.js";import{O as a}from"./OptionGroup-BoJmsQxc.js";import"./preload-helper-ByZkdcDp.js";import"./Chip-DzV2jjrU.js";const g={title:"Components/UI/OptionGroup",component:a,parameters:{layout:"padded"},tags:["autodocs"]},l=["옵션 1","옵션 2","옵션 3","옵션 4"],t={args:{label:"옵션 선택",options:l,selectedOption:"옵션 1",onOptionSelect:e=>console.log("Selected:",e)}},s={args:{label:"옵션 선택",options:l,selectedOption:void 0,onOptionSelect:e=>console.log("Selected:",e)}},n={args:{label:"옵션 선택",options:l,selectedOption:"옵션 1",onOptionSelect:e=>console.log("Selected:",e)},render:()=>{const[e,c]=p.useState("옵션 2");return o.jsxs("div",{children:[o.jsx(a,{label:"스타일 선택",options:l,selectedOption:e,onOptionSelect:c}),o.jsx("div",{style:{marginTop:"20px",padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"8px"},children:o.jsxs("p",{children:["현재 선택: ",o.jsx("strong",{children:e})]})})]})}},r={args:{label:"지역 선택",options:["서울","부산","인천","대구","광주","대전","울산","세종"],selectedOption:"서울",onOptionSelect:e=>console.log("Selected:",e)}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: '옵션 선택',
    options: sampleOptions,
    selectedOption: '옵션 1',
    onOptionSelect: (value: string) => console.log('Selected:', value)
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: '옵션 선택',
    options: sampleOptions,
    selectedOption: undefined,
    onOptionSelect: (value: string) => console.log('Selected:', value)
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: '옵션 선택',
    options: sampleOptions,
    selectedOption: '옵션 1',
    onOptionSelect: (value: string) => console.log('Selected:', value)
  },
  render: () => {
    const [selected, setSelected] = useState('옵션 2');
    return <div>
        <OptionGroup label="스타일 선택" options={sampleOptions} selectedOption={selected} onOptionSelect={setSelected} />
        <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
          <p>현재 선택: <strong>{selected}</strong></p>
        </div>
      </div>;
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: '지역 선택',
    options: ['서울', '부산', '인천', '대구', '광주', '대전', '울산', '세종'],
    selectedOption: '서울',
    onOptionSelect: (value: string) => console.log('Selected:', value)
  }
}`,...r.parameters?.docs?.source}}};const O=["Default","NoSelection","Interactive","ManyOptions"];export{t as Default,n as Interactive,r as ManyOptions,s as NoSelection,O as __namedExportsOrder,g as default};
