async function createASHelpers(figma) {
  const variables = Object.fromEntries((await figma.variables.getLocalVariablesAsync()).map(v=>[v.name,v]));
  const styles = Object.fromEntries((await figma.getLocalTextStylesAsync()).filter(s=>s.name.startsWith('AS / ')).map(s=>[s.name.slice(5),s]));
  const fonts = [...new Map(Object.values(styles).map(s=>[JSON.stringify(s.fontName),s.fontName])).values()];
  await Promise.all([...fonts,{family:'Inter',style:'Regular'}].map(f=>figma.loadFontAsync(f)));
  const paint = key => {
    const v=variables[key]; if(!v) throw new Error(`Missing colour ${key}`);
    return [figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v)];
  };
  const gap=(n,key,value)=>{const v=variables[`space/${value}`];if(v)n.setBoundVariable(key,v);else n[key]=value;};
  function box(parent,name,width,direction='VERTICAL',spacing=0,bg=null,padding=0,height=null) {
    const f=figma.createAutoLayout(direction); parent.appendChild(f); f.name=name;
    f.resize(width,height||100); f.layoutSizingHorizontal='FIXED'; f.layoutSizingVertical=height?'FIXED':'HUG';
    gap(f,'itemSpacing',spacing);
    for(const side of ['Top','Right','Bottom','Left'])gap(f,`padding${side}`,padding);
    f.fills=bg?paint(bg):[];f.clipsContent=false;
    f.setBoundVariable('cornerRadius',variables['radius/0']);
    return f;
  }
  function text(parent,content,style,width,colour='text/primary',name=null) {
    const s=styles[style];if(!s)throw new Error(`Missing text style ${style}`);
    const t=figma.createText(); parent.appendChild(t);t.name=name||content.slice(0,45);
    t.fontName=s.fontName;t.textStyleId=s.id;t.resize(width,s.fontSize*1.4);
    t.layoutSizingHorizontal='FIXED';t.fills=paint(colour);t.characters=content;
    t.textAutoResize='HEIGHT';t.layoutSizingVertical='HUG';return t;
  }
  function line(parent,width,colour='border/default') {
    const n=figma.createRectangle();parent.appendChild(n);n.name='Divider';n.resize(width,1);n.fills=paint(colour);return n;
  }
  function vector(parent,name,body,width,height,colour=null) {
    const svg=figma.createNodeFromSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`);
    parent.appendChild(svg);svg.name=name;
    if(colour)for(const n of svg.findAllWithCriteria({types:['VECTOR']})){if(n.fills.length)n.fills=paint(colour);if(n.strokes.length)n.strokes=paint(colour);}
    return svg;
  }
  const symbolPath='M6 58V26H26L46 6H58V38L38 58H6ZM20 44H32L44 32V20H40L20 40V44Z';
  function mark(parent,size,colour='brand/cobalt') {
    const n=vector(parent,'Momentum aperture',`<path d="${symbolPath}" fill="#244BFF" fill-rule="evenodd"/>`,64,64,colour);
    n.rescale(size/64);return n;
  }
  function arrow(parent,size=20,colour='text/primary') {
    const n=vector(parent,'Arrow', '<path d="M4 12H20M14 6L20 12L14 18" fill="none" stroke="#142443" stroke-width="1.5"/>',24,24,colour);
    n.rescale(size/24);return n;
  }
  async function page(name) {const p=figma.root.children.find(n=>n.name===name);if(!p)throw new Error('Missing page '+name);await figma.setCurrentPageAsync(p);return p;}
  function allIds(root){return [root.id,...root.findAll(()=>true).map(n=>n.id)];}
  function audit(root){
    const nodes=root.findAll(()=>true),frames=nodes.filter(n=>n.type==='FRAME'||n.type==='COMPONENT'||n.type==='INSTANCE');
    return {id:root.id,name:root.name,width:root.width,height:root.height,nodes:nodes.length,texts:nodes.filter(n=>n.type==='TEXT').length,instances:nodes.filter(n=>n.type==='INSTANCE').length,images:nodes.filter(n=>'fills' in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).length,overflows:frames.flatMap(f=>f.children.filter(c=>c.visible&&c.name!=='Decorative crop'&&(c.x< -1||c.y< -1||c.x+c.width>f.width+1||c.y+c.height>f.height+1)).map(c=>({parent:f.name,child:c.name,id:c.id}))).slice(0,30)};
  }
  return {variables,styles,paint,gap,box,text,line,vector,mark,arrow,page,allIds,audit};
}
