/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('fs');
const sharp=require('sharp');
(async()=>{
 const src='.impeccable/art-sources/mascot-craft-atlas.png';
 const cells=[
  [60,0,500,540,340,530],[620,0,425,540,800,530],[1045,0,491,540,1325,530],
  [20,550,530,450,330,965],[550,550,495,450,830,965],[1045,550,491,450,1325,965],
 ];
 for(let i=0;i<cells.length;i++){
  const [x,y,width,height,footX,footY]=cells[i];
  const cell=await sharp(src).extract({left:x,top:y,width,height}).png().toBuffer();
  const output=`public/forge/mascot-craft-${i}.webp`;
  await sharp({create:{width:600,height:600,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:cell,left:x+360-footX,top:y+580-footY}]).webp({quality:92}).toFile(output);
  fs.writeFileSync(output+'.json',JSON.stringify({source:'built-in image_gen',prompt:fs.readFileSync('.impeccable/mascot-craft-prompt.txt','utf8'),atlasFrame:i,alignment:{footCenter:360,baseline:580,impact:{x:120,y:380}}},null,2));
 }
})();
