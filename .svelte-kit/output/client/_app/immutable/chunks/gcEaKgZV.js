function i(){return typeof window<"u"&&!!(window.sunmi&&window.sunmi.printer)}async function e(t={}){if(typeof window>"u")return!1;if(i())try{const n=window.sunmi.printer;return n.printerInit&&n.printerInit(),n.setAlignment&&n.setAlignment(1),n.printTextWithFont&&n.printTextWithFont(`AL RAQI UNIVERSITY
HOSPITAL
`,"",30,!0),n.printText&&n.printText(`================================
`),n.printTextWithFont&&n.printTextWithFont(`QUEUE TOKEN

`,"",24,!0),n.setAlignment&&n.setAlignment(1),n.printTextWithFont&&n.printTextWithFont((t.number||"")+`
`,"",60,!0),n.printText&&n.printText(`
================================
`),n.setAlignment&&n.setAlignment(0),n.printText&&n.printText(`Section: ${t.section||"-"}
`),n.printText&&n.printText(`Type: ${t.type||"-"}
`),n.printText&&n.printText(`Fee Paid: ${t.fee||"-"}

`),n.printText&&n.printText(`Date: ${t.date||"-"}
`),n.printText&&n.printText(`Time: ${t.time||"-"}

`),n.printText&&n.printText(`Queue Position: ${t.position||"-"} / ${t.total||"-"}

`),n.printText&&n.printText(`================================
`),n.printText&&n.printText(`INSTRUCTIONS:
- Please wait for your number
- Keep this token with you
- Listen for announcements
- If you miss your turn, inform the reception

`),n.printText&&n.printText(`================================
     Thank you for choosing
   AL Raqi University Hospital

`),n.lineWrap&&n.lineWrap(3),n.cutPaper&&n.cutPaper(),!0}catch(n){return console.error("SUNMI printer error:",n),window.print&&window.print(),!1}return window.print&&window.print(),!1}export{i,e as p};
