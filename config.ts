// ============================================================================
// JOUDCON SITE CONFIGURATION
// ============================================================================
// Premium Event Management Company - Saudi Arabia
// ============================================================================

// Brand Colors Reference:
// Primary Navy: #4A5D7E
// Accent Gold: #F9B233
// Background: #001B44 to #0A1128 gradient
// Gray: #A0A0A0
// White: #FFFFFF

// ----------------------------------------------------------------------------
// Navigation
// ----------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  logoImage: string;
  navLinks: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "Joudcon",
  logoImage: "/images/JOUD logo and color-01 (1).png",
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Clients", href: "#clients" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText: "Get in Touch",
};

// ----------------------------------------------------------------------------
// Hero Section
// ----------------------------------------------------------------------------

export interface HeroConfig {
  title: string;
  subtitleAr: string;
  subtitleEn: string;
  tagline: string;
  ctaText: string;
  ctaHref: string;
  backgroundVideo: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  title: "Joudcon",
  subtitleAr: "لتنظيم المعارض والمؤتمرات",
  subtitleEn: "Organizing Conferences and Exhibitions",
  tagline: "Giving your event that snazzy edge.",
  ctaText: "Explore Our Vision",
  ctaHref: "#about",
  backgroundVideo: "/images/WhatsApp Video 2025-03-20 at 11.05.32 AM.mp4",
  backgroundImage: "/images/WhatsApp Image 2024-10-13 at 18.01.51.jpeg",
};

// ----------------------------------------------------------------------------
// About Section - Scrollytelling Timeline
// ----------------------------------------------------------------------------

export interface TimelineNode {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface AboutConfig {
  sectionLabel: string;
  heading: string;
  headingAccent: string;
  description: string;
  timeline: TimelineNode[];
}

export const aboutConfig: AboutConfig = {
  sectionLabel: "Our Journey",
  heading: "About",
  headingAccent: "Joudcon",
  description: "Since 2010, we've been transforming visions into extraordinary experiences across Saudi Arabia.",
  timeline: [
    {
      year: "March 2010",
      title: "Established in Dammam",
      description: "Building a reputation for delivering events with creativity and ingenuity. Our journey began with a vision to redefine event management in the Eastern Province.",
      image: "/images/WhatsApp Image 2025-05-07 at 12.56.24_85c69bdd.jpg",
    },
    {
      year: "2023",
      title: "Expansion & Growth",
      description: "Opened our new corporate headquarters in Al Mazruiyah, Dammam, to better serve our growing corporate clientele and expand our service capabilities.",
      image: "/images/download (10).jpg",
    },
    {
      year: "2026",
      title: "State-of-the-Art Workshop",
      description: "Launched our own in-house fabrication workshop to seamlessly design and build custom exhibits, bringing creative visions to life with precision and excellence.",
      image: "/images/WhatsApp Image 2024-10-13 at 18.01.52.jpeg",
    },
  ],
};

// ----------------------------------------------------------------------------
// Services Section - 3D Expandable Cards
// ----------------------------------------------------------------------------

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image: string;
  icon: string;
}

export interface ServicesConfig {
  sectionLabel: string;
  heading: string;
  headingAccent: string;
  description: string;
  services: Service[];
}

