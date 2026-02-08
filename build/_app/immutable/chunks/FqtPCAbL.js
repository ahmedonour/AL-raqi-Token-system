import{_ as o}from"./C1FmrZbK.js";import{Capacitor as e}from"./D1H6M1Qj.js";let n=null;async function r(){if(!n&&e.isNativePlatform&&e.isNativePlatform()){const{registerPlugin:i}=await o(async()=>{const{registerPlugin:t}=await import("./D1H6M1Qj.js");return{registerPlugin:t}},[],import.meta.url);n=i("SunmiPrinter")}return n}async function l(){if(!e.isNativePlatform||!e.isNativePlatform())return!1;try{return(await(await r()).isAvailable()).available}catch(i){return console.error("Failed to check SUNMI availability:",i),!1}}async function s(i={}){if(!e.isNativePlatform||!e.isNativePlatform())return console.log("Not on native platform, using browser print"),window.print&&window.print(),!1;try{const t=await r();await t.printerInit(),await t.setAlignment({alignment:1}),await t.printTextWithFont({text:"AL RAQI UNIVERSITY HOSPITAL",typeface:"",fontSize:5}),await t.printText({text:`================================
`}),await t.printTextWithFont({text:`QUEUE TOKEN

`,typeface:"",fontSize:24}),await t.printTextWithFont({text:(i.number||"")+`
`,typeface:"",fontSize:60}),await t.printText({text:`
================================
`}),await t.setAlignment({alignment:0}),await t.printText({text:`Section: ${i.section||"-"}
`}),await t.printText({text:`Type: ${i.type||"-"}
`}),await t.printText({text:`Fee Paid: ${i.fee||"-"}

`}),await t.printText({text:`Date: ${i.date||"-"}
`}),await t.printText({text:`Time: ${i.time||"-"}

`}),await t.printText({text:`Queue Position: ${i.position||"-"} / ${i.total||"-"}

`}),await t.printText({text:`================================
`});const a="Thank you for choosing AL Raqi University Hospital";if(t.printTextWithFont)try{await t.printTextWithFont({text:a+`
`,typeface:"",fontSize:5})}catch{await t.printText({text:a+`
`})}else await t.printText({text:a+`
`});return await t.lineWrap({lines:3}),await t.cutPaper(),!0}catch(t){return console.error("SUNMI printer error:",t),window.print&&window.print(),!1}}async function p(){if(!e.isNativePlatform||!e.isNativePlatform())return{available:!1,platform:"web"};try{const i=await r(),t=await i.isAvailable(),a=await i.getPrinterStatus();return{available:t.available,status:a.status,platform:e.getPlatform()}}catch(i){return{available:!1,error:String(i),platform:e.getPlatform()}}}const w={isSunmiAvailable:l,printToken:s,checkPrinterStatus:p};export{p as checkPrinterStatus,w as default,l as isSunmiAvailable,s as printToken};
