import{j as n}from"./iframe-BXIlaz2d.js";import{H as a}from"./HorizontalSlider-DzbCZXuV.js";import"./preload-helper-ByZkdcDp.js";const l={title:"Components/Common/HorizontalSlider",component:a,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{gap:{control:"number",description:"아이템 간 간격 (px)"}}},r={args:{gap:12,children:n.jsx(n.Fragment,{children:[1,2,3,4,5,6,7,8].map(e=>n.jsxs("div",{style:{minWidth:"200px",height:"150px",backgroundColor:"#f0f0f0",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",fontWeight:"bold"},children:["Item ",e]},e))})}},t={args:{gap:16,children:n.jsx(n.Fragment,{children:[1,2,3,4,5].map(e=>n.jsxs("div",{style:{minWidth:"250px",height:"200px",backgroundColor:"#e0e0e0",borderRadius:"12px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px"},children:[n.jsx("div",{style:{width:"100%",height:"120px",backgroundColor:"#ccc",borderRadius:"8px",marginBottom:"12px"}}),n.jsxs("p",{style:{margin:0,fontSize:"14px"},children:["상품 ",e]})]},e))})}},i={args:{gap:4,children:n.jsx(n.Fragment,{children:[1,2,3,4,5,6].map(e=>n.jsx("div",{style:{minWidth:"100px",height:"100px",backgroundColor:"#562699",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"18px"},children:e},e))})}},o={args:{gap:24,children:n.jsx(n.Fragment,{children:[1,2,3,4].map(e=>n.jsx("div",{style:{minWidth:"300px",height:"200px",backgroundColor:"#f3335d",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"32px",fontWeight:"bold"},children:e},e))})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    gap: 12,
    children: <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => <div key={num} style={{
        minWidth: '200px',
        height: '150px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
            Item {num}
          </div>)}
      </>
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    gap: 16,
    children: <>
        {[1, 2, 3, 4, 5].map(num => <div key={num} style={{
        minWidth: '250px',
        height: '200px',
        backgroundColor: '#e0e0e0',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
            <div style={{
          width: '100%',
          height: '120px',
          backgroundColor: '#ccc',
          borderRadius: '8px',
          marginBottom: '12px'
        }} />
            <p style={{
          margin: 0,
          fontSize: '14px'
        }}>상품 {num}</p>
          </div>)}
      </>
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    gap: 4,
    children: <>
        {[1, 2, 3, 4, 5, 6].map(num => <div key={num} style={{
        minWidth: '100px',
        height: '100px',
        backgroundColor: '#562699',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '18px'
      }}>
            {num}
          </div>)}
      </>
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    gap: 24,
    children: <>
        {[1, 2, 3, 4].map(num => <div key={num} style={{
        minWidth: '300px',
        height: '200px',
        backgroundColor: '#f3335d',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
            {num}
          </div>)}
      </>
  }
}`,...o.parameters?.docs?.source}}};const c=["Default","WithImages","SmallGap","LargeGap"];export{r as Default,o as LargeGap,i as SmallGap,t as WithImages,c as __namedExportsOrder,l as default};
