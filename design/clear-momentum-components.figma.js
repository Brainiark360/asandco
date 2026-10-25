async function buildComponents(figma,D) {
  const p=await D.page('03 — Website components');
  if(p.children.length)throw new Error('Components already exist');
  const logoSet=await figma.getNodeByIdAsync('7:35');
  const created=[],sets={},properties={},sources=[];
  function comp(name,width,height,direction='VERTICAL',gap=0,pad=0,bg=null){
    const c=figma.createComponent();p.appendChild(c);c.name=name;c.layoutMode=direction;c.resize(width,height);
    c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.fills=bg?D.paint(bg):[];
    D.gap(c,'itemSpacing',gap);for(const side of ['Top','Right','Bottom','Left'])D.gap(c,`padding${side}`,pad);
    c.setBoundVariable('cornerRadius',D.variables['radius/0']);c.clipsContent=false;return c;
  }
  function stroke(n,key='border/default',weight=1){n.strokes=D.paint(key);n.setBoundVariable('strokeWeight',D.variables[`stroke/${weight}`]);n.strokeAlign='INSIDE';}
  function finalize(name,variants,description){
    const cs=figma.combineAsVariants(variants,p);cs.name='AS / '+name;cs.description=description;cs.fills=D.paint('bg/chalk');
    let y=40,maxWidth=0;const columnWidth=Math.max(...variants.map(n=>n.width))+32;
    variants.forEach((c,i)=>{c.x=40+(i%4)*columnWidth;c.y=y;maxWidth=Math.max(maxWidth,c.x+c.width);if(i%4===3||i===variants.length-1)y+=Math.max(...variants.slice(Math.floor(i/4)*4,i+1).map(n=>n.height))+32;});
    cs.resizeWithoutConstraints(maxWidth+40,y+8);cs.x=2200;cs.y=120+sources.reduce((sum,n)=>sum+n.height+100,0);sources.push(cs);sets[name]=cs.id;
    created.push(cs.id,...cs.findAll(()=>true).map(n=>n.id));return cs;
  }
  function expose(cs,labels){
    const mapping={};for(const [name,defaultValue,nodeName]of labels){const key=cs.addComponentProperty(name,'TEXT',defaultValue);mapping[name]=key;
      for(const c of cs.children){const n=c.findAllWithCriteria({types:['TEXT']}).find(t=>t.name===nodeName);if(n)n.componentPropertyReferences={characters:key};}}
    properties[cs.name.slice(5)]=mapping;return mapping;
  }
  function instance(cs,name,parent){const c=cs.children.find(v=>v.name===name);if(!c)throw new Error(name);const i=c.createInstance();parent.appendChild(i);return i;}
  function logo(parent,white=false,small=true){const c=logoSet.children.find(n=>n.name===`Format=${small?'Compact':'Primary'}, Colour=${white?'White':'Midnight'}`);const i=c.createInstance();parent.appendChild(i);return i;}
  const buttonVariants=[];
  for(const style of ['Primary','Secondary','Inverse'])for(const state of ['Default','Hover','Focus','Disabled']){
    const bg=state==='Disabled'?'bg/tint':style==='Primary'?(state==='Hover'?'brand/hover':'brand/cobalt'):style==='Inverse'?'brand/amber':'bg/white';
    const fg=state==='Disabled'?'text/secondary':style==='Primary'?'text/inverse':'text/primary';
    const c=comp(`Style=${style}, State=${state}`,240,52,'HORIZONTAL',16,16,bg);c.counterAxisAlignItems='CENTER';D.gap(c,'paddingLeft',24);D.gap(c,'paddingRight',24);
    if(style==='Secondary')stroke(c,'text/primary');if(state==='Focus')stroke(c,style==='Primary'?'brand/amber':'brand/cobalt',2);
    if(state==='Disabled')c.opacity=0.55;
    D.text(c,'Start a conversation','Button',156,fg,'Label');D.arrow(c,20,fg);buttonVariants.push(c);
  }
  const buttons=finalize('Button',buttonVariants,'Primary and inverse actions; 52px touch target. Default, hover, focus and disabled states. Use one dominant action per section.');
  expose(buttons,[['Label','Start a conversation','Label']]);

  const navs=[];
  for(const device of ['Desktop','Mobile']){
    const mobile=device==='Mobile',w=mobile?390:1440,pad=mobile?24:64;
    const c=comp(`Device=${device}`,w,mobile?88:100,'HORIZONTAL',32,pad,'bg/chalk');c.counterAxisAlignItems='CENTER';c.primaryAxisAlignItems='SPACE_BETWEEN';D.gap(c,'paddingTop',20);D.gap(c,'paddingBottom',20);
    const li=logo(c);if(mobile)li.rescale(.83);
    if(!mobile){const links=D.box(c,'Nav links',510,'HORIZONTAL',24);links.counterAxisAlignItems='CENTER';for(const label of ['Home','About','Services','Approach','Contact'])D.text(links,label,'Nav',label==='Approach'?82:label==='Services'?76:66,'text/primary','Link / '+label);instance(buttons,'Style=Primary, State=Default',c);}
    else {const menu=D.box(c,'Menu button',44,'VERTICAL',0,'bg/chalk',12,44);D.vector(menu,'Menu','<path d="M2 5H18M2 10H18M2 15H18" stroke="#142443" stroke-width="1.5"/>',20,20,'text/primary');}
    navs.push(c);
  }
  const nav=finalize('Navigation',navs,'Responsive site navigation. Mobile menu opens the dedicated menu overlay.');

  const svc=[],proc=[],projects=[],faqs=[],inputs=[],footers=[];
  for(const device of ['Desktop','Mobile']){
    const mobile=device==='Mobile',w=mobile?342:416;
    const s=comp(`Device=${device}`,w,448,'VERTICAL',24,32,'bg/white');
    D.text(s,'01 / POSITIONING','Label',w-64,'brand/cobalt','Eyebrow');D.text(s,'Brand &\npersonal presence',mobile?'Mobile/H3':'H3',w-64,'text/primary','Title');
    D.text(s,'Define how your business and its leaders are understood, remembered and trusted.','Body compact',w-64,'text/secondary','Description');
    const sl=D.box(s,'Service link',w-64,'HORIZONTAL',12);D.text(sl,'Explore service','Button',w-96,'text/primary','Link label');D.arrow(sl,20);svc.push(s);
    const q=comp(`Device=${device}`,w,320,'VERTICAL',24,32,'bg/chalk');
    D.text(q,'01','Label',w-64,'brand/cobalt','Number');D.text(q,'Strategy',mobile?'Mobile/H3':'H3',w-64,'text/primary','Title');
    D.text(q,'Understand the business, define the opportunity and choose a direction.','Body compact',w-64,'text/secondary','Description');D.line(q,w-64);D.text(q,'OUTPUT / A CLEAR GROWTH PLAN','Label',w-64,'text/primary','Outcome');proc.push(q);
    const pw=mobile?342:636;
    const pr=comp(`Device=${device}`,pw,mobile?354:460,'VERTICAL',24,0,'bg/chalk');
    const art=D.box(pr,'Project visual placeholder',pw,'HORIZONTAL',32,'bg/tint',32,mobile?204:300);art.counterAxisAlignItems='CENTER';D.mark(art,mobile?140:220,'brand/cobalt');
    const picLabel=D.box(art,'Placeholder note',mobile?90:270,'VERTICAL',12);D.text(picLabel,'CLIENT A','Label',mobile?90:270,'brand/cobalt');D.text(picLabel,'Visual placeholder','Small',mobile?90:270,'text/secondary');
    D.text(pr,'Client A','H4',pw,'text/primary','Title');D.text(pr,'Positioning + digital presence','Body compact',pw,'text/secondary','Subtitle');D.text(pr,'CASE STUDY PLACEHOLDER','Label',pw,'text/secondary','Status');projects.push(pr);
    const fw=mobile?342:1296;
    const faq=comp(`Device=${device}`,fw,mobile?102:76,'HORIZONTAL',24,24,'bg/chalk');faq.counterAxisAlignItems='CENTER';
    D.text(faq,'What does the first conversation involve?',mobile?'Body compact':'Lead',fw-96,'text/primary','Question');D.vector(faq,'Expand','<path d="M12 4V20M4 12H20" stroke="#142443" stroke-width="1.5"/>',24,24,'text/primary');faqs.push(faq);
    for(const state of ['Default','Focus','Error']){
      const iw=mobile?342:588;const inp=comp(`Device=${device}, State=${state}`,iw,130,'VERTICAL',8,0,null);
      D.text(inp,'Full name','Small',iw,'text/primary','Label');
      const field=D.box(inp,'Field surface',iw,'VERTICAL',0,'bg/white',16,56);stroke(field,state==='Error'?'feedback/error':state==='Focus'?'brand/cobalt':'border/default',state==='Focus'?2:1);
      D.text(field,'Your full name','Body compact',iw-32,'text/secondary','Placeholder');D.text(inp,state==='Error'?'Please enter your name.':'','Small',iw,state==='Error'?'feedback/error':'text/secondary','Help');inputs.push(inp);
    }
    const foot=comp(`Device=${device}`,mobile?390:1440,mobile?500:330,'VERTICAL',40,mobile?24:64,'bg/dark');
    const frow=D.box(foot,'Footer top',mobile?342:1312,mobile?'VERTICAL':'HORIZONTAL',mobile?32:96);logo(frow,true,false);
    const fbody=D.box(frow,'Footer proposition',mobile?342:420,'VERTICAL',16);D.text(fbody,'Clarity that creates momentum.','H4',mobile?342:420,'text/inverse');D.text(fbody,'Strategy, marketing and digital systems for ambitious businesses.','Body compact',mobile?342:420,'text/inverse-secondary');
    const flinks=D.box(frow,'Footer links',mobile?342:360,'VERTICAL',12);D.text(flinks,'About   /   Services   /   Approach','Small',mobile?342:360,'text/inverse');D.text(flinks,'Start a conversation','Button',mobile?342:360,'text/inverse','Contact link');
    D.line(foot,mobile?342:1312,'border/inverse');D.text(foot,'© Alexander Stephen & Co.','Small',mobile?342:1312,'text/inverse-secondary');footers.push(foot);
  }
  const services=finalize('Service card',svc,'Service pillar card. Replace the eyebrow, title and description through properties.');expose(services,[['Eyebrow','01 / POSITIONING','Eyebrow'],['Title','Brand & personal presence','Title'],['Description','Define how your business and its leaders are understood, remembered and trusted.','Description']]);
  const process=finalize('Process card',proc,'One phase of Strategy → Systems → Execution.');expose(process,[['Number','01','Number'],['Title','Strategy','Title'],['Description','Understand the business, define the opportunity and choose a direction.','Description'],['Outcome','OUTPUT / A CLEAR GROWTH PLAN','Outcome']]);
  const project=finalize('Project placeholder',projects,'Clearly labelled placeholder client work; no fabricated outcomes.');expose(project,[['Title','Client A','Title'],['Subtitle','Positioning + digital presence','Subtitle']]);
  const faq=finalize('FAQ row',faqs,'Closed FAQ row used in page mockups.');expose(faq,[['Question','What does the first conversation involve?','Question']]);
  const input=finalize('Input',inputs,'Label, field and help message. Default, focus and error states on desktop/mobile.');expose(input,[['Label','Full name','Label'],['Placeholder','Your full name','Placeholder'],['Help','','Help']]);
  const footer=finalize('Footer',footers,'Site footer with proposition and contact path.');
  const showcase=D.box(p,'Website components / Review',1800,'VERTICAL',40,'bg/chalk',64);showcase.x=120;showcase.y=120;
  D.text(showcase,'CLEAR MOMENTUM / WEBSITE COMPONENTS','Label',1672,'brand/cobalt');D.text(showcase,'A consistent kit of parts.','H1',1672);
  D.text(showcase,'Reusable components with named properties, responsive sizes and documented interaction states.','Lead',1672,'text/secondary');
  D.text(showcase,'Actions / default · hover · focus · disabled','H3',1672);
  for(const st of ['Primary','Secondary','Inverse']){const row=D.box(showcase,'Buttons / '+st,1672,'HORIZONTAL',24);for(const state of ['Default','Hover','Focus','Disabled'])instance(buttons,`Style=${st}, State=${state}`,row);}
  D.text(showcase,'Navigation / desktop and mobile','H3',1672);const ni=instance(nav,'Device=Desktop',showcase);const nmi=instance(nav,'Device=Mobile',showcase);
  D.text(showcase,'Content / services · process · client placeholders','H3',1672);
  const cardRow=D.box(showcase,'Content examples',1672,'HORIZONTAL',24);instance(services,'Device=Desktop',cardRow);instance(process,'Device=Desktop',cardRow);instance(project,'Device=Desktop',cardRow);
  D.text(showcase,'Form / default · focus · error','H3',1672);
  const forms=D.box(showcase,'Field states',1672,'HORIZONTAL',24);for(const state of ['Default','Focus','Error']){const i=instance(input,`Device=Mobile, State=${state}`,forms);if(state==='Error')i.setProperties({[properties.Input.Help]:'Please enter your name.'});}
  D.text(showcase,'FAQ / closed state','H3',1672);instance(faq,'Device=Desktop',showcase);
  await showcase.screenshot({scale:.65});
  return {createdNodeIds:[...created,...D.allIds(showcase)],sets,properties,rootId:showcase.id,pageId:p.id,validation:D.audit(showcase)};
}
