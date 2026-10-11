/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('fs');
const sharp=require('sharp');
(async()=>{
 const src='C:/Users/ronde/.codex/generated_images/01a12b1b-4620-7c51-8380-72add46de39d/exec-44e40533-2766-4f6e-81fb-f98af76dc47c.png';
 fs.copyFileSync(src,'.impeccable/art-sources/mascot-idle-atlas.png');
 for(let i=0;i<4;i++){
  // Exclude neighboring tail artwork that crosses into the empty left gutter.
  const cell=await sharp(src).extract({left:(i%2)*627+40,top:Math.floor(i/2)*627,width:587,height:627}).png().toBuffer();
  const {data,info}=await sharp(cell).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let sum=0,count=0,bottom=0;
  for(let y=545;y<615;y++){
   let row=0;
   for(let x=125;x<500;x++)if(data[(y*info.width+x)*4+3]>230){sum+=x;count++;row++;}
   if(row>20)bottom=y;
  }
  const left=Math.round(350-sum/count),top=650-bottom;
  const output=`public/forge/mascot-idle-${i}.webp`;
  await sharp({create:{width:700,height:700,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:cell,left,top}]).webp({quality:91}).toFile(output);
  fs.writeFileSync(output+'.json',JSON.stringify({source:'built-in image_gen',prompt:fs.readFileSync('.impeccable/mascot-idle-prompt.txt','utf8'),reference:'mascot.webp',atlasFrame:i,alignment:{footCenter:350,baseline:650,left,top}},null,2));
  console.log(output,{left,top});
 }
})();
