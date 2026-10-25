export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    id: "brand-presence",
    eyebrow: "01 / POSITIONING",
    title: "Brand identity\n& design",
    shortcut: "Brand identity & design",
    description: "Give your business a clear identity, a recognisable visual language and a consistent way to show up.",
    intent: "Build an identity that expresses who you are and carries through every customer touchpoint.",
    inclusions: ["Brand positioning and messaging", "Logo, colour and typography systems", "Brand guidelines and campaign design", "Personal branding for founders and leaders"],
    outcome: "A distinctive, consistent brand that people can recognise and understand.",
  },
  {
    id: "social-media-management",
    eyebrow: "02 / SOCIAL",
    title: "Social media\nmanagement",
    shortcut: "Social media management",
    description: "Keep your brand active, relevant and connected through planned content and day-to-day community management.",
    intent: "Turn your social channels into a consistent brand experience, with clear goals and an engaged community.",
    inclusions: ["Channel strategy and content calendars", "Social content, captions and scheduling", "Community engagement and inbox management", "Social listening and performance reporting"],
    outcome: "A well-managed social presence that builds relationships and supports your business goals.",
  },
  {
    id: "growth-marketing",
    eyebrow: "03 / DIGITAL MARKETING",
    title: "Digital\nmarketing",
    shortcut: "Digital marketing",
    description: "Bring the right audience to your business through search, paid media and campaigns built around conversion.",
    intent: "Connect your channels, content and customer journey to a clear marketing objective.",
    inclusions: ["Search engine optimisation and content strategy", "Paid search and social advertising", "Lead generation and conversion optimisation", "Campaign tracking, testing and reporting"],
    outcome: "A connected digital marketing programme with clear priorities and useful measurement.",
  },
  {
    id: "digital-systems",
    eyebrow: "04 / DEVELOPMENT",
    title: "Web & app\ndevelopment",
    shortcut: "Web & app development",
    description: "Create websites, applications and connected systems that make it easier for customers to work with you.",
    intent: "Build digital experiences that balance your business needs with the people who use them.",
    inclusions: ["Website strategy, UX and interface design", "Responsive websites and e-commerce", "Web and mobile application development", "CRM integrations, testing and ongoing support"],
    outcome: "A useful, reliable digital experience that supports your next stage of growth.",
  },
  {
    id: "consultancy",
    eyebrow: "05 / STRATEGY",
    title: "Strategy &\nconsultancy",
    shortcut: "Strategy & consultancy",
    description: "Find the priorities, positioning and practical next steps that give your business a clearer direction.",
    intent: "Bring structure to your marketing decisions before committing time, budget and resources.",
    inclusions: ["Business, brand and marketing audits", "Audience, competitor and market research", "Positioning and go-to-market planning", "Marketing roadmaps and implementation guidance"],
    outcome: "A focused plan that connects your business goals to the work that needs to happen.",
  },
  {
    id: "billboard-placement",
    eyebrow: "06 / OUTDOOR",
    title: "Billboard\nplacement",
    shortcut: "Billboard placement",
    description: "Take your message into the places your audience moves through, with considered outdoor advertising.",
    intent: "Plan an outdoor presence around your audience, campaign message and location needs.",
    inclusions: ["Outdoor campaign planning and site selection", "Billboard artwork and format adaptation", "Media booking and placement coordination", "Installation checks and campaign reporting"],
    outcome: "An outdoor campaign with the right message, locations and delivery plan.",
  },
  {
    id: "photography",
    eyebrow: "07 / PHOTOGRAPHY",
    title: "Photography",
    shortcut: "Photography",
    description: "Create a cohesive image library for your brand, products, people and campaigns.",
    intent: "Make your business easier to see and understand through photography with a clear purpose.",
    inclusions: ["Creative direction and shoot planning", "Brand, product and corporate photography", "Portraits, locations and campaign imagery", "Image selection, retouching and delivery"],
    outcome: "A versatile collection of images ready for your website, campaigns and social channels.",
  },
  {
    id: "tv-radio-advertising",
    eyebrow: "08 / BROADCAST",
    title: "TV & radio\nadvertising",
    shortcut: "TV & radio advertising",
    description: "Bring your campaign to screen and air with clear creative, coordinated production and media placement.",
    intent: "Shape a broadcast message that fits your audience, campaign objective and chosen channels.",
    inclusions: ["Advertising concepts and scriptwriting", "Video, voice-over and audio production", "TV and radio media planning and booking", "Broadcast coordination and delivery reporting"],
    outcome: "A broadcast campaign with a consistent message and a coordinated path to air.",
  },
  {
    id: "documentaries",
    eyebrow: "09 / STORYTELLING",
    title: "Documentary\nproduction",
    shortcut: "Documentaries",
    description: "Tell the story behind your organisation, its people and its impact through considered documentary filmmaking.",
    intent: "Turn a complex story or important milestone into a film people can follow and connect with.",
    inclusions: ["Story research, treatment and scripting", "Interview planning and location production", "Filming, sound recording and supporting footage", "Editing, colour, sound and final delivery"],
    outcome: "A coherent documentary that gives your story context, depth and a lasting record.",
  },
  {
    id: "printing-services",
    eyebrow: "10 / PRINT",
    title: "Printing\nservices",
    shortcut: "Printing services",
    description: "Carry your identity into physical materials with consistent design, print production and finishing.",
    intent: "Make your printed materials feel like a natural extension of your brand.",
    inclusions: ["Print design, artwork preparation and proofing", "Business stationery and marketing collateral", "Brochures, banners and branded materials", "Material selection, finishing and production checks"],
    outcome: "Well-produced print materials that present your business consistently.",
  },
  {
    id: "event-coverage",
    eyebrow: "11 / EVENTS",
    title: "Event\ncoverage",
    shortcut: "Event coverage",
    description: "Capture the people, moments and ideas that matter, then turn them into content that works beyond the event.",
    intent: "Plan coverage around the story you want to tell, not just the moments on the day.",
    inclusions: ["Coverage planning and shot lists", "Event photography and videography", "On-site interviews and social-ready content", "Highlight films and edited photo galleries"],
    outcome: "A useful record of your event and a library of content ready to share.",
  },
] as const;

