/**
 * Writespace landing page content.
 *
 * This file is the single source of truth for website copy,
 * navigation, section data, mock content, FAQ answers, and
 * founder-supplied contact placeholders.
 *
 * Keep presentation and styling inside components.
 * Keep editable website content here.
 */

export type SiteNavigationLink = {
  label: string;
  href: string;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type PreviewTab = {
  id: "feed" | "article" | "write";
  label: string;
  caption: string;
  callouts: readonly string[];
};

export type DeveloperPoint = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type AudienceTab = {
  id: string;
  label: string;
  hint: string;
  icon: string;
  headline: string;
  description: string;
  samplePostTitle: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type SiteContent = {
  navigation: SiteNavigationLink[];

  hero: {
    badge: string;
    headline: {
      firstLine: string;
      secondLinePrefix: string;
      highlightedPhrase: string;
    };
    description: string;
    primaryAction: SiteNavigationLink;
    secondaryAction: SiteNavigationLink;
    reassurance: string;
  };

  problem: {
    heading: string;
    description: string;
    sources: readonly string[];
    destination: string;
  };

  idea: {
    heading: string;
    description: string;
    post: {
      badge: string;
      caption: string;
    };
    article: {
      badge: string;
      title: string;
      readTime: string;
      caption: string;
    };
    sharedActions: readonly string[];
    sharedCaption: string;
  };

  benefits: {
    heading: string;
    description: string;
    items: BenefitItem[];
  };

  preview: {
    heading: string;
    description: string;
    badge: string;
    tabs: PreviewTab[];
  };

  developers: {
    eyebrow: string;
    heading: string;
    description: string;
    pipeline: {
      title: string;
      stages: {
        id: string;
        label: string;
        description: string;
        color: "violet" | "amber" | "coral";
        statusText: string;
      }[];
    };
    points: DeveloperPoint[];
  };

  audience: {
    heading: string;
    topicsLabel: string;
    topics: readonly string[];
    tabs: AudienceTab[];
  };

  faq: {
    heading: string;
    description: string;
    questions: FAQItem[];
    closingText: string;
    contactLabel: string;
  };

  waitlist: {
    heading: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitLabel: string;
    loadingLabel: string;
    successMessage: string;
    errorMessage: string;
    topicLabel: string;
    topicPlaceholder: string;
    privacyNote: string;
  };

  footer: {
    brand: {
      tagline: string;
      description: string;
    };
    product: {
      heading: string;
      links: SiteNavigationLink[];
    };
    contact: {
      heading: string;
      description: string;
      email: string;
      linkedin: string;
      github: string;
      x: string;
      sayHelloLabel: string;
      sayHelloSubject: string;
    };
    legal: {
      heading: string;
      links: SiteNavigationLink[];
    };
    bottomBar: {
      copyrightLabel: string;
      madeBy: string;
      backToTop: string;
    };
  };

  mocks: {
    heroPost: {
      initials: string;
      author: string;
      metadata: string;
      text: string;
      reactions: number;
      comments: number;
    };
    heroArticle: {
      title: string;
      readTime: string;
      code: string;
    };
    notification: string;
  };
};

/**
 * Main website content.
 *
 * Contact information deliberately remains empty until the
 * founder supplies the real addresses and profile URLs.
 */
export const site = {
  navigation: [
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Preview",
      href: "#preview",
    },
    {
      label: "For developers",
      href: "#developers",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
  ],

  hero: {
    badge: "Early access, opening soon",

    headline: {
      firstLine: "Think out loud.",
      secondLinePrefix: "Then ",
      highlightedPhrase: "go deep.",
    },

    description:
      "A home for developers to share quick thoughts and long-form articles, and get real conversations back.",

    primaryAction: {
      label: "Get early access",
      href: "#waitlist",
    },

    secondaryAction: {
      label: "See how it works",
      href: "#preview",
    },

    reassurance: "One email when the doors open. No spam.",
  },

  problem: {
    heading: "Your best ideas deserve better than a notes app.",

    description:
      "Great ideas end up in notes apps, half-written gists, and posts that vanish in a day. Writespace gives them one place to live and be found.",

    sources: ["Notes app", "Half-written gist", "A post from last week"],

    destination: "One place to live and be found.",
  },

  idea: {
    heading: "One profile. Two ways to write.",

    description:
      "Share a quick thought as a Post. Go deep with an Article. Both live on your profile and get the same reactions, replies, and saves.",

    post: {
      badge: "Post",
      caption: "Up to 6,000 characters and 5 images",
    },

    article: {
      badge: "Article",
      title: "Why I rewrote our job queue worker",
      readTime: "8 min read",
      caption: "A title, a cover image, and a read time",
    },

    sharedActions: ["React", "Reply", "Save", "Share"],

    sharedCaption: "Same on both.",
  },

  benefits: {
    heading: "Everything you need to write, and be read.",

    description: "Write, connect, save, and share from one place.",

    items: [
      {
        id: "write",
        title: "Write",
        description:
          "Posts for quick thoughts, Articles for deep dives. Keep drafts private, schedule them, and publish when it’s ready.",
        icon: "file-pen-line",
      },
      {
        id: "connect",
        title: "Connect",
        description:
          "Conversations that stay readable. React in more than one way, reply in threads, and mention people to pull them in.",
        icon: "messages-square",
      },
      {
        id: "come-back",
        title: "Come back",
        description:
          "Save what matters. Notifications are grouped, so a busy post doesn’t bury you in pings.",
        icon: "bookmark",
      },
      {
        id: "share",
        title: "Share",
        description:
          "Add a cover image and your links look great wherever they’re shared.",
        icon: "share-2",
      },
    ],
  },

  preview: {
    heading: "A first look",

    description: "Early design previews. The real thing is on its way.",

    badge: "Early design preview",

    tabs: [
      {
        id: "feed",
        label: "Feed",
        caption: "The feed",
        callouts: ["Posts and Articles together", "Reactions at a glance"],
      },
      {
        id: "article",
        label: "Article",
        caption: "Reading an article",
        callouts: ["Reply in threads", "Save for later"],
      },
      {
        id: "write",
        label: "Write",
        caption: "Writing a post",
        callouts: ["Schedule for later", "Private drafts"],
      },
    ],
  },

  developers: {
    eyebrow: "FOR DEVELOPERS",

    heading: "Ship your writing like you ship code.",

    description: "Draft in private, schedule it, and publish when it’s ready.",

    pipeline: {
      title: "Why I rewrote our job queue worker",

      stages: [
        {
          id: "draft",
          label: "Draft",
          description: "Only you can see it",
          color: "violet",
          statusText: "Private",
        },
        {
          id: "scheduled",
          label: "Scheduled",
          description: "Tuesday, 9:00 AM",
          color: "amber",
          statusText: "Scheduled",
        },
        {
          id: "published",
          label: "Published",
          description: "Live, with reactions and replies",
          color: "coral",
          statusText: "Published",
        },
      ],
    },

    points: [
      {
        id: "sign-in",
        title: "Sign in with GitHub",
        description: "Or Google, with no new password to manage.",
        icon: "github",
      },
      {
        id: "private-drafts",
        title: "Private drafts",
        description: "Nobody sees a draft but you.",
        icon: "lock",
      },
      {
        id: "mentions",
        title: "Mentions and threads",
        description: "Pull the right person into a conversation.",
        icon: "at-sign",
      },
      {
        id: "sharing",
        title: "Links that preview well",
        description: "Your posts look good wherever they’re shared.",
        icon: "link-2",
      },
    ],
  },

  audience: {
    heading: "Made for people who write about tech.",

    topicsLabel: "Write about anything technical",

    topics: [
      "React",
      "Rust",
      "DevOps",
      "Databases",
      "Open source",
      "Career",
      "Testing",
      "Security",
      "Design systems",
      "Data",
    ],

    tabs: [
      {
        id: "developers",
        label: "Developers",
        hint: "Share what you're learning.",
        icon: "code",
        headline: "Turn what you learn into something others can use.",
        description:
          "Write up the bug you finally fixed, the pattern you keep reaching for, or the lesson from last week’s outage.",
        samplePostTitle: "Why I stopped reaching for global state",
      },
      {
        id: "maintainers",
        label: "Open-source maintainers",
        hint: "Share the story behind the code.",
        icon: "git-branch",
        headline: "Share the story behind the code.",
        description:
          "Announce a release, explain a design decision, and invite people into the discussion.",
        samplePostTitle: "v2.0 is out: what changed and why",
      },
      {
        id: "students",
        label: "Students",
        hint: "Build in public.",
        icon: "graduation-cap",
        headline: "Build in public. Get feedback early.",
        description:
          "Document what you’re learning, share your projects, and meet people a few steps ahead of you.",
        samplePostTitle: "30 days of learning Rust: week 1",
      },
      {
        id: "communities",
        label: "Communities",
        hint: "Bring your community's knowledge together.",
        icon: "users",
        headline: "A shared home for what your members know.",
        description:
          "Give your community a place to write, react, and keep conversations going.",
        samplePostTitle: "Meetup recap: what we learned about testing",
      },
    ],
  },

  faq: {
    heading: "Frequently asked questions",

    description: "A few things you might be wondering about.",

    questions: [
      {
        id: "what-is-writespace",
        question: "What is Writespace?",
        answer:
          "A place for developers and technical writers to share quick Posts and long-form Articles, and to talk about them.",
      },
      {
        id: "post-vs-article",
        question: "What’s the difference between a Post and an Article?",
        answer:
          "A Post is a quick thought, up to 6,000 characters with up to 5 images. An Article is long-form, with a title, a cover image, and a read time.",
      },
      {
        id: "private-writing",
        question: "Can I keep my writing private until it’s ready?",
        answer:
          "Yes. Save it as a draft and only you can see it. You can also schedule it to go live later.",
      },
      {
        id: "interactions",
        question: "How do people interact with what I write?",
        answer:
          "They can react in several ways, reply in threads, mention others, save your work, and share it.",
      },
      {
        id: "notifications",
        question: "Will I be notified about replies and reactions?",
        answer:
          "Yes. Notifications are grouped so a busy post doesn’t flood you, and they can also arrive by email.",
      },
      {
        id: "sign-in",
        question: "How do I sign in?",
        answer: "With Google, GitHub, or an email code.",
      },
      {
        id: "pricing",
        question: "Is it free?",
        answer: "Yes, this is completely free.",
      },
      {
        id: "opening",
        question: "When does it open?",
        answer:
          "Soon. Join the waitlist and you’ll hear first. Mobile apps are planned too.",
      },
    ],

    closingText: "Still curious?",

    contactLabel: "Say hello.",
  },

  waitlist: {
    heading: "Your next idea deserves a home.",

    description: "Join the waitlist and be first in when the doors open.",

    emailLabel: "Email address",

    emailPlaceholder: "you@example.com",

    submitLabel: "Join the waitlist",

    loadingLabel: "Joining...",

    successMessage: "You’re on the list. We’ll email you when the doors open.",

    errorMessage: "That email doesn’t look right. Check it and try again.",

    topicLabel: "What would you write first?",

    topicPlaceholder: "Tell us what you'd like to write about...",

    privacyNote: "We’ll only use your email to tell you when Writespace opens.",
  },

  footer: {
    brand: {
      tagline: "Where your words find their readers.",

      description:
        "Writespace is a social blogging platform for developers and technical communities. Share quick Posts and long-form Articles, and get real conversations back.",
    },

    product: {
      heading: "Product",

      links: [
        { label: "Features", href: "#features" },
        { label: "Preview", href: "#preview" },
        { label: "For developers", href: "#developers" },
        { label: "Who it’s for", href: "#audience" },
        { label: "FAQ", href: "#faq" },
        { label: "Join the waitlist", href: "#waitlist" },
      ],
    },

    contact: {
      heading: "Get in touch",

      description:
        "Questions, feedback, or ideas for Writespace? I read every message.",

      // Founder: fill these values with the real public contact details.
      // Never invent or publish placeholder contact addresses.
      email: "mdafzal14777@gmail.com",
      linkedin: "https://www.linkedin.com/in/0x4f5a4c/",
      github: "https://github.com/afzal14786",
      x: "https://x.com/codewithafzal_",

      sayHelloLabel: "Say hello",

      sayHelloSubject: "Hello from the Writespace landing page",
    },

    legal: {
      heading: "Legal",

      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Contact", href: "#contact" },
      ],
    },

    bottomBar: {
      copyrightLabel: "Writespace.",
      madeBy: "Md Afzal",
      backToTop: "Back to top",
    },
  },

  mocks: {
    heroPost: {
      initials: "AK",
      author: "Aisha K.",
      metadata: "Post · 2 min ago",
      text: "A small idea can lead to a much better system.",
      reactions: 24,
      comments: 6,
    },

    heroArticle: {
      title: "Why I rewrote our job queue worker",
      readTime: "8 min read",
      code: "await queue.process(job);",
    },

    notification: "Meenal replied to your post",
  },
} satisfies SiteContent;
