async function buildIdentity(figma,D) {
  const p=await D.page('02 — Clear Momentum identity');
  if(p.children.length)throw new Error('Identity page is populated');
  const variants=[],created=[];
  const colours={Cobalt:'brand/cobalt',Midnight:'text/primary',White:'text/inverse'};
  for(const format of ['Primary','Compact','Symbol'])for(const [colour,key]of Object.entries(colours)){
    const c=figma.createComponent();p.appendChild(c);c.name=`Format=${format}, Colour=${colour}`;
    c.layoutMode='HORIZONTAL';c.counterAxisAlignItems='CENTER';c.fills=[];
    c.resize(format==='Primary'?320:format==='Compact'?218:64,format==='Primary'?64:format==='Compact'?44:64);
    c.primaryAxisSizingMode='AUTO';c.counterAxisSizingMode='AUTO';D.gap(c,'itemSpacing',format==='Primary'?16:12);
    if(format!=='Symbol'){
      D.mark(c,format==='Primary'?56:38,key);
      D.text(c,'alexander\nstephen & co.',format==='Primary'?'Logo':'Logo small',format==='Primary'?236:164,key,'Wordmark');
    }else D.mark(c,64,key);
    variants.push(c);created.push(...D.allIds(c));
  }
  const set=figma.combineAsVariants(variants,p);set.name='AS / Logo';set.description='Clear Momentum logo suite. Primary lockup minimum 180px; compact minimum 140px; symbol minimum 16px. Clear space is one quarter of symbol height. Never stretch, outline or rearrange the mark.';
  set.children.forEach((n,i)=>{n.x=40+(i%3)*380;n.y=40+Math.floor(i/3)*120;});
  set.resizeWithoutConstraints(1180,400);set.x=2100;set.y=120;set.fills=D.paint('bg/tint');created.push(set.id);
  const ref=(format,colour)=>set.children.find(n=>n.name===`Format=${format}, Colour=${colour}`);
  function logo(parent,format,colour,scale=1){const n=ref(format,colour).createInstance();parent.appendChild(n);if(scale!==1)n.rescale(scale);return n;}
  const root=D.box(p,'Clear Momentum / Identity guidelines',1800,'VERTICAL',0,'bg/chalk',0);root.x=120;root.y=120;root.placeholder=true;
  const header=D.box(root,'Identity introduction',1800,'VERTICAL',24,'bg/chalk',64);
  D.text(header,'ALEXANDER STEPHEN & CO. / IDENTITY V1','Label',1672,'brand/cobalt');
  D.text(header,'Clear thinking.\nReal momentum.','H1',1672);
  D.text(header,'A confident identity for a strategic partner connecting positioning, growth and digital systems.','Lead',1100,'text/secondary');
  const brand=D.box(root,'Primary identity expression',1800,'HORIZONTAL',96,'brand/cobalt',80);brand.counterAxisAlignItems='CENTER';
  const left=D.box(brand,'Logo and brand line',1000,'VERTICAL',48);logo(left,'Primary','White',1.8);
  D.text(left,'Clarity that creates momentum.','H3',1000,'text/inverse');
  logo(brand,'Symbol','White',5);
  const logoSection=D.box(root,'Logo system',1800,'VERTICAL',32,'bg/chalk',64);
  D.text(logoSection,'01 / LOGO SYSTEM','Label',1672,'brand/cobalt');
  const row=D.box(logoSection,'Logo alternatives',1672,'HORIZONTAL',24);
  for(const [name,format,colour,bg]of [['Primary / on light','Primary','Midnight','bg/white'],['Compact / on dark','Compact','White','bg/dark'],['Symbol / brand','Symbol','Cobalt','bg/white']]){
    const tile=D.box(row,name,541,'VERTICAL',32,bg,32,220);logo(tile,format,colour,format==='Compact'?1.1:1);
    D.text(tile,name,'Small',477,colour==='White'?'text/inverse-secondary':'text/secondary');
  }
  D.text(logoSection,'Construction: an open square connects to a rising diagonal. The square represents structure; the diagonal gives it direction. Use the symbol as a compact signature and as the source of the larger graphic language.','Body',1672,'text/secondary');
  D.text(logoSection,'Clear space: ¼ symbol height on every side. Minimums: primary 180px, compact 140px, symbol 16px. Use one colour; keep the original proportions.','Body compact',1672);
  const colour=D.box(root,'Colour system',1800,'VERTICAL',32,'bg/white',64);
  D.text(colour,'02 / COLOUR SYSTEM','Label',1672,'brand/cobalt');
  D.text(colour,'Cobalt leads. Chalk gives it room.','H2',1672);
  const swatches=D.box(colour,'Brand palette',1672,'HORIZONTAL',16);
  const palette=[['Cobalt','#244BFF','brand/cobalt','text/inverse','Signature / primary action'],['Warm chalk','#F5F3EC','bg/chalk','text/primary','Primary reading surface'],['Midnight','#142443','bg/dark','text/inverse','Typography / dark sections'],['Soft amber','#FFCE73','brand/amber','text/primary','Accent / highlights'],['White','#FFFFFF','bg/white','text/primary','Cards / reversed logo']];
  for(const [name,hex,bg,fg,role]of palette){const tile=D.box(swatches,name,321.6,'VERTICAL',20,bg,24,210);D.text(tile,name,'H4',273.6,fg);D.text(tile,hex,'Label',273.6,fg);D.text(tile,role,'Small',273.6,fg);}
  D.text(colour,'Typical balance: 50% chalk and white / 25% cobalt / 20% midnight / 5% amber. This is a compositional guide, not a fixed page quota.','Body compact',1672,'text/secondary');
  const pairs=[['White on cobalt','White / Cobalt','#FFFFFF','#244BFF'],['Midnight on chalk','Midnight / Chalk','#142443','#F5F3EC'],['Midnight on amber','Midnight / Amber','#142443','#FFCE73']];
  function luminance(h){const channels=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4));return .2126*channels[0]+.7152*channels[1]+.0722*channels[2];}
  const contrast=pairs.map(([name,_,a,b])=>({name,ratio:((Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05)).toFixed(2)}));
  D.text(colour,contrast.map(c=>`${c.name}: ${c.ratio}:1`).join('     /     '),'Body compact',1672);
  D.text(colour,'Use midnight text on amber. Reserve amber for shapes and highlights on blue; use white for small text on blue.','Small',1672,'text/secondary');
  const type=D.box(root,'Typography',1800,'VERTICAL',32,'bg/chalk',64);
  D.text(type,'03 / TYPOGRAPHY','Label',1672,'brand/cobalt');
  D.text(type,'A clear sense of direction.','H1',1672);
  const typeRow=D.box(type,'Typography roles',1672,'HORIZONTAL',48);
  const tx1=D.box(typeRow,'Display family',812,'VERTICAL',16);D.text(tx1,'Space Grotesk Medium','H3',812);D.text(tx1,'Headlines, wordmark and short statements. Sentence case. Tight but readable spacing.','Body',812,'text/secondary');
  const tx2=D.box(typeRow,'Reading family',812,'VERTICAL',16);D.text(tx2,'Manrope Regular / SemiBold','H3',812);D.text(tx2,'Body copy, buttons and navigation. IBM Plex Mono is reserved for short labels and annotations.','Body',812,'text/secondary');
  for(const [label,spec]of [['Display','96 / 96 desktop · 50 / 52 mobile'],['Page title','72 / 76 desktop · 50 / 52 mobile'],['Section title','52 / 56 desktop · 36 / 40 mobile'],['Body','18 / 28 desktop · 16 / 24 mobile'],['Labels & actions','12 / 18 labels · 16 / 20 buttons']]){
    const r=D.box(type,'Type scale / '+label,1672,'HORIZONTAL',48);D.text(r,label,'Body',600);D.text(r,spec,'Body',1024,'text/secondary');D.line(type,1672);
  }
  const rules=D.box(root,'Graphic and voice rules',1800,'HORIZONTAL',64,'bg/dark',64);
  const ruleLeft=D.box(rules,'Graphic rules',804,'VERTICAL',24);D.text(ruleLeft,'04 / GRAPHIC LANGUAGE','Label',804,'brand/amber');D.text(ruleLeft,'Structure.\nWith forward motion.','H2',804,'text/inverse');D.text(ruleLeft,'Crop the symbol at generous scale. Use decisive colour fields, square edges, strong type and clean alignment. Give each section one dominant gesture.','Body',804,'text/inverse-secondary');
  const ruleRight=D.box(rules,'Voice rules',804,'VERTICAL',24);D.text(ruleRight,'05 / VOICE','Label',804,'brand/amber');D.text(ruleRight,'Assured, direct, human.','H2',804,'text/inverse');D.text(ruleRight,'Use active verbs and concrete outcomes. Explain the next step. Avoid inflated claims, fabricated numbers and repeated statements of the same idea.','Body',804,'text/inverse-secondary');
  root.placeholder=false;
  await root.screenshot({scale:0.65});
  return {createdNodeIds:[...created,...D.allIds(root)],pageId:p.id,rootId:root.id,logoSetId:set.id,logos:Object.fromEntries(set.children.map(c=>[c.name,c.id])),contrast,validation:D.audit(root)};
}