// Feature brand, social and digital marketing prominently on the homepage.
// The complete catalogue remains visible in the service directory beneath them.
export const featuredServices = services.filter((service) =>
  ["brand-presence", "social-media-management", "growth-marketing"].includes(service.id)
);

export const phases = [
  {
    number: "01", title: "Strategy",
    description: "Understand the business, define the opportunity and choose a clear direction.",
    outcome: "OUTPUT / YOUR GROWTH PLAN",
    headline: "Start with\nthe right questions.",
    detail: "We get clear on your business, audience and growth objective before choosing the work.",
    deliverables: ["Business and market understanding", "Positioning and priority setting", "A focused growth roadmap"],
  },
  {
    number: "02", title: "Systems",
    description: "Build the digital foundations and workflows that make the plan possible.",
    outcome: "OUTPUT / CONNECTED FOUNDATIONS",
    headline: "Build the foundations\nfor the plan.",
    detail: "We design the tools, journeys and ways of working that make coordinated delivery possible.",
    deliverables: ["Digital customer journeys", "Websites, CRM and workflows", "Measurement and reporting foundations"],
  },
  {
    number: "03", title: "Execution",
    description: "Put the plan to work, measure what matters and improve with intent.",
    outcome: "OUTPUT / MEASURABLE PROGRESS",
    headline: "Make progress.\nThen make it better.",
    detail: "We put the plan into action with clear responsibilities, useful measurement and regular learning.",
    deliverables: ["Campaign and project delivery", "Performance reviews", "Ongoing optimisation"],
  },
] as const;

export const beliefs = [
  { title: "Clarity before activity.", description: "A shared direction makes the next decision easier. We define the objective, audience and priorities before recommending action." },
  { title: "Systems support scale.", description: "Campaigns perform better when the foundations work together. We connect the tools, journeys and workflows that support growth." },
  { title: "Discipline creates progress.", description: "Consistent execution, useful measurement and a willingness to improve keep the plan connected to the business." },
] as const;

export const approachQuestions = [
  { question: "Can we start with one service?", answer: "Yes. We can start with one focused service or project. We’ll first understand the business objective, then agree the scope and how it connects to your wider growth plans." },
  { question: "Do we need a full brief before we speak?", answer: "No. Bring the context you have: where the business is today, where you want to go and what feels difficult. The first conversation helps us clarify the opportunity together." },
  { question: "How do you define success?", answer: "We agree the objectives and measures with you before the work begins. Success is progress against those business goals, supported by useful reporting and regular reviews." },
] as const;

export const contactQuestions = [
  { question: "What does the first conversation involve?", answer: "We’ll discuss your business, your goals and the challenge you’re trying to solve. It’s a chance to understand each other and decide whether there’s a useful next step." },
  { question: "Can you help us define the scope?", answer: "Yes. You don’t need a finished brief. We can help identify the priorities, define the right scope and outline a practical way forward." },
  { question: "Can we discuss a single project?", answer: "Absolutely. We work on focused projects as well as connected programmes. Tell us what you need to move forward and we’ll explore the right approach." },
] as const;
