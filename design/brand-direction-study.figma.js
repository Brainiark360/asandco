async function buildBrandStudy(figma) {
  const root = await figma.getNodeByIdAsync('1:2');
  if (!root || root.type !== 'FRAME') throw new Error('Review canvas missing');
  if (root.children.length) throw new Error('Canvas populated; inspect before retrying');
  const fontPairs = [
    ['Inter', 'Regular'], ['Manrope', 'Regular'], ['Manrope', 'SemiBold'],
    ['Instrument Serif', 'Regular'], ['Space Grotesk', 'Medium'],
    ['DM Sans', 'Regular'], ['DM Sans', 'Medium'], ['IBM Plex Mono', 'Regular'],
  ];
  await Promise.all(fontPairs.map(([family, style]) => figma.loadFontAsync({ family, style })));
  const rgb = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
  const fill = h => [{ type: 'SOLID', color: rgb(h) }];
  const ink = '#20231F', muted = '#62645F';

  function box(parent, name, direction, width, gap = 0, background = null, padding = 0, height = null) {
    const f = figma.createAutoLayout(direction);
    parent.appendChild(f);
    f.name = name;
    f.resize(width, height || 100);
    f.layoutSizingHorizontal = 'FIXED';
    f.layoutSizingVertical = height ? 'FIXED' : 'HUG';
    f.itemSpacing = gap;
    f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = padding;
    f.fills = background ? fill(background) : [];
    f.clipsContent = false;
    return f;
  }

  function type(parent, name, content, family, size, colour, width, style = 'Regular', leading = 1.2, tracking = 0) {
    const t = figma.createText();
    parent.appendChild(t);
    t.name = name;
    t.fontName = { family, style };
    t.fontSize = size;
    t.textAutoResize = 'HEIGHT';
    t.resize(width, Math.ceil(size * leading));
    t.layoutSizingHorizontal = 'FIXED';
    t.lineHeight = { unit: 'PIXELS', value: size * leading };
    t.letterSpacing = { unit: 'PIXELS', value: tracking };
    t.fills = fill(colour);
    t.characters = content;
    t.textAutoResize = 'HEIGHT';
    t.layoutSizingVertical = 'HUG';
    return t;
  }

  function rule(parent, width, colour) {
    const n = figma.createRectangle();
    parent.appendChild(n);
    n.name = 'Editorial rule';
    n.resize(width, 1);
    n.fills = fill(colour);
    return n;
  }

  function art(parent, name, contents, width, height) {
    const n = figma.createNodeFromSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${contents}</svg>`);
    parent.appendChild(n);
    n.name = name;
    return n;
  }

  const intro = box(root, 'Working brand foundation', 'VERTICAL', 3816, 18);
  type(intro, 'Study label', 'ALEXANDER STEPHEN & CO. / IDENTITY EXPLORATION 01', 'IBM Plex Mono', 18, muted, 3700);
  type(intro, 'Study title', 'Clarity that creates momentum.', 'Manrope', 74, ink, 3700, 'SemiBold', 1.08, -2);
  type(intro, 'Scope', 'Three possible identities for a consultancy connecting strategy, marketing and technology. Working concepts for discussion.', 'Manrope', 25, muted, 3650);
  const brief = box(intro, 'Foundation', 'HORIZONTAL', 3816, 48);
  const foundations = [
    ['ROLE', 'A strategic partner that turns business ambition into a clear direction and coordinated action.'],
    ['CHARACTER', 'Intelligent, assured, practical and ambitious. Human enough to trust; precise enough to deliver.'],
    ['EXPRESSION', 'A distinctive wordmark, a disciplined colour system, purposeful graphics and a recognisable voice.'],
    ['STATUS', 'Brand direction concepts. Copy is exploratory. Client names and logos may remain placeholders.'],
  ];
  foundations.forEach(([label, detail]) => {
    const c = box(brief, label, 'VERTICAL', 918, 12);
    type(c, label, label, 'IBM Plex Mono', 14, muted, 918);
    type(c, `${label} detail`, detail, 'Manrope', 21, ink, 918, 'Regular', 1.45);
  });

  const directions = [
    {
      id: '01', name: 'Considered Authority', posture: 'EDITORIAL / ASSURED / ENDURING',
      base: '#F2EDE4', dark: '#48252F', accent: '#C7674D', soft: '#BDB3A6',
      display: 'Instrument Serif', displayStyle: 'Regular', headline: 'Clarity.\nThen growth.',
      headlineSize: 112, promise: 'Clear thinking.\nDecisive action.',
      families: 'Instrument Serif + Manrope',
      typeNote: 'Expressive serif headlines. Composed sans serif body copy. Fine annotations and generous, intentional spacing.',
      logic: 'For a consultancy whose value begins with judgment. Warm paper, oxblood and expressive serif type communicate depth and personal attention.',
      graphic: 'Architectural framing, fine rules and deliberate crop. Abstract structure feels considered and purposeful.',
      photo: 'Natural light, tactile materials and candid portraits. Warm, documentary photography with quiet confidence.',
      voice: 'Measured and direct. Use specific ideas, short statements and the language of business decisions.',
      trade: 'Most established and personal. Needs expressive project imagery to avoid suggesting a legal or financial firm.',
    },
    {
      id: '02', name: 'Clear Momentum', posture: 'CONTEMPORARY / CONFIDENT / ACTIVE',
      base: '#F5F3EC', dark: '#142443', accent: '#244BFF', soft: '#FFCE73',
      display: 'Space Grotesk', displayStyle: 'Medium', headline: 'Make your\nnext move\ncount.',
      headlineSize: 88, promise: 'Direction creates\nmomentum.',
      families: 'Space Grotesk + Manrope',
      typeNote: 'Distinctive sans serif headlines. Compact messages. Bold scale changes and generous margins.',
      logic: 'A modern consultancy with creative range and execution capability. Cobalt, warm chalk and a directional mark create a confident, recognisable presence.',
      graphic: 'A forward aperture: a square opens into a rising diagonal. Use the shape as a crop, transition and image window across the brand.',
      photo: 'People in motion, close collaboration and confident project crops. Clear, bright photography with energetic composition.',
      voice: 'Assured, concise and active. Name the ambition, explain the decision and show the next move.',
      trade: 'Strongest bridge between strategy, marketing and technology. Disciplined use of the blue preserves sophistication.',
    },
    {
      id: '03', name: 'Quiet Precision', posture: 'SYSTEMATIC / INTELLIGENT / COMPOSED',
      base: '#F0F3EC', dark: '#10382F', accent: '#E59671', soft: '#AEC5B6',
      display: 'DM Sans', displayStyle: 'Medium', headline: 'Growth,\nengineered.',
      headlineSize: 86, promise: 'Make the parts\nwork together.',
      families: 'DM Sans + IBM Plex Mono',
      typeNote: 'Open sans serif headlines with precise monospaced labels. Calm hierarchy and clear information structure.',
      logic: 'An identity built around connected systems. Deep green, sage and restrained apricot make analytical thinking feel composed and human.',
      graphic: 'Concentric routes, connected nodes and precise annotations. Graphics explain relationships rather than imply unverified results.',
      photo: 'Focused teams, technical details and systems in context. Soft contrast, controlled colour and selective overhead compositions.',
      voice: 'Clear and explanatory. Show how things connect, define the outcome and keep technical language useful.',
      trade: 'Most convincing for technology and systems. Needs expressive messaging to keep marketing and personal branding visible.',
    },
  ];

  const boards = box(root, 'Three visual territories', 'HORIZONTAL', 3816, 32);
  const boardIds = [];
  directions.forEach(d => {
    const board = box(boards, `${d.id} — ${d.name}`, 'VERTICAL', 1250, 28, '#FEFEFC', 40);
    board.placeholder = true;
    boardIds.push(board.id);
    const heading = box(board, 'Direction label', 'VERTICAL', 1170, 8);
    type(heading, 'Direction number', `${d.id} / ${d.posture}`, 'IBM Plex Mono', 13, muted, 1170);
    type(heading, 'Direction name', d.name, 'Manrope', 36, ink, 1170, 'SemiBold', 1.15, -0.8);
    const routeLabel = d.id === '02' ? 'RECOMMENDED STARTING POINT' : d.id === '01' ? 'A RELATIONSHIP BUILT ON JUDGMENT' : 'A BUSINESS BUILT ON CONNECTED SYSTEMS';
    type(heading, 'Route posture', routeLabel, 'IBM Plex Mono', 12, d.id === '02' ? d.accent : muted, 1170);

    const heroBg = d.id === '01' ? d.base : d.id === '02' ? d.accent : d.dark;
    const heroInk = d.id === '01' ? d.dark : d.base;
    const hero = box(board, 'Identity specimen', 'VERTICAL', 1170, 44, heroBg, 48);
    const mast = box(hero, 'Wordmark exploration', 'HORIZONTAL', 1074, 28);
    mast.counterAxisAlignItems = 'CENTER';
    if (d.id === '01') {
      type(mast, 'Wordmark — exploratory', 'Alexander Stephen & Co.', 'Instrument Serif', 46, heroInk, 760);
      type(mast, 'Brand descriptor', 'STRATEGY\n& GROWTH', 'IBM Plex Mono', 12, heroInk, 286, 'Regular', 1.4, 1);
    } else if (d.id === '02') {
      type(mast, 'Wordmark — exploratory', 'alexander\nstephen & co.', 'Space Grotesk', 31, heroInk, 760, 'Medium', 0.96, -1);
      type(mast, 'Brand descriptor', 'STRATEGY. MARKETING.\nDIGITAL SYSTEMS.', 'IBM Plex Mono', 12, heroInk, 286, 'Regular', 1.5);
    } else {
      art(mast, 'Connection mark — exploratory', `<path d="M8 8H32V32H56V56H32V32H8Z" fill="none" stroke="${heroInk}" stroke-width="3"/><circle cx="32" cy="32" r="6" fill="${d.accent}"/>`, 64, 64);
      type(mast, 'Wordmark — exploratory', 'ALEXANDER\nSTEPHEN & CO.', 'DM Sans', 20, heroInk, 654, 'Medium', 1.05, 1.3);
      type(mast, 'Brand descriptor', 'STRATEGY / SYSTEMS\n/ EXECUTION', 'IBM Plex Mono', 12, heroInk, 300, 'Regular', 1.5);
    }

    const heroRow = box(hero, 'Primary brand expression', 'HORIZONTAL', 1074, 42);
    heroRow.counterAxisAlignItems = 'CENTER';
    const content = box(heroRow, 'Brand message', 'VERTICAL', 590, 24);
    type(content, 'Brand headline', d.headline, d.display, d.headlineSize, heroInk, 590, d.displayStyle, d.id === '01' ? 0.98 : 1, d.id === '01' ? -1.5 : -3);
    type(content, 'Brand proposition', 'We bring strategy, marketing and technology together to move your business forward.', 'Manrope', 20, heroInk, 530, 'Regular', 1.45);
    if (d.id === '01') {
      art(heroRow, 'Architectural framing', `<rect x="12" y="12" width="418" height="292" rx="146" fill="none" stroke="${d.soft}"/><path d="M75 304V158C75 80 136 19 214 19H367V304Z" fill="${d.dark}"/><path d="M148 304V174C148 126 187 87 235 87H367V304Z" fill="${d.accent}"/><path d="M221 304V196C221 176 237 160 257 160H367V304Z" fill="${d.base}"/><path d="M12 304H430M367 12V304" stroke="${d.dark}"/>`, 442, 316);
    } else if (d.id === '02') {
      art(heroRow, 'Forward aperture', `<path d="M38 298V102H234V298H38Z" fill="${d.soft}"/><path d="M75 270L332 13H438V119L181 340Z" fill="${d.soft}"/><rect x="77" y="141" width="118" height="118" fill="${d.accent}"/><path d="M145 273L332 86H365V119L178 306Z" fill="${d.accent}"/>`, 442, 340);
    } else {
      art(heroRow, 'Connected routes', `<g fill="none" stroke="${d.soft}" stroke-width="1"><circle cx="221" cy="158" r="140"/><circle cx="221" cy="158" r="100"/><circle cx="221" cy="158" r="60"/><path d="M1 158H441M221 0V316M81 18L361 298M81 298L361 18"/></g><path d="M81 158A140 140 0 0 1 221 18" stroke="${d.accent}" stroke-width="8" fill="none"/><circle cx="221" cy="18" r="10" fill="${d.accent}"/><circle cx="221" cy="158" r="13" fill="${d.base}"/><circle cx="361" cy="158" r="7" fill="${d.soft}"/><circle cx="221" cy="298" r="7" fill="${d.soft}"/>`, 442, 316);
    }
    rule(hero, 1074, d.id === '01' ? d.soft : d.id === '02' ? '#6D87FF' : '#3D5B50');
    const signature = d.id === '01' ? 'CLARITY / SYSTEMS / GROWTH' : d.id === '02' ? 'CLEAR THINKING. REAL MOMENTUM.' : '01 STRATEGY    02 SYSTEMS    03 EXECUTION';
    type(hero, 'Brand signature', signature, 'IBM Plex Mono', 13, heroInk, 1074, 'Regular', 1.2, 1);

    const palette = box(board, 'Colour exploration', 'VERTICAL', 1170, 12);
    type(palette, 'Palette label', 'COLOUR SYSTEM', 'IBM Plex Mono', 12, muted, 1170);
    const swatches = box(palette, 'Palette swatches', 'HORIZONTAL', 1170, 12);
    const colours = [
      [d.id === '01' ? 'Oxblood' : d.id === '02' ? 'Cobalt' : 'Deep green', d.id === '02' ? d.accent : d.dark, d.base],
      [d.id === '01' ? 'Warm paper' : d.id === '02' ? 'Warm chalk' : 'Cloud', d.base, d.dark],
      [d.id === '01' ? 'Terracotta' : d.id === '02' ? 'Soft amber' : 'Apricot', d.id === '02' ? d.soft : d.accent, d.dark],
      [d.id === '01' ? 'Stone' : d.id === '02' ? 'Midnight' : 'Sage', d.id === '02' ? d.dark : d.soft, d.id === '02' ? d.base : d.dark],
    ];
    colours.forEach(([label, bg, fg]) => {
      const s = box(swatches, label, 'VERTICAL', 283.5, 18, bg, 16, 104);
      type(s, `${label} name`, label, 'Manrope', 14, fg, 251.5, 'SemiBold');
      type(s, `${label} hex`, bg, 'IBM Plex Mono', 12, fg, 251.5);
    });

    const typography = box(board, 'Typography exploration', 'HORIZONTAL', 1170, 28, d.base, 28);
    const display = box(typography, 'Display type', 'VERTICAL', 530, 10);
    type(display, 'Display sample', d.id === '01' ? 'Aa  &' : d.id === '02' ? 'Aa / 01' : 'Aa. 01', d.display, 74, d.dark, 530, d.displayStyle, 1, -1.5);
    type(display, 'Typeface family', d.families, 'Manrope', 17, d.dark, 530, 'SemiBold', 1.3);
    const textRoles = box(typography, 'Type roles', 'VERTICAL', 556, 12);
    const typePromise = d.id === '01' ? 'A considered point of view.' : d.id === '02' ? 'A clear sense of direction.' : 'Every part, connected.';
    type(textRoles, 'Typography principle', typePromise, 'Manrope', 27, d.dark, 556, 'Regular', 1.18, -0.4);
    type(textRoles, 'Type role guidance', d.typeNote, 'Manrope', 17, d.dark, 530, 'Regular', 1.45);

    const applications = box(board, 'Applications', 'HORIZONTAL', 1170, 24);
    const card = box(applications, 'Business card concept', 'VERTICAL', 573, 28, d.dark, 28, 240);
    const cardName = d.id === '01' ? 'Alexander\nStephen & Co.' : d.id === '02' ? 'alexander\nstephen & co.' : 'ALEXANDER\nSTEPHEN & CO.';
    type(card, 'Business card wordmark', cardName, d.display, d.id === '01' ? 37 : 30, d.base, 517, d.displayStyle, 1.02, -0.6);
    rule(card, 517, d.id === '01' ? d.soft : d.id === '02' ? '#516073' : '#48675B');
    type(card, 'Business card descriptor', 'STRATEGY / MARKETING / DIGITAL SYSTEMS', 'IBM Plex Mono', 10, d.base, 517);
    const social = box(applications, 'Social graphic concept', 'VERTICAL', 573, 20, d.id === '02' ? d.soft : d.base, 28, 240);
    type(social, 'Application label', 'ALEXANDER STEPHEN / PERSPECTIVES', 'IBM Plex Mono', 10, d.dark, 517);
    type(social, 'Application statement', d.promise, d.display, d.id === '01' ? 55 : 43, d.dark, 517, d.displayStyle, 1.03, -1);
    type(social, 'Application annotation', '01 / CLARITY THAT CREATES MOMENTUM', 'IBM Plex Mono', 10, d.dark, 517);

    const rationale = box(board, 'Direction rationale', 'VERTICAL', 1170, 20);
    const details = [['WHY IT FITS', d.logic], ['GRAPHIC LANGUAGE', d.graphic], ['PHOTOGRAPHY', d.photo], ['VOICE', d.voice], ['TRADE-OFF', d.trade]];
    details.forEach(([label, detail]) => {
      const row = box(rationale, label, 'HORIZONTAL', 1170, 24);
      type(row, `${label} label`, label, 'IBM Plex Mono', 11, muted, 190, 'Regular', 1.5);
      type(row, `${label} detail`, detail, 'Manrope', 17, ink, 956, 'Regular', 1.45);
    });
    rule(board, 1170, '#DADCD5');
    type(board, 'Status note', 'Exploratory identity: wordmark, colours and graphic language are proposals for review.', 'Manrope', 13, muted, 1170);
    board.placeholder = false;
  });

  const decision = box(root, 'Decision criteria', 'VERTICAL', 3816, 14);
  type(decision, 'Review focus', 'CHOOSE THE BRAND CHARACTER FIRST', 'IBM Plex Mono', 14, muted, 3816);
  type(decision, 'Review guidance', 'Judge each route by the impression it creates: trusted adviser, ambitious creative partner, or precise systems thinker.', 'Manrope', 27, ink, 3816, 'Regular', 1.3, -0.5);
  type(decision, 'Recommended route', 'Recommendation: 02 / Clear Momentum — a common identity for strategy, marketing and technology. Refine its wordmark, symbol and applications before extending it into the website.', 'Manrope', 24, ink, 3816, 'Regular', 1.4);
  root.placeholder = false;
  figma.viewport.scrollAndZoomIntoView([root]);
  const descendants = root.findAll(() => true);
  return {
    createdNodeIds: descendants.map(n => n.id), mutatedNodeIds: [root.id], rootId: root.id,
    boards: boardIds.map(id => { const n = descendants.find(v => v.id === id); return { id, name: n.name, width: n.width, height: n.height }; }),
    editableTextCount: descendants.filter(n => n.type === 'TEXT').length,
    imageFillCount: descendants.filter(n => 'fills' in n && Array.isArray(n.fills) && n.fills.some(p => p.type === 'IMAGE')).length,
    totalNodes: descendants.length,
  };
}
