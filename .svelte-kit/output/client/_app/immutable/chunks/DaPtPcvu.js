import{_ as f}from"./C1FmrZbK.js";function o(){return typeof window<"u"&&!!(window.sunmi&&window.sunmi.printer)}async function a(n={}){if(typeof window>"u")return!1;if(o())try{const t=window.sunmi.printer;if(t.sendRaw&&typeof t.sendRaw=="function"){const{buildReceipt:e,toBase64:r}=await f(async()=>{const{buildReceipt:T,toBase64:c}=await import("./Dx8xWyhu.js");return{buildReceipt:T,toBase64:c}},[],import.meta.url),i=["AL RAQI UNIVERSITY","HOSPITAL","================================","QUEUE TOKEN"],s=[`TOKEN NUMBER: ${n.number||""}`,`Section: ${n.section||"-"}`,`Type: ${n.type||"-"}`,`Fee Paid: ${n.fee||"-"}`,`Date: ${n.date||"-"}`,`Time: ${n.time||"-"}`,`Queue Position: ${n.position||"-"} / ${n.total||"-"}`],p=e({header:i,lines:s,footer:["================================","INSTRUCTIONS:","Please wait for your number","Keep this token with you","Thank you for choosing AL Raqi University Hospital"]}),u=r(p);return t.sendRaw(u),!0}return t.printerInit&&t.printerInit(),t.setAlignment&&t.setAlignment(1),t.printTextWithFont&&t.printTextWithFont(`AL RAQI UNIVERSITY
HOSPITAL
`,"",30,!0),t.printText&&t.printText(`================================
`),t.printTextWithFont&&t.printTextWithFont(`QUEUE TOKEN

`,"",24,!0),t.setAlignment&&t.setAlignment(1),t.printTextWithFont&&t.printTextWithFont((n.number||"")+`
`,"",60,!0),t.printText&&t.printText(`
================================
`),t.setAlignment&&t.setAlignment(0),t.printText&&t.printText(`Section: ${n.section||"-"}
`),t.printText&&t.printText(`Type: ${n.type||"-"}
`),t.printText&&t.printText(`Fee Paid: ${n.fee||"-"}

`),t.printText&&t.printText(`Date: ${n.date||"-"}
`),t.printText&&t.printText(`Time: ${n.time||"-"}

`),t.printText&&t.printText(`Queue Position: ${n.position||"-"} / ${n.total||"-"}

`),t.printText&&t.printText(`================================
`),t.printText&&t.printText(`INSTRUCTIONS:
- Please wait for your number
- Keep this token with you
- Listen for announcements
- If you miss your turn, inform the reception

`),t.printText&&t.printText(`================================
     Thank you for choosing
   AL Raqi University Hospital

`),t.lineWrap&&t.lineWrap(3),t.cutPaper&&t.cutPaper(),!0}catch(t){return console.error("SUNMI printer error:",t),window.print&&window.print(),!1}return window.print&&window.print(),!1}async function w(){if(typeof window>"u")return{available:!1};const n=o(),t={available:n,methods:[]};if(!n)return t;try{const e=window.sunmi.printer,r=["printerInit","setAlignment","printTextWithFont","printText","lineWrap","cutPaper","printBitmap","printQRCode","sendRaw","getPrinterStatus","getPrinterInfo"];if(t.methods=r.filter(i=>typeof e[i]=="function"),typeof e.getPrinterStatus=="function")try{const i=e.getPrinterStatus();t.status=i}catch(i){t.statusError=String(i)}}catch(e){t.error=String(e)}return t}const m={isSunmiAvailable:o,printToken:a};export{w as checkPrinterStatus,m as default,o as isSunmiAvailable,a as printToken};
