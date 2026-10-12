/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('fs'),sharp=require('sharp');
(async()=>{
 const src='.impeccable/art-sources/mascot-life-atlas.png';
 const walk=[[35,40,425,575,200],[460,40,415,575,630],[875,40,379,575,1030]];
 const held=[[35,627,370,600],[435,627,370,600],[835,627,419,600]];
 for(const [name,cells] of [['walk',walk],['struggle',held]])for(let i=0;i<3;i++){
  const [left,top,width,height,foot]=cells[i];
  const input=await sharp(src).extract({left,top,width,height}).resize(Math.round(width*.8),Math.round(height*.8)).png().toBuffer();
  const dx=name==='walk'?Math.round(360-(foot-left)*.8):220;
  const dy=name==='walk'?132:124;
  const out=`public/forge/mascot-${name}-${i}.webp`;
  await sharp({create:{width:600,height:600,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input,left:dx,top:dy}]).webp({quality:92}).toFile(out);
  fs.writeFileSync(out+'.json',JSON.stringify({source:'built-in image_gen',prompt:fs.readFileSync('.impeccable/mascot-life-prompt.txt','utf8'),atlasFrame:i,animation:name},null,2));
 }
 for(let i=0;i<4;i++){
  const input=await sharp(`public/forge/mascot-idle-${i}.webp`).resize(560,560).extract({left:0,top:0,width:520,height:540}).png().toBuffer();
  await sharp({create:{width:600,height:600,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input,left:80,top:60}]).webp({quality:92}).toFile(`public/forge/mascot-rest-${i}.webp`);
 }
})();
