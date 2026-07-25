export type ArtifactType = "software" | "product" | "identity" | "sound" | "image"

export type Discipline = "design" | "code" | "sound"

export interface Block {
  type: "prose" | "image" | "grid" | "video" | "game" | "spotify"
  content?: string
  src?: string
  alt?: string
  caption?: string
  images?: { src: string; alt: string; caption?: string }[]
  url?: string
  title?: string
  playlistId?: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  type: ArtifactType
  disciplines: Discipline[]
  role: string
  year: string
  client?: string
  link?: string
  tags: string[]
  cover: string
  shortDescription: string
  overview: string
  blocks: Block[]
  hidden?: boolean
}

export const projects: Project[] = [
  {
    slug: "ai-security-interfaces",
    title: "AI Security Interfaces",
    subtitle: "Current work",
    disciplines: ["design", "code"],
    hidden: true,
    type: "software",
    role: "Product Design Lead",
    year: "2023–present",
    client: "Microsoft",
    tags: ["AI", "Security", "Enterprise", "Product Design"],
    cover: "/assets/ai-security/cover.jpg",
    shortDescription: "Designing AI-powered security experiences for high-stakes enterprise workflows, from agentic investigation patterns to composable interfaces and human-in-the-loop systems.",
    overview: "As a Principal Product Design Manager at Microsoft, I shape how AI shows up inside security tools, where the stakes are high, the data is dense, and trust is everything. I focus on the hard parts: framing ambiguous problems, building a research foundation, and helping designers turn raw complexity into experiences security professionals can actually rely on. Alongside the product work, I created a framework for scaling AI into my team's day-to-day design practice.",
    blocks: [
      {
        type: "prose",
        content: "More detail coming soon.",
      },
    ],
  },
  {
    slug: "part-time-chiller",
    title: "Part Time Chiller",
    subtitle: "Visual beat tape",
    disciplines: ["sound"],
    type: "sound",
    role: "Artist / Producer / Designer",
    year: "2015–present",
    link: "https://parttimechiller.com",
    tags: ["Music", "DJ", "Production", "Sound", "Code"],
    cover: "/assets/identity/ptc_logo_black_900.png",
    shortDescription: "My solo alias as a DJ and music producer. Original productions rooted in downtempo, trip-hop, and house, plus DJ sets built around global soul, folk, and groove, including a monthly four-hour residency at the Mar Vista Farmers Market for over 15 years.",
    overview: "Part Time Chiller is my solo alias as a DJ and producer. On the production side, my music draws from downtempo, trip-hop, and house, built around feel and texture. As a DJ, I curate around global soul, folk, and positive groove energy. For over 15 years I have held a monthly four-hour residency at the Mar Vista Farmers Market, the kind of set where the music fits the morning but stays with you all day.",
    blocks: [
      {
        type: "video",
        url: "https://www.youtube.com/embed/Zv2sKFRcMis",
        title: "Part Time Chiller live",
      },
      {
        type: "prose",
        content: "Two playlists that map where my taste lives. Sunday Vibes is the one that started it all, built for slow mornings and focused afternoons. Track IDs is a deeper cut, the records I keep coming back to across years of digging.",
      },
      {
        type: "spotify",
        playlistId: "0iMNNrtl1m6B54PyGlygy2",
        title: "Sunday Vibes",
      },
      {
        type: "spotify",
        playlistId: "6MYB8Zxzbi2w6zZGIovB5S",
        title: "Track IDs",
      },
    ],
  },
  {
    slug: "sadubas",
    title: "SADUBAS",
    subtitle: "Audio-visual act",
    disciplines: ["sound"],
    type: "sound",
    role: "Co-founder / Producer / Live visuals",
    year: "2012–present",
    link: "https://sadubas.com",
    tags: ["Music", "Live", "Audio-Visual", "Sound"],
    cover: "/assets/identity/Sadubas-The_Ascent_cover_2000_trishul.png",
    shortDescription: "An audio-visual performance act I co-founded with a longtime collaborator. South Asian-influenced electronic music and live visuals, performed everywhere from the Academy Museum to LACMA and the Hammer.",
    overview: "SADUBAS is an audio-visual performance act I co-founded with my collaborator and longtime friend. Together we make South Asian-influenced electronic music and live visuals, sitting somewhere between house, ambient, and whatever comes next. We collaborate with musicians and filmmakers to expand the work beyond the two of us: live sets, beat tapes, short film scores, and visual installations. We have performed at the Academy Museum of Motion Pictures, LACMA, the Hammer Museum, the Bowers Museum, and the Wende Museum.",
    blocks: [
      {
        type: "video",
        url: "https://www.youtube.com/embed/K7yc3vkW1ZA",
        title: "SADUBAS live performance",
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/Sadubas-The_Ascent_cover_2000_trishul.png", alt: "SADUBAS: The Ascent" },
          { src: "/assets/identity/Railways_cover_202212.jpg", alt: "SADUBAS: Railways" },
        ],
      },
    ],
  },
  {
    slug: "employee-communications",
    title: "Employee Comms",
    subtitle: "AI enterprise product",
    disciplines: ["design", "code"],
    type: "software",
    role: "Product Design Lead",
    year: "2021",
    client: "Moveworks",
    tags: ["Product Design", "Enterprise", "AI"],
    cover: "/assets/employee-communications/mw_comms_dashboard_x1280@2x.jpg",
    shortDescription: "Led product design and research for a zero-to-one enterprise communications platform at Moveworks, helping teams replace low-signal corporate email with targeted, actionable communication.",
    overview: "From October 2020 to March 2021, I helped shape a crucial component of Moveworks' core platform by serving as the Product Design Lead for a pioneering corporate communications platform. This platform revolutionized internal corporate communication by empowering IT and HR stakeholders to send custom, actionable messages directly via Moveworks' AI enhanced chatbot, effectively replacing the clutter of traditional corporate emails.\n\nAs a true zero-to-one product, it required an extensive mix of user research, stakeholder interviews, data analysis, and intuitive design to shape and launch the MVP to our three lighthouse partners. More than just a designer, I acted as a product leader, onboarding over 20 customers and harnessing their feedback to continually refine the product.",
    blocks: [
      {
        type: "prose",
        content: "As a true zero-to-one product, it required an extensive mix of user research, stakeholder interviews, data analysis, and intuitive design to shape and launch the MVP to three lighthouse partners.",
      },
      {
        type: "image",
        src: "/assets/employee-communications/mw_comms_dashboard_x1280@2x.jpg",
        alt: "Moveworks employee communications dashboard",
        caption: "The communications dashboard, designed for HR and IT stakeholders to compose and target messages.",
      },
      {
        type: "prose",
        content: "I acted as a product leader beyond design: onboarding over 20 customers, synthesizing usage data and employee responses to drive iteration, and laying the groundwork for Moveworks' initial web design system.",
      },
    ],
  },
  {
    slug: "xlr8r",
    title: "XLR8R Magazine",
    subtitle: "Music culture and product systems",
    disciplines: ["design", "code"],
    type: "product",
    role: "Product Manager / Designer / Developer",
    year: "2015–2016",
    client: "XLR8R",
    link: "https://xlr8r.com",
    tags: ["Editorial", "Music", "Web Development"],
    cover: "/assets/xlr8r/xlr8r_v1_casestudybrowser-1-w1280@2x.jpg",
    shortDescription: "Led product and engineering for the relaunch of a 25-year electronic music publication, modernizing the platform, preserving the archive, and supporting a large global readership.",
    overview: "As the appointed Head of Product and Engineering at XLR8R.com, a revered music and culture magazine with over two decades of print and digital history, my task was to revive and redefine its digital landscape. I empowered writers with enhanced editorial capabilities while overhauling the platform to provide a sleek, responsive interface complete with popular daily free music downloads.",
    blocks: [
      {
        type: "image",
        src: "/assets/xlr8r/xlr8r_v1_casestudybrowser-1-w1280@2x.jpg",
        alt: "XLR8R v1 website redesign",
        caption: "Drawing inspiration from XLR8R's retired glossy print format, a minimal, responsive design.",
      },
      {
        type: "prose",
        content: "I skillfully navigated a complex migration from Drupal to WordPress, meticulously preserving a legacy of articles, photos, and digital media. Beyond a product revival, I established a robust ticketing platform connecting our global readership with the vibrant nightlife they craved.",
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/xlr8r/xlr8r_v1_ipad_browser-1280@2x.png",
            alt: "XLR8R on iPad",
          },
          {
            src: "/assets/xlr8r/xlr8r_v2_ipad-1280@2xNew.png",
            alt: "XLR8R v2 on iPad",
          },
        ],
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/xlr8r/xlr8r_v3_mobile.png",
            alt: "XLR8R mobile",
          },
          {
            src: "/assets/xlr8r/xlr8r_v1_stickers-w1280@2xNew.png",
            alt: "XLR8R brand stickers",
          },
        ],
      },
    ],
  },
  {
    slug: "chnl",
    title: "CHNL",
    subtitle: "Founder, zero-to-one product",
    disciplines: ["design", "code"],
    type: "software",
    role: "Co-founder / Product / Lead Designer",
    year: "2012–2015",
    client: "CHNL",
    tags: ["Product Design", "Startup", "Content"],
    cover: "/assets/chnl/chnl_casestudybrowser-home-w1280@2x.jpg",
    shortDescription: "Co-founded and designed a social content platform that turned noisy feeds into curated visual channels, growing to more than 400k registered users before pivoting and acquisition.",
    overview: "In an era of digital noise, CHNL emerged as a tool for personalized, meaningful content. We didn't just aggregate quality content into beautiful channels — we redefined how users interact with digital media. CHNL wasn't just about consumption; it was about active, community-driven curation. As co-founder, my leadership spanned both Product and Engineering, steering a diverse team toward a product that resonated profoundly.",
    blocks: [
      {
        type: "image",
        src: "/assets/chnl/chnl_casestudybrowser-home-w1280@2x.jpg",
        alt: "CHNL home view",
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/chnl/chnl_v2_laptop_blue2_w1280@2x.jpg",
            alt: "CHNL laptop view",
          },
          {
            src: "/assets/chnl/chnl_v2_mobile4_w1280@2x.jpg",
            alt: "CHNL mobile view",
          },
        ],
      },
      {
        type: "prose",
        content: "We discovered a unique niche, transforming CHNL into an in-house digital portfolio platform for ICM Partners. This pivot culminated in an acquisition by XLR8R.com, validating our approach to content curation and presentation.",
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/chnl/chnl_social_3channels_white_w1280@2x.jpg",
            alt: "CHNL social channels view",
          },
          {
            src: "/assets/chnl/CHNL_biz_cards_w1280@2x.jpg",
            alt: "CHNL business cards",
          },
        ],
      },
    ],
  },
  {
    slug: "space-rickshaw",
    title: "Space Rickshaw",
    subtitle: "Generative worldbuilding",
    disciplines: ["design", "code"],
    type: "software",
    role: "Artist / Designer",
    year: "2026",
    client: "Game",
    tags: ["Vibe coding"],
    cover: "/assets/space-rickshaw/cover.jpg",
    shortDescription: "A 30-minute video game sketch. A nostalgic homage to Space Taxi on the Commodore 64, rebuilt as a bajaj rickshaw odyssey across five Indian cities.",
    overview: "Space Taxi was one of my favorite games on my first computer, the Commodore 64. This is a 30-minute vibe-coded sketch built with Claude: same pixel energy, but you're flying a yellow bajaj auto-rickshaw across five Indian cities instead of a spaceship.",
    blocks: [
      {
        type: "game",
      },
    ],
  },
  {
    slug: "topspin",
    title: "Topspin",
    subtitle: "Music tech",
    disciplines: ["design", "code"],
    type: "software",
    role: "Lead UX Designer / Developer",
    year: "2011–2014",
    client: "Topspin Media (acquired by Beats by Dre)",
    tags: ["Product Design", "Music", "E-commerce"],
    cover: "/assets/topspin/topspin-c4m-mocks-1280@2x.jpg",
    shortDescription: "Product and UX work for direct-to-fan music tools, helping artists, labels, and teams sell, promote, and distribute music on their own terms.",
    overview: "In collaboration with the bright minds at Topspin Media, I served as the lead UX developer on a mission to create sustainable revenue streams for musicians and filmmakers. My role encompassed design, UX, and front-end development for three highly customizable, embeddable products.",
    blocks: [
      {
        type: "image",
        src: "/assets/topspin/topspin-c4m-mocks-1280@2x.jpg",
        alt: "Topspin C4M mock designs",
      },
      {
        type: "prose",
        content: "A Streaming Media Widget for high-quality audio, HD video, and Flickr image pools. A user-friendly e-commerce store embeddable with a single line of JavaScript. And the Email for Media Widget (E4M), which set the industry standard for fan acquisitions.",
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/topspin/topspin-c4m-wires-1280@2x.jpg",
            alt: "Topspin wireframes",
          },
          {
            src: "/assets/topspin/topspin_embedded_widgets_1280@2x.jpg",
            alt: "Topspin embedded widgets",
          },
        ],
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/topspin/topspin_purchase_flow2_1280@2x.jpg",
            alt: "Topspin purchase flow",
          },
          {
            src: "/assets/topspin/topspin_streaming_widgetsII_1280@2x.jpg",
            alt: "Topspin streaming widgets",
          },
        ],
      },
    ],
  },
  {
    slug: "product-plan",
    title: "ProductPlan",
    subtitle: "SaaS MVP",
    disciplines: ["design"],
    type: "software",
    role: "UX Designer",
    year: "2013",
    client: "ProductPlan",
    link: "https://www.productplan.com",
    tags: ["Product Design", "SaaS", "Roadmapping"],
    cover: "/assets/product-plan/productplan_cover_2000.jpg",
    shortDescription: "Helped shape the MVP experience and early identity for a roadmap product built to make product strategy easier to see, share, and align around.",
    overview: "ProductPlan, a leading pioneer in agile project management workflows, engaged me as a UX designer to spearhead the design and user experience of their MVP product. Tasked with creating an intuitive roadmap for CEOs, I skillfully transformed their feedback into a streamlined, impactful UI. My involvement wasn't limited to product design — I also crafted the brand's logo.",
    blocks: [
      {
        type: "image",
        src: "/assets/product-plan/productplan_cover_2000.jpg",
        alt: "ProductPlan cover",
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/product-plan/productplan_laptop_w1280@2x.jpg",
            alt: "ProductPlan on laptop",
          },
          {
            src: "/assets/product-plan/productplan_cinema_flat_w1280@2x.jpg",
            alt: "ProductPlan cinema display",
          },
        ],
      },
      {
        type: "grid",
        images: [
          {
            src: "/assets/product-plan/productplan_wires_plan_w1280@2x.jpg",
            alt: "ProductPlan wireframes, roadmap view",
          },
          {
            src: "/assets/product-plan/productplan_wires_w1280@2x.jpg",
            alt: "ProductPlan wireframes, overview",
          },
        ],
      },
    ],
  },
  {
    slug: "identity",
    title: "Marks, Posters, Systems",
    subtitle: "Visual identity",
    disciplines: ["design"],
    type: "identity",
    role: "Designer",
    year: "2008–present",
    client: "Various",
    tags: ["Branding", "Identity", "Print"],
    cover: "/assets/identity/Sadubas-The_Ascent_cover_2000_trishul.png",
    shortDescription: "Logos, posters, shirts, covers, and visual systems for products, music projects, friends, experiments, and finely made things.",
    overview: "A curated collection of identity and branding across multiple clients and creative ventures, from startup logos to film posters to music artwork.",
    blocks: [
      {
        type: "grid",
        images: [
          { src: "/assets/identity/Sadubas-The_Ascent_cover_2000_trishul.png", alt: "Sadubas: The Ascent cover" },
          { src: "/assets/identity/Sadubas_bizcard.png", alt: "Sadubas business card" },
        ],
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/XLR8R_biz_cards.png", alt: "XLR8R business cards" },
          { src: "/assets/identity/bizcard-CHNL_2.jpg", alt: "CHNL business card" },
        ],
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/bizcard-PTC.jpg", alt: "Part Time Chiller business card" },
          { src: "/assets/identity/bizcard-RR.jpg", alt: "Red Rickshaw business card" },
        ],
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/Railways_cover_202212.jpg", alt: "Railways album cover" },
          { src: "/assets/identity/TablaCentricHammerPRINT_Final_1200.png", alt: "Tabla Centric art show poster" },
        ],
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/20weeks_LAFF_CreditBlock.jpg", alt: "20 Weeks film poster" },
          { src: "/assets/identity/dandekar_300dpi.jpg", alt: "Raspberry Magic film poster" },
        ],
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/mw_og_logo.png", alt: "Moveworks original logo" },
          { src: "/assets/identity/sadubas_logo.png", alt: "Sadubas logo" },
        ],
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/ptc_logo_black_900.png", alt: "Part Time Chiller logo" },
          { src: "/assets/identity/wethersight_logo.png", alt: "Weathersight logo" },
        ],
      },
      {
        type: "grid",
        images: [
          { src: "/assets/identity/mw_original_tshirt.png", alt: "Moveworks original t-shirt" },
          { src: "/assets/identity/mw_yolo_maze_desktop_Round_3000x2250_zoom.png", alt: "Moveworks YOLO maze" },
        ],
      },
    ],
  },
]

export const visibleProjects = projects.filter((p) => !p.hidden)

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}
