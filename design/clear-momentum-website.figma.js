async function buildWebsite(figma,D,device) {
  const mobile=device==='Mobile';
  const p=await D.page(mobile?'05 — Website / Mobile':'04 — Website / Desktop');
  const width=mobile?390:1440,pad=mobile?24:72,inner=width-2*pad;
  const cardWidth=mobile?342:416,bodyStyle=mobile?'Body compact':'Body',titleStyle=mobile?'Mobile/H2':'H2';
  const csIds={Button:'8:50',Navigation:'8:74',Service:'8:189',Process:'8:190',Project:'8:191',FAQ:'8:192',Input:'8:193',Footer:'8:194',Logo:'7:35'};
  const csValues=await Promise.all(Object.values(csIds).map(id=>figma.getNodeByIdAsync(id)));
  const sets=Object.fromEntries(Object.keys(csIds).map((k,i)=>[k,csValues[i]]));
  const created=[],links=[],screens={};
  const roots={Desktop:{Home:'9:2',About:'9:3',Services:'9:4',Approach:'9:5',Contact:'9:6'},Mobile:{Home:'9:7',About:'9:8',Services:'9:9',Approach:'9:10',Contact:'9:11'}}[device];
  const hColour='text/primary';
  function instance(key,parent,variant,values={},name=null) {
    const set=sets[key],c=set.children.find(n=>n.name===variant);if(!c)throw new Error(key+' / '+variant);
    const i=c.createInstance();parent.appendChild(i);if(name)i.name=name;
    const props={};for(const [label,value]of Object.entries(values)){const property=Object.keys(set.componentPropertyDefinitions).find(k=>k.split('#')[0]===label);if(!property)throw new Error('Missing '+label+' on '+key);props[property]=value;}
    if(Object.keys(props).length)i.setProperties(props);return i;
  }
  function target(node,to){links.push({id:node.id,to});return node;}
  function button(parent,label,to,style='Primary',full=mobile){
    const n=instance('Button',parent,`Style=${style}, State=Default`,{Label:label});
    if(full){n.resize(inner,52);n.primaryAxisAlignItems='SPACE_BETWEEN';}
    if(to)target(n,to);return n;
  }
  function textLink(parent,label,to,colour='text/primary',w=240){
    const row=D.box(parent,'Link / '+label,w,'HORIZONTAL',12);D.text(row,label,'Button',w-32,colour);D.arrow(row,20,colour);target(row,to);return row;
  }
  function section(parent,name,bg='bg/chalk',gap=40){return D.box(parent,name,width,'VERTICAL',gap,bg,pad);}
  function heading(parent,label,title,description=null,inverse=false){
    const colour=inverse?'text/inverse':'text/primary';
    D.text(parent,label,'Label',inner,inverse?'brand/amber':'brand/cobalt');
    D.text(parent,title,titleStyle,inner,colour);
    if(description)D.text(parent,description,bodyStyle,mobile?inner:760,inverse?'text/inverse-secondary':'text/secondary');
  }
  function nav(root,route){
    const n=instance('Navigation',root,`Device=${device}`);
    for(const t of n.findAllWithCriteria({types:['TEXT']}))if(t.name.startsWith('Link / ')){const label=t.name.slice(7);target(t,label);if(label===route)t.fills=D.paint('brand/cobalt');}
    const logo=n.findAllWithCriteria({types:['INSTANCE']}).find(v=>v.name.startsWith('Format='));if(logo)target(logo,'Home');
    const cta=n.findAllWithCriteria({types:['INSTANCE']}).find(v=>v.name.startsWith('Style='));if(cta)target(cta,'Contact');
    const menu=n.findAllWithCriteria({types:['FRAME']}).find(v=>v.name==='Menu button');if(menu)target(menu,'Menu');
  }
  function footer(root){const f=instance('Footer',root,`Device=${device}`);const t=f.findAllWithCriteria({types:['TEXT']}).find(v=>v.name==='Contact link');if(t)target(t,'Contact');const logo=f.findAllWithCriteria({types:['INSTANCE']}).find(v=>v.name.startsWith('Format='));if(logo)target(logo,'Home');}
  function heroMark(parent,size,colour='brand/amber'){
    const n=instance('Logo',parent,'Format=Symbol, Colour=White');for(const v of n.findAllWithCriteria({types:['VECTOR']}))if(v.fills.length)v.fills=D.paint(colour);n.rescale(size/64);return n;
  }
  function clients(parent){
    const s=section(parent,'Client relationships','bg/chalk',24);D.text(s,'SELECTED CLIENT RELATIONSHIPS','Label',inner,'text/secondary');
    const row=D.box(s,'Client logo placeholders',inner,mobile?'VERTICAL':'HORIZONTAL',24);
    for(const label of ['CLIENT A','CLIENT B','CLIENT C','CLIENT D']){const tile=D.box(row,'Logo placeholder / '+label,mobile?inner:306,'VERTICAL',8,null,mobile?16:24);D.text(tile,label,'H4',mobile?inner-32:258,'text/secondary');}
    D.text(s,'CLIENT NAMES AND LOGOS SHOWN AS PLACEHOLDERS','Label',inner,'text/secondary');D.line(s,inner);
  }
  const serviceData=[
    ['01 / POSITIONING','Brand &\npersonal presence','Define how your business and its leaders are understood, remembered and trusted.'],
    ['02 / DEMAND','Growth\nmarketing','Connect the right audience, channels and conversion systems to your business goals.'],
    ['03 / INFRASTRUCTURE','Technology &\ndigital systems','Build the websites, platforms and workflows that support your next stage of growth.'],
  ];
  function services(parent){
    const s=section(parent,'Services overview','bg/chalk',40);heading(s,'WHAT WE DO','Three ways to\nmove forward.','A focused set of services, connected by a clear strategy.');
    const row=D.box(s,'Service pillars',inner,mobile?'VERTICAL':'HORIZONTAL',24);
    serviceData.forEach(([Eyebrow,Title,Description])=>{const c=instance('Service',row,`Device=${device}`,{Eyebrow,Title,Description});target(c,'Services');});
  }
  const processData=[
    ['01','Strategy','Understand the business, define the opportunity and choose a clear direction.','OUTPUT / YOUR GROWTH PLAN'],
    ['02','Systems','Build the digital foundations and workflows that make the plan possible.','OUTPUT / CONNECTED FOUNDATIONS'],
    ['03','Execution','Put the plan to work, measure what matters and improve with intent.','OUTPUT / MEASURABLE PROGRESS'],
  ];
  function process(parent){
    const s=section(parent,'How we work','bg/dark',40);heading(s,'OUR APPROACH','Clear direction.\nConnected action.',null,true);
    const row=D.box(s,'Three phase framework',inner,mobile?'VERTICAL':'HORIZONTAL',24);
    processData.forEach(([Number,Title,Description,Outcome])=>instance('Process',row,`Device=${device}`,{Number,Title,Description,Outcome}));
    button(s,'See our approach','Approach','Inverse');
  }
  function work(parent){
    const s=section(parent,'Selected work','bg/white',40);heading(s,'SELECTED WORK','Good thinking.\nBuilt into action.');
    const row=D.box(s,'Client work placeholders',inner,mobile?'VERTICAL':'HORIZONTAL',24);
    instance('Project',row,`Device=${device}`,{Title:'Client A',Subtitle:'Brand positioning + digital presence'});
    const second=instance('Project',row,`Device=${device}`,{Title:'Client B',Subtitle:'Growth strategy + digital systems'});
    const graphic=second.findAllWithCriteria({types:['FRAME']}).find(n=>n.name==='Project visual placeholder');if(graphic)graphic.fills=D.paint('brand/amber');
    const client=second.findAllWithCriteria({types:['TEXT']}).find(n=>n.characters==='CLIENT A');if(client)client.characters='CLIENT B';
    D.text(s,'Case study titles and visuals are placeholders for the design review.','Small',inner,'text/secondary');
  }
  function cta(parent){
    const s=section(parent,'Conversation starter','bg/chalk',32);D.text(s,'YOUR NEXT CHAPTER','Label',inner,'brand/cobalt');
    D.text(s,'Your next move\nstarts here.',mobile?'Mobile/H1':'H1',inner);
    D.text(s,'Tell us where you want the business to go. We’ll help you see what needs to happen next.',bodyStyle,mobile?inner:720,'text/secondary');button(s,'Start a conversation','Contact');
  }
  function faq(parent,questions){const s=section(parent,'Common questions','bg/chalk',24);heading(s,'A LITTLE MORE CLARITY','Good questions.\nClear answers.');questions.forEach(Question=>{instance('FAQ',s,`Device=${device}`,{Question});D.line(s,inner);});}
  function pageHero(root,label,title,description,bg='bg/chalk',inverse=false){const s=section(root,'Page introduction',bg,32);D.text(s,label,'Label',inner,inverse?'brand/amber':'brand/cobalt');D.text(s,title,mobile?'Mobile/H1':'H1',mobile?inner:1100,inverse?'text/inverse':'text/primary');D.text(s,description,bodyStyle,mobile?inner:840,inverse?'text/inverse-secondary':'text/secondary');return s;}

  for(const route of ['Home','About','Services','Approach','Contact']){
    const root=await figma.getNodeByIdAsync(roots[route]);if(root.children.length)throw new Error(route+' already has content');root.fills=D.paint('bg/chalk');
    nav(root,route);
    if(route==='Home'){
      const h=section(root,'Home hero','brand/cobalt',32);D.text(h,'STRATEGY / MARKETING / DIGITAL SYSTEMS','Label',inner,'text/inverse');
      const row=D.box(h,'Hero composition',inner,mobile?'VERTICAL':'HORIZONTAL',mobile?40:96);row.counterAxisAlignItems='CENTER';
      const left=D.box(row,'Hero message',mobile?inner:720,'VERTICAL',32);
      D.text(left,mobile?'Make your\nnext move\ncount.':'Make your\nnext move count.',mobile?'Mobile/H1':'Display',mobile?inner:720,'text/inverse');
      D.text(left,'We bring clear strategy, disciplined marketing and the right technology together to move your business forward.',mobile?'Body compact':'Lead',mobile?inner:620,'text/inverse');
      const actions=D.box(left,'Hero actions',mobile?inner:620,mobile?'VERTICAL':'HORIZONTAL',24);button(actions,'Start a conversation','Contact','Inverse');textLink(actions,'Explore services','Services','text/inverse',mobile?inner:260);
      const right=D.box(row,'Brand sculpture',mobile?inner:480,'VERTICAL',24);heroMark(right,mobile?260:440);D.text(right,'CLEAR THINKING. REAL MOMENTUM.','Label',mobile?inner:480,'text/inverse');
      clients(root);services(root);work(root);process(root);
      const a=section(root,'Partnership statement','brand/amber',32);D.text(a,'A STRATEGIC PARTNER','Label',inner);D.text(a,'Better together.\nBy design.',titleStyle,inner);D.text(a,'We work with founders and leadership teams to bring the bigger picture and the practical next step into focus.',bodyStyle,mobile?inner:800);textLink(a,'Meet Alexander Stephen','About','text/primary',mobile?inner:320);
      cta(root);
    }
    if(route==='About'){
      pageHero(root,'ABOUT ALEXANDER STEPHEN','Clear thinking.\nCollective progress.','We help ambitious businesses bring direction to growth, structure to marketing and purpose to technology.');
      const b=section(root,'The company point of view','brand/cobalt',40);heroMark(b,mobile?180:280);D.text(b,'A strategic partner\nfor your next stage.',titleStyle,inner,'text/inverse');D.text(b,'Our work begins with understanding the business. We connect positioning, growth marketing and digital systems around the outcomes that matter.',bodyStyle,mobile?inner:950,'text/inverse');
      const beliefs=section(root,'Our beliefs','bg/white',32);heading(beliefs,'WHAT WE BELIEVE','Progress begins\nwith a point of view.');
      for(const [label,title,body]of [['01','Clarity before activity.','A shared direction makes the next decision easier. We define the objective, audience and priorities before recommending action.'],['02','Systems support scale.','Campaigns perform better when the foundations work together. We connect the tools, journeys and workflows that support growth.'],['03','Discipline creates progress.','Consistent execution, useful measurement and a willingness to improve keep the plan connected to the business.']]){
        D.line(beliefs,inner);const row=D.box(beliefs,title,inner,mobile?'VERTICAL':'HORIZONTAL',24);D.text(row,label,'Label',mobile?inner:96,'brand/cobalt');const col=D.box(row,'Belief content',mobile?inner:1176,'VERTICAL',16);D.text(col,title,mobile?'Mobile/H3':'H3',mobile?inner:1176);D.text(col,body,bodyStyle,mobile?inner:900,'text/secondary');
      }
      const audience=section(root,'Who we work with','bg/chalk',32);heading(audience,'THE RIGHT PARTNERSHIP','Built for businesses\nready to move forward.','Our work is suited to founders, executives and teams who value clear thinking and coordinated delivery.');
      for(const v of ['Growth focused businesses','Professional services firms','Technology enabled companies','High trust brands']){D.line(audience,inner);D.text(audience,v,mobile?'Mobile/H3':'H3',inner);}
      process(root);cta(root);
    }
    if(route==='Services'){
      const h=pageHero(root,'OUR SERVICES','A clearer path\nfrom ambition\nto growth.','Three connected service pillars. Each begins with the business objective and is shaped around what will move it forward.');
      const shortcuts=D.box(h,'Service shortcuts',inner,mobile?'VERTICAL':'HORIZONTAL',24);for(const label of ['Brand & presence','Growth marketing','Digital systems'])D.text(shortcuts,label,'Button',mobile?inner:360,'brand/cobalt');
      const details=[
        ['01 / POSITIONING','Brand &\npersonal presence','Shape how the market understands your business and its leaders.','Brand and positioning strategy|Personal branding for founders and executives|Digital presence strategy|Content direction for authority and trust','A clearer, more credible presence before the first conversation.'],
        ['02 / DEMAND','Growth\nmarketing','Connect strategy, channels and conversion around the right growth objective.','Growth strategy and funnel design|Customer acquisition and conversion systems|Performance marketing and optimisation|Measurement, reporting and learning','A coordinated approach to demand, leads and revenue.'],
        ['03 / INFRASTRUCTURE','Technology &\ndigital systems','Build the digital foundations that help your business work better and grow.','Conversion focused websites|Web applications and digital platforms|Data management and reporting|CRM and workflow solutions','Useful technology that supports scale and better decisions.'],
      ];
      details.forEach(([label,title,description,inclusions,outcome],index)=>{
        const s=section(root,title,index===1?'bg/tint':'bg/white',32);D.text(s,label,'Label',inner,'brand/cobalt');
        const row=D.box(s,'Service detail',inner,mobile?'VERTICAL':'HORIZONTAL',mobile?32:72);
        const intro=D.box(row,'Service intent',mobile?inner:588,'VERTICAL',24);D.text(intro,title,titleStyle,mobile?inner:588);D.text(intro,description,bodyStyle,mobile?inner:540,'text/secondary');
        const list=D.box(row,'Typical inclusions',mobile?inner:636,'VERTICAL',20);D.text(list,'TYPICAL INCLUSIONS','Label',mobile?inner:636,'text/secondary');for(const line of inclusions.split('|')){D.line(list,mobile?inner:636);D.text(list,line,'Body compact',mobile?inner:636);}
        const strip=D.box(s,'Intended outcome',inner,'VERTICAL',12,'bg/chalk',24);D.text(strip,'THE INTENDED OUTCOME','Label',inner-48,'brand/cobalt');D.text(strip,outcome,'H4',inner-48);
        button(s,'Discuss your project','Contact');
      });
      process(root);cta(root);
    }
    if(route==='Approach'){
      pageHero(root,'OUR APPROACH','A plan is only as good\nas what happens next.','Strategy sets the direction. Systems make it possible. Execution turns it into progress.','brand/cobalt',true);
      const phaseDetails=[
        ['01 / STRATEGY','Start with\nthe right questions.','We get clear on your business, audience and growth objective before choosing the work.','Business and market understanding|Positioning and priority setting|A focused growth roadmap'],
        ['02 / SYSTEMS','Build the foundations\nfor the plan.','We design the tools, journeys and ways of working that make coordinated delivery possible.','Digital customer journeys|Websites, CRM and workflows|Measurement and reporting foundations'],
        ['03 / EXECUTION','Make progress.\nThen make it better.','We put the plan into action with clear responsibilities, useful measurement and regular learning.','Campaign and project delivery|Performance reviews|Ongoing optimisation'],
      ];
      phaseDetails.forEach(([label,title,description,outputs],index)=>{
        const s=section(root,title,index===1?'bg/tint':'bg/chalk',32);D.text(s,label,'Label',inner,'brand/cobalt');D.text(s,title,titleStyle,inner);D.text(s,description,bodyStyle,mobile?inner:840,'text/secondary');D.line(s,inner);
        D.text(s,'WHAT THIS PHASE PRODUCES','Label',inner);for(const output of outputs.split('|'))D.text(s,output,'H4',inner);
      });
      const note=section(root,'Working relationship','bg/dark',24);heading(note,'ONE CONNECTED PARTNERSHIP','A clear direction,\nshared all the way through.','Each phase informs the next. We keep the work connected to the business objective and the decisions in front of you.',true);
      faq(root,['Can we start with one service?','Do we need a full brief before we speak?','How do you define success?']);cta(root);
    }
    if(route==='Contact'){
      const c=section(root,'Contact introduction and enquiry','bg/chalk',40);
      const row=D.box(c,'Contact layout',inner,mobile?'VERTICAL':'HORIZONTAL',mobile?40:72);
      const left=D.box(row,'Contact invitation',mobile?inner:588,'VERTICAL',32);
      D.text(left,'START A CONVERSATION','Label',mobile?inner:588,'brand/cobalt');D.text(left,'Let’s make\nyour next\nmove count.',mobile?'Mobile/H1':'H1',mobile?inner:588);
      D.text(left,'Tell us where the business is now, where you want to go and what stands in the way.',bodyStyle,mobile?inner:540,'text/secondary');
      D.line(left,mobile?inner:588);D.text(left,'WHAT HAPPENS NEXT','Label',mobile?inner:588,'brand/cobalt');
      for(const [n,t]of [['01','We review your enquiry.'],['02','We discuss the business and your goals.'],['03','We agree a useful next step.']])D.text(left,n+'  /  '+t,'Body compact',mobile?inner:588);
      const form=D.box(row,'Enquiry form',mobile?inner:636,'VERTICAL',16,mobile?null:'bg/white',mobile?0:24);
      const fields=[['Full name *','Your full name'],['Work email *','you@company.com'],['Company','Your company name'],['Website','https://yourwebsite.com']];
      for(const [Label,Placeholder]of fields)instance('Input',form,`Device=${device}, State=Default`,{Label,Placeholder,Help:''});
      const message=instance('Input',form,`Device=${device}, State=Default`,{Label:'What would you like to move forward? *',Placeholder:'Tell us about your goals and the challenge.',Help:''});
      message.resize(mobile?342:588,210);const surface=message.findAllWithCriteria({types:['FRAME']}).find(n=>n.name==='Field surface');surface.resize(mobile?342:588,136);
      const send=button(form,'Send enquiry','Sent','Primary',false);if(mobile){send.resize(inner,52);send.primaryAxisAlignItems='SPACE_BETWEEN';}
      D.text(form,'We’ll use your details to respond to your enquiry.','Small',mobile?inner:588,'text/secondary');
      faq(root,['What does the first conversation involve?','Can you help us define the scope?','Can we discuss a single project?']);
    }
    footer(root);root.placeholder=false;screens[route]=root.id;created.push(...D.allIds(root));
  }
  if(mobile){
    const menu=D.box(p,'Menu / Mobile',390,'VERTICAL',32,'bg/chalk',24,844);menu.x=120+5*550;menu.y=160;
    const top=D.box(menu,'Menu header',342,'HORIZONTAL',24);const l=instance('Logo',top,'Format=Compact, Colour=Midnight');l.rescale(.83);const close=D.box(top,'Close menu',44,'VERTICAL',0,null,12,44);D.vector(close,'Close','<path d="M4 4L16 16M16 4L4 16" fill="none" stroke="#142443" stroke-width="1.5"/>',20,20,'text/primary');target(close,'Home');
    D.line(menu,342);for(const label of ['Home','About','Services','Approach','Contact']){const t=D.text(menu,label,'Mobile/H2',342);target(t,label);}button(menu,'Start a conversation','Contact');screens.Menu=menu.id;created.push(...D.allIds(menu));
  }
  const sent=D.box(p,'Contact / Enquiry sent / '+device,width,'VERTICAL',0,'bg/chalk',0);sent.x=120+(mobile?6:5)*(width+160);sent.y=160;nav(sent,'Contact');
  const thank=section(sent,'Success confirmation','bg/chalk',32);heroMark(thank,mobile?120:180,'brand/cobalt');D.text(thank,'ENQUIRY RECEIVED','Label',inner,'brand/cobalt');D.text(thank,'Thanks for\nstarting the conversation.',mobile?'Mobile/H1':'H1',inner);D.text(thank,'We’ll review what you’ve shared and get back to you to discuss the next step.',bodyStyle,mobile?inner:760,'text/secondary');button(thank,'Back to home','Home');footer(sent);screens.Sent=sent.id;created.push(...D.allIds(sent));
  const validation=[];for(const id of Object.values(screens))validation.push(D.audit(await figma.getNodeByIdAsync(id)));
  return {createdNodeIds:created,screens,links,device,validation};
}
