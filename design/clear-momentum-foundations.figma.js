async function buildFoundations(figma) {
  const created = [];
  const existing = await figma.variables.getLocalVariableCollectionsAsync();
  if (existing.some(c => c.name === 'AS / Primitives')) throw new Error('Foundations already exist');
  function collection(name) {
    const c = figma.variables.createVariableCollection(name);
    c.renameMode(c.modes[0].modeId, 'Default');
    created.push(c.id);
    return c;
  }
  function rgb(h) { return { r: parseInt(h.slice(1,3),16)/255, g:parseInt(h.slice(3,5),16)/255, b:parseInt(h.slice(5,7),16)/255 }; }
  function variable(c, name, kind, value, scopes) {
    const v = figma.variables.createVariable(name, c, kind);
    v.setValueForMode(c.modes[0].modeId, value);
    v.scopes = scopes;
    v.setVariableCodeSyntax('WEB', `var(--as-${name.replace(/[\s/]+/g,'-').toLowerCase()})`);
    created.push(v.id);
    return v;
  }
  const primitives = collection('AS / Primitives');
  const colors = collection('AS / Colour');
  const layout = collection('AS / Layout');
  const raw = { cobalt:'#244BFF', 'cobalt-deep':'#1938CB', midnight:'#142443', chalk:'#F5F3EC', white:'#FFFFFF', amber:'#FFCE73', muted:'#58647A', line:'#D5D9E1', 'blue-tint':'#E8EDFF', 'inverse-muted':'#B8C5DF', error:'#A9363C', success:'#236B4B' };
  const prim = {};
  for (const [name, value] of Object.entries(raw)) prim[name] = variable(primitives, `palette/${name}`, 'COLOR', rgb(value), []);
  const semantic = {
    'brand/cobalt':['cobalt',['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR']],
    'brand/hover':['cobalt-deep',['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR']],
    'brand/amber':['amber',['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR']],
    'bg/chalk':['chalk',['FRAME_FILL','SHAPE_FILL']],
    'bg/white':['white',['FRAME_FILL','SHAPE_FILL']],
    'bg/dark':['midnight',['FRAME_FILL','SHAPE_FILL']],
    'bg/tint':['blue-tint',['FRAME_FILL','SHAPE_FILL']],
    'text/primary':['midnight',['TEXT_FILL','SHAPE_FILL','STROKE_COLOR']],
    'text/secondary':['muted',['TEXT_FILL','SHAPE_FILL','STROKE_COLOR']],
    'text/inverse':['white',['TEXT_FILL','SHAPE_FILL','STROKE_COLOR']],
    'text/inverse-secondary':['inverse-muted',['TEXT_FILL','SHAPE_FILL','STROKE_COLOR']],
    'border/default':['line',['STROKE_COLOR','SHAPE_FILL']],
    'border/inverse':['muted',['STROKE_COLOR','SHAPE_FILL']],
    'feedback/error':['error',['TEXT_FILL','STROKE_COLOR','SHAPE_FILL']],
    'feedback/success':['success',['TEXT_FILL','STROKE_COLOR','SHAPE_FILL']],
  };
  const variables = {};
  for (const [name, [primitive, scopes]] of Object.entries(semantic)) variables[name] = variable(colors,name,'COLOR',figma.variables.createVariableAlias(prim[primitive]),scopes).id;
  for (const n of [0,4,8,12,16,20,24,32,40,48,64,72,80,96,120]) variables[`space/${n}`] = variable(layout,`space/${n}`,'FLOAT',n,['GAP']).id;
  for (const n of [0,4]) variables[`radius/${n}`] = variable(layout,`radius/${n}`,'FLOAT',n,['CORNER_RADIUS']).id;
  for (const n of [1,2]) variables[`stroke/${n}`] = variable(layout,`stroke/${n}`,'FLOAT',n,['STROKE_FLOAT']).id;
  for (const [k,v] of Object.entries({display:'Space Grotesk',body:'Manrope',label:'IBM Plex Mono'})) variables[`font/${k}`] = variable(layout,`font/${k}`,'STRING',v,['FONT_FAMILY']).id;
  const specs = [
    ['Display','Space Grotesk','Medium',96,96,-3],
    ['H1','Space Grotesk','Medium',72,76,-2.2],
    ['H2','Space Grotesk','Medium',52,56,-1.5],
    ['H3','Space Grotesk','Medium',32,38,-0.7],
    ['H4','Space Grotesk','Medium',24,30,-0.4],
    ['Mobile/H1','Space Grotesk','Medium',50,52,-1.7],
    ['Mobile/H2','Space Grotesk','Medium',36,40,-1],
    ['Mobile/H3','Space Grotesk','Medium',28,32,-0.6],
    ['Lead','Manrope','Regular',20,30,0],
    ['Body','Manrope','Regular',18,28,0],
    ['Body compact','Manrope','Regular',16,24,0],
    ['Small','Manrope','Regular',14,21,0],
    ['Button','Manrope','SemiBold',16,20,0],
    ['Nav','Manrope','SemiBold',14,20,0],
    ['Label','IBM Plex Mono','Regular',12,18,0.5],
    ['Logo','Space Grotesk','Medium',32,30,-1],
    ['Logo small','Space Grotesk','Medium',21,20,-0.6],
  ];
  const fonts = [...new Map(specs.map(s=>[`${s[1]}-${s[2]}`,{family:s[1],style:s[2]}])).values()];
  await Promise.all(fonts.map(f=>figma.loadFontAsync(f)));
  const styles = {};
  for (const [name,family,style,size,lineHeight,tracking] of specs) {
    const s = figma.createTextStyle(); s.name=`AS / ${name}`;
    s.fontName={family,style}; s.fontSize=size;
    s.lineHeight={unit:'PIXELS',value:lineHeight}; s.letterSpacing={unit:'PIXELS',value:tracking};
    styles[name]=s.id; created.push(s.id);
  }
  const pages = {};
  for (const name of ['02 — Clear Momentum identity','03 — Website components','04 — Website / Desktop','05 — Website / Mobile']) {
    let p = figma.root.children.find(n=>n.name===name);
    if(!p){p=figma.createPage();p.name=name;created.push(p.id);}
    pages[name]=p.id;
  }
  const allVars=await figma.variables.getLocalVariablesAsync();
  return {createdNodeIds:created,pages,variables,styles,raw,counts:{collections:3,variables:allVars.length,styles:specs.length},validation:{brokenAliases:allVars.filter(v=>Object.values(v.valuesByMode).some(val=>val&&typeof val==='object'&&val.type==='VARIABLE_ALIAS'&&!allVars.some(t=>t.id===val.id))).length,missingSyntax:allVars.filter(v=>!v.codeSyntax.WEB).length,allScopes:allVars.filter(v=>v.scopes.includes('ALL_SCOPES')).length}};
}