export const servicesConfig: ServicesConfig = {
  sectionLabel: "What We Do",
  heading: "Our",
  headingAccent: "Services",
  description: "From concept to execution, we deliver comprehensive event solutions tailored to your vision.",
  services: [
    {
      id: "conferences",
      title: "Organizing Conferences & Exhibitions",
      shortDescription: "Strategic conference approaches and world-class exhibition management",
      fullDescription: "We actively provide strategic conference approaches, establishing communication protocols between planning committees, subcontractors, and program staff. Our expert team creates world-class exhibitions for sites across the world, ensuring every detail is meticulously planned and executed.",
      features: [
        "Strategic planning & coordination",
        "Venue selection & management",
        "Exhibition booth design",
        "On-site logistics coordination",
        "Post-event analysis & reporting",
      ],
      image: "/images/WhatsApp Image 2024-10-13 at 18.01.51.jpeg",
      icon: "Building2",
    },
    {
      id: "events",
      title: "Event Management & Creative Execution",
      shortDescription: "Full-service event accompaniment with top artists and advanced equipment",
      fullDescription: "We offer clients the full accompaniment of the event, providing top artists and advanced equipment. With our dedicated 2026 workshop, we seamlessly design and build custom, one-off exhibits on a commercial basis, ensuring your event stands out.",
      features: [
        "Creative concept development",
        "Stage & set design",
        "AV equipment & lighting",
        "Entertainment booking",
        "Custom fabrication & builds",
      ],
      image: "/images/WhatsApp Image 2024-10-13 at 18.01.52.jpeg",
      icon: "Sparkles",
    },
    {
      id: "logistics",
      title: "Premium Logistics & Support",
      shortDescription: "Efficient routing for supplies with comprehensive monitoring",
      fullDescription: "We develop the most efficient routing for supplies. We monitor all logistics including 5-star hotels, VIP cars, premium catering, and procurement of AV equipment and VIP gifts, ensuring a seamless experience for all attendees.",
      features: [
        "VIP transportation coordination",
        "5-star hotel bookings",
        "Premium catering services",
        "AV equipment procurement",
        "VIP gift curation",
      ],
      image: "/images/download (10).jpg",
      icon: "Truck",
    },
  ],
};

// ----------------------------------------------------------------------------
// Portfolio Section - Horizontal Scroll Gallery
// ----------------------------------------------------------------------------

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  date: string;
  description: string;
  images: string[];
  category: string;
}

export interface PortfolioConfig {
  sectionLabel: string;
  heading: string;
  headingAccent: string;
  description: string;
  items: PortfolioItem[];
}

export const portfolioConfig: PortfolioConfig = {
  sectionLabel: "Our Work",
  heading: "Featured",
  headingAccent: "Projects",
  description: "A showcase of our most impactful events and exhibitions.",
  items: [
    {
      id: "aramco-updc",
      title: "Aramco UPDC Fun Day",
      client: "Saudi Aramco",
      date: "January 2025",
      description: "Successful end-to-end corporate event execution for Aramco Planning and Project Department, featuring comprehensive venue design, advanced AV deployment, and branded environments at Half Moon Beach.",
      images: [
        "/images/WhatsApp Video 2025-03-20 at 11.05.32 AM.mp4",
      ],
      category: "Corporate Event",
    },
    {
      id: "aramco-ceremony",
      title: "Service Award Ceremony",
      client: "Saudi Aramco",
      date: "2024",
      description: "Elegant award ceremony celebrating 25 years of service excellence, featuring custom stage design, professional lighting, and seamless program coordination.",
      images: [
        "/images/WhatsApp Image 2024-10-13 at 18.01.51.jpeg",
      ],
      category: "Award Ceremony",
    },
    {
      id: "cultural-event",
      title: "Cultural Celebration",
      client: "Ministry of Culture",
      date: "2024",
      description: "Traditional Saudi cultural event featuring authentic Ardah performances, traditional hospitality, and immersive cultural experiences.",
      images: [
        "/images/WhatsApp Image 2025-05-07 at 12.56.24_85c69bdd.jpg",
      ],
      category: "Cultural Event",
    },
    {
      id: "college-fair",
      title: "Training & Development Fair",
      client: "King Faisal University",
      date: "2024",
      description: "Interactive college fair with innovative display designs, engaging activities, and comprehensive information booths.",
      images: [
        "/images/WhatsApp Image 2024-10-13 at 18.01.52.jpeg",
      ],
      category: "Educational Event",
    },
  ],
};

// ----------------------------------------------------------------------------
// Clients Section - Infinite Marquee
// ----------------------------------------------------------------------------

