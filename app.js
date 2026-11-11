const $=id=>document.getElementById(id);let artImg=null;
const styleMap={
mascot:"A distinctive cute but tough rally driver mascot wearing a white open-face racing helmet with black visor, black racing suit, orange harness, seated confidently; bold sticker illustration with thick clean white die-cut outline.",
technical:"A dramatic turbocharger, engine internals, tachometer, pistons and mechanical details; highly detailed motorsport illustration with bold sticker outline.",
rallycar:"An aggressive rally car sliding on gravel, dramatic dust cloud, dynamic perspective, gravel spray and racing attitude; motorsport poster illustration.",
retro:"Vintage rally motorsport illustration, classic rally typography, aged racing graphics, old-school number plates and retro sticker composition.",
seasonal:"Rally driver mascot in a seasonal scene with relevant props and rally atmosphere, maintaining the established Rallymania mascot identity and sticker illustration style."
};
function toast(t){let el=$('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('active',x.id===b.dataset.tab));}));
$('makePrompt').onclick=()=>{
 const kind=$('kind').value,theme=$('theme').value||'Lithuanian rally culture',slogan=$('slogan').value||'original short Lithuanian rally slogan',subject=$('subject').value||'Rallymania helmeted driver mascot';
 const transparent=$('transparent').checked;
 const p=`Create an ORIGINAL premium Rallymania LT motorsport merchandise print design for: ${kind}.\nTHEME: ${theme}.\nMAIN SUBJECT: ${subject}.\nEXACT TEXT TO INCLUDE: "${slogan}". Render the text accurately, correctly spelled, bold and readable.\nVISUAL STYLE: ${styleMap[$('style').value]}\nBRAND ART DIRECTION: black, pure white and vivid racing orange (${ $('colors').value }); extreme contrast; bold slanted motorsport lettering; distressed brush-stroke accents; checkered racing flags; gravel, tire marks, dust or snow where relevant; thick white sticker-cut outline; layered black shadow; professional screen-print / DTF-ready graphic; dynamic composition; crisp detailed vector-meets-cartoon illustration; strong central focal point; authentic Lithuanian rally fan attitude.\nLAYOUT: centered composition, balanced silhouette, readable at shirt-print size, no mockup photography, no random logos, no watermarks, no extra text, no misspellings.\nBACKGROUND: ${transparent?'transparent background, isolated artwork, clean edges, no shirt, no person wearing it':'solid black background'}.\nThe result must look like a coherent Rallymania collection design, not a generic AI stock graphic.`;
 $('designPrompt').textContent=p;$('designResult').hidden=false;toast('Dizaino promptas paruoštas.');
};
$('copyDesign').onclick=async()=>{await navigator.clipboard.writeText($('designPrompt').textContent);toast('Promptas nukopijuotas.');};
function drawPoster(){
 const c=$('poster'),ctx=c.getContext('2d'),w=c.width,h=c.height;
 ctx.fillStyle='#080808';ctx.fillRect(0,0,w,h);
 // gritty diagonal background
 for(let i=0;i<120;i++){ctx.fillStyle=i%2?'#171717':'#202020';ctx.globalAlpha=.35;ctx.save();ctx.translate((i*137)%w,(i*83)%h);ctx.rotate(-.4);ctx.fillRect(-80,-8,180,16);ctx.restore()}ctx.globalAlpha=1;
 // checker strips
 for(let y=0;y<90;y+=30)for(let x=0;x<260;x+=30){ctx.fillStyle=((x+y)/30)%2?'#111':'#f2f2f2';ctx.save();ctx.translate(x,y);ctx.rotate(-.12);ctx.fillRect(0,0,30,30);ctx.restore()}
 ctx.strokeStyle='#ff4b12';ctx.lineWidth=14;ctx.strokeRect(22,22,w-44,h-44);
 ctx.fillStyle='#ff3d12';ctx.save();ctx.translate(w/2,160);ctx.rotate(-.035);ctx.fillRect(-390,-62,780,124);ctx.restore();
 ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='1000 88px Arial';ctx.fillText(($('headline').value||'NAUJIENA!').toUpperCase(),w/2,185);
 ctx.fillStyle='#fff';ctx.font='900 54px Arial';ctx.fillText(($('pname').value||'RALLYMANIA').toUpperCase().slice(0,27),w/2,310);
 if(artImg){let maxW=770,maxH=620,scale=Math.min(maxW/artImg.width,maxH/artImg.height);let iw=artImg.width*scale,ih=artImg.height*scale;ctx.drawImage(artImg,(w-iw)/2,360+(600-ih)/2,iw,ih)}
 else {ctx.fillStyle='#151515';ctx.fillRect(180,390,720,490);ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.strokeRect(180,390,720,490);ctx.fillStyle='#ff4b12';ctx.font='900 38px Arial';ctx.fillText('ĮKELK PRODUKTO DIZAINĄ',w/2,620);ctx.fillStyle='#ddd';ctx.font='28px Arial';ctx.fillText('PNG arba JPG',w/2,670)}
 const price=$('sale').value||$('price').value||'17';
 ctx.fillStyle='#f5f5f5';ctx.save();ctx.translate(w/2,1060);ctx.rotate(-.025);ctx.fillRect(-480,-76,960,152);ctx.restore();
 ctx.fillStyle='#080808';ctx.font='900 55px Arial';ctx.fillText(($('ptype').value||'MARŠKINĖLIAI'),w/2,1047);
 ctx.fillStyle='#ff3b13';ctx.save();ctx.translate(w/2,1200);ctx.rotate(-.02);ctx.fillRect(-330,-75,660,150);ctx.restore();
 ctx.fillStyle='#fff';ctx.font='1000 105px Arial';ctx.fillText(price+' €',w/2,1235);
 const shopLogo=new Image();shopLogo.src='assets/rallymania-shop-logo.png';
 if(shopLogo.complete && shopLogo.naturalWidth){ctx.drawImage(shopLogo,(w-330)/2,1210,330,125);}
 else {ctx.fillStyle='#fff';ctx.font='bold 29px Arial';ctx.fillText('RALLYMANIA.SHOP',w/2,1310);}
}
$('art').onchange=e=>{const f=e.target.files[0];if(!f)return;const u=URL.createObjectURL(f);artImg=new Image();artImg.onload=()=>{drawPoster();URL.revokeObjectURL(u)};artImg.src=u;};
$('render').onclick=()=>{drawPoster();toast('Reklamos maketas atnaujintas.');};
$('download').onclick=()=>{drawPoster();let a=document.createElement('a');a.download='rallymania-reklama.png';a.href=$('poster').toDataURL('image/png');a.click();};
$('captionBtn').onclick=()=>{let n=$('pname').value||'Rallymania naujiena',p=$('sale').value||$('price').value||'17',until=$('until').value;let sale=$('sale').value?`🔥 Akcijos kaina – ${p} €${until?' iki '+until:''}.`:`Kaina – ${p} €.`;$('caption').value=`🏁 NAUJIENA – ${n.toUpperCase()}!\n\nTikriems ralio ir automobilių sporto fanams.\n${sale}\n\nAtrask savo ralio stilių – RALLYMANIA.SHOP\n\n#Rallymania #RallymaniaShop #RallyFans #Motorsport`;toast('Reklaminis tekstas sukurtas.');};
$('copyCaption').onclick=async()=>{await navigator.clipboard.writeText($('caption').value);toast('Tekstas nukopijuotas.');};
['pname','ptype','price','sale','headline'].forEach(id=>$(id).addEventListener('input',drawPoster));drawPoster();
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));