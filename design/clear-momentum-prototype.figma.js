async function connectASPrototype(figma,D,state,device,textareaInfo) {
  const mobile=device==='Mobile';
  await D.page(mobile?'05 — Website / Mobile':'04 — Website / Desktop');
  const changed=[];
  const textarea=await figma.getNodeByIdAsync(textareaInfo.textareaId);
  const message=await figma.getNodeByIdAsync(mobile?'10:1147':'10:552');
  message.swapComponent(textarea.children.find(n=>n.name===`Device=${device}`));
  message.setProperties({[textareaInfo.props.Label]:'What would you like to move forward? *',[textareaInfo.props.Placeholder]:'Tell us about your goals and the challenge.',[textareaInfo.props.Help]:''});
  message.resize(mobile?342:588,210);changed.push(message.id);
  const screens=state.screens,links=[...state.links];
  const roots=await Promise.all(Object.values(screens).map(id=>figma.getNodeByIdAsync(id)));
  for(const root of roots){
    const nav=root.children.find(n=>n.name==='AS / Navigation');
    if(nav){
      const logo=nav.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='AS / Logo');
      const button=nav.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='AS / Button');
      if(logo)links.push({id:logo.id,to:'Home'});if(button)links.push({id:button.id,to:'Contact'});
    }
    const footer=root.children.find(n=>n.name==='AS / Footer');
    if(footer){const logo=footer.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='AS / Logo');if(logo)links.push({id:logo.id,to:'Home'});}
  }
  if(mobile){
    const home=await figma.getNodeByIdAsync(screens.Home);
    const grid=home.findAllWithCriteria({types:['FRAME']}).find(n=>n.name==='Client logo placeholders');
    if(grid.children.length===4){
      const tiles=[...grid.children];
      for(let i=0;i<2;i++){
        const row=D.box(grid,'Client row '+(i+1),342,'HORIZONTAL',24);
        for(const tile of tiles.slice(i*2,i*2+2)){
          row.appendChild(tile);tile.resize(159,tile.height);tile.layoutSizingVertical='HUG';
          for(const t of tile.findAllWithCriteria({types:['TEXT']})){t.resize(127,t.height);t.textAutoResize='HEIGHT';t.layoutSizingVertical='HUG';changed.push(t.id);}
          changed.push(tile.id);
        }
        changed.push(row.id);
      }
      changed.push(grid.id);
    }
  }
  function topFrame(n){let t=n;while(t.parent&&t.parent.type!=='PAGE')t=t.parent;return t;}
  const unique=[...new Map(links.map(l=>[l.id,l])).values()];
  const sources=await Promise.all(unique.map(l=>figma.getNodeByIdAsync(l.id)));
  const targets=[];
  for(let i=0;i<sources.length;i++){
    const n=sources[i],dest=screens[unique[i].to];
    if(!n||!dest||topFrame(n).id===dest)continue;
    targets.push({n,dest});
  }
  await Promise.all(targets.map(({n,dest})=>n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:dest,navigation:'NAVIGATE',transition:null,resetScrollPosition:true}]}])));
  changed.push(...targets.map(t=>t.n.id));
  const service=await figma.getNodeByIdAsync(screens.Services);
  for(const [label,name]of [['Brand & presence','Brand &\npersonal presence'],['Growth marketing','Growth\nmarketing'],['Digital systems','Technology &\ndigital systems']]){
    const t=service.findAllWithCriteria({types:['TEXT']}).find(n=>n.characters===label);
    const section=service.children.find(n=>n.name===name);
    if(t&&section){await t.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:section.id,navigation:'SCROLL_TO',transition:null}]}]);changed.push(t.id);}
  }
  const validation=roots.map(D.audit);
  await roots[0].screenshot({scale:mobile?.38:.45});
  return {mutatedNodeIds:changed,linkedNodes:targets.length,validation};
}