export interface Client {
  name: string;
  logo: string;
}

export interface ClientsConfig {
  sectionLabel: string;
  heading: string;
  headingAccent: string;
  description: string;
  clients: Client[];
}

export const clientsConfig: ClientsConfig = {
  sectionLabel: "Trusted By",
  heading: "Our",
  headingAccent: "Clients",
  description: "We're proud to partner with leading organizations across Saudi Arabia.",
  clients: [
    { name: "Saudi Aramco", logo: "" },
    { name: "Ministry of Finance", logo: "" },
    { name: "Sabic", logo: "" },
    { name: "Sadara", logo: "" },
    { name: "Etimad", logo: "" },
    { name: "King Faisal University", logo: "" },
    { name: "Scitech", logo: "" },
  ],
};

// ----------------------------------------------------------------------------
// Contact Section
// ----------------------------------------------------------------------------

export interface ContactConfig {
  sectionLabel: string;
  heading: string;
  headingAccent: string;
  description: string;
  address: string;
  email: string;
  website: string;
  formFields: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  submitButton: string;
}

export const contactConfig: ContactConfig = {
  sectionLabel: "Get in Touch",
  heading: "Contact",
  headingAccent: "Us",
  description: "Ready to create something extraordinary? Let's discuss your next event.",
  address: "King Faisal Ibn Abd Al Aziz, Al Mazruiyah, Dammam 32414, KSA",
  email: "info@joudcon.com",
  website: "www.joudcon.com",
  formFields: {
    name: "Your Name",
    email: "Email Address",
    phone: "Phone Number",
    message: "Tell us about your event...",
  },
  submitButton: "Send Message",
};

// ----------------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------------

export interface FooterConfig {
  logo: string;
  logoImage: string;
  tagline: string;
  description: string;
  quickLinks: string[];
  services: string[];
  socialLinks: {
    platform: string;
    href: string;
    label: string;
  }[];
  copyright: string;
}

export const footerConfig: FooterConfig = {
  logo: "Joudcon",
  logoImage: "/images/JOUD logo and color-01 (1).png",
  tagline: "Giving your event that snazzy edge.",
  description: "Premium event management services in Saudi Arabia. From concept to execution, we deliver excellence.",
  quickLinks: ["Home", "About", "Services", "Portfolio", "Contact"],
  services: ["Conferences", "Exhibitions", "Corporate Events", "Cultural Events", "Logistics"],
  socialLinks: [
    { platform: "linkedin", href: "#", label: "LinkedIn" },
    { platform: "instagram", href: "#", label: "Instagram" },
    { platform: "twitter", href: "#", label: "Twitter" },
  ],
  copyright: "© 2025 Joudcon. All rights reserved.",
};

// ----------------------------------------------------------------------------
// Site Metadata
// ----------------------------------------------------------------------------

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string[];
}

export const siteConfig: SiteConfig = {
  title: "Joudcon | Premium Event Management in Saudi Arabia",
  description: "Joudcon - Organizing Conferences and Exhibitions in Saudi Arabia. Premium event management services for corporate, cultural, and educational events.",
  language: "en",
  keywords: ["event management", "conferences", "exhibitions", "Saudi Arabia", "Dammam", "corporate events", "Joudcon"],
};

// ----------------------------------------------------------------------------
// Admin CMS Config
// ----------------------------------------------------------------------------

export interface AdminConfig {
  title: string;
  loginTitle: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  loginButton: string;
  dashboardTitle: string;
  sections: {
    portfolio: string;
    content: string;
    clients: string;
    inquiries: string;
  };
}

export const adminConfig: AdminConfig = {
  title: "Joudcon Admin",
  loginTitle: "Admin Login",
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  loginButton: "Sign In",
  dashboardTitle: "Dashboard",
  sections: {
    portfolio: "Portfolio Manager",
    content: "Content Editor",
    clients: "Client Logos",
    inquiries: "Inquiries",
  },
};
