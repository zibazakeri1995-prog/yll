// English translations
export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    reset: 'Reset',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    copy: 'Copy',
    copied: 'Copied!',
    download: 'Download',
    downloads: 'Downloads',
    upload: 'Upload',
    paste: 'Paste',
    clear: 'Clear',
    analyze: 'Analyze',
    convert: 'Convert',
    processing: 'Processing...',
    completed: 'Completed',
    failed: 'Failed',
    retry: 'Retry',
    tryAgain: 'Try Again',
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewAll: 'View All',
    showMore: 'Show More',
    showLess: 'Show Less',
  },

  // Navigation
  nav: {
    home: 'Home',
    download: 'Download',
    tools: 'Tools',
    supportedSites: 'Supported Sites',
    blog: 'Blog',
    faq: 'FAQ',
    about: 'About',
    contact: 'Contact',
    admin: 'Admin',
    dashboard: 'Dashboard',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
  },

  // Homepage
  home: {
    hero: {
      title: 'Download Videos & Audio From Your Favorite Platforms',
      subtitle: 'Fast, free, and unlimited media downloader. Support for YouTube, TikTok, Instagram, Facebook, Twitter, and many more.',
      placeholder: 'Paste video URL here...',
      pasteButton: 'Paste',
      analyzeButton: 'Analyze',
      exampleUrl: 'Example: https://www.youtube.com/watch?v=...',
    },
    features: {
      title: 'Why Choose Our Downloader?',
      subtitle: 'The best universal media downloader with professional features',
      items: [
        {
          title: 'Multi-Platform Support',
          description: 'Download from YouTube, TikTok, Instagram, Facebook, Twitter, Reddit, and 10+ more platforms.',
        },
        {
          title: 'High Quality Downloads',
          description: 'Get videos in up to 4K resolution and audio in lossless quality.',
        },
        {
          title: 'Fast & Free',
          description: 'Unlimited downloads with no registration required. Completely free forever.',
        },
        {
          title: 'Multiple Formats',
          description: 'Choose from MP4, MP3, M4A, WebM, and more formats to suit your needs.',
        },
        {
          title: 'Secure & Private',
          description: 'No data storage. Your downloads are processed securely and privately.',
        },
        {
          title: 'Cross-Platform',
          description: 'Works on desktop, tablet, and mobile devices. No software installation needed.',
        },
      ],
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Download any video in 3 simple steps',
      steps: [
        {
          number: '1',
          title: 'Paste URL',
          description: 'Copy the video URL from your favorite platform and paste it in the input box.',
        },
        {
          number: '2',
          title: 'Choose Format',
          description: 'Select your preferred format (MP4, MP3, etc.) and quality.',
        },
        {
          number: '3',
          title: 'Download',
          description: 'Click download and get your file instantly. Save it anywhere you want.',
        },
      ],
    },
  },

  // Download
  download: {
    title: 'Universal Media Downloader',
    subtitle: 'Download videos and audio from any supported platform',
    urlLabel: 'Video URL',
    urlPlaceholder: 'Paste the video URL here...',
    analyzing: 'Analyzing...',
    analysisFailed: 'Failed to analyze URL',
    invalidUrl: 'Please enter a valid URL',
    unsupportedPlatform: 'This platform is not supported',
    preview: {
      title: 'Media Preview',
      duration: 'Duration',
      author: 'Author',
      views: 'Views',
      uploadDate: 'Upload Date',
    },
    formats: {
      video: 'Video Formats',
      audio: 'Audio Formats',
      quality: 'Quality',
      format: 'Format',
      size: 'Size',
      download: 'Download',
      preparing: 'Preparing...',
    },
    job: {
      title: 'Download Progress',
      jobId: 'Job ID',
      status: 'Status',
      progress: 'Progress',
      speed: 'Speed',
      eta: 'Estimated Time',
      cancel: 'Cancel Download',
      completed: 'Download Ready!',
      downloadFile: 'Download File',
      failed: 'Download Failed',
      cancelled: 'Download Cancelled',
    },
  },

  // Platforms
  platforms: {
    title: 'Supported Platforms',
    subtitle: 'We support downloading from all major platforms',
    searchPlaceholder: 'Search platforms...',
    active: 'Active',
    limited: 'Limited',
    maintenance: 'Maintenance',
    disabled: 'Disabled',
    features: 'Features',
    formats: 'Supported Formats',
  },

  // Tools
  tools: {
    title: 'Media Tools',
    subtitle: 'Professional media conversion tools',
    videoToMp3: {
      title: 'Video to MP3 Converter',
      description: 'Extract audio from any video and convert to MP3 format.',
    },
    videoToMp4: {
      title: 'Video to MP4 Converter',
      description: 'Convert any video to MP4 format with optimal quality.',
    },
    audioConverter: {
      title: 'Audio Converter',
      description: 'Convert between MP3, M4A, WAV, OGG, and more.',
    },
    videoConverter: {
      title: 'Video Converter',
      description: 'Convert videos between MP4, WebM, AVI, and other formats.',
    },
    selectFile: 'Select File',
    orDragDrop: 'or drag and drop',
    chooseFormat: 'Choose Format',
    chooseQuality: 'Choose Quality',
    startConversion: 'Start Conversion',
    converting: 'Converting...',
    conversionComplete: 'Conversion Complete!',
  },

  // FAQ
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions',
    searchPlaceholder: 'Search questions...',
    categories: {
      general: 'General',
      downloads: 'Downloads',
      formats: 'Formats',
      troubleshooting: 'Troubleshooting',
      privacy: 'Privacy',
      platforms: 'Supported Platforms',
    },
  },

  // Blog
  blog: {
    title: 'Blog',
    subtitle: 'Latest news, tutorials, and updates',
    readMore: 'Read More',
    publishedOn: 'Published on',
    by: 'By',
    categories: 'Categories',
    relatedPosts: 'Related Posts',
    searchPlaceholder: 'Search articles...',
  },

  // Admin
  admin: {
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back!',
      overview: 'Overview',
      totalUsers: 'Total Users',
      anonymousUsers: 'Anonymous Users',
      downloadsToday: 'Downloads Today',
      downloadsMonth: 'Downloads This Month',
      successfulDownloads: 'Successful Downloads',
      failedDownloads: 'Failed Downloads',
      activeJobs: 'Active Jobs',
      queuedJobs: 'Queued Jobs',
      trafficToday: 'Traffic Today',
      trafficMonth: 'Traffic This Month',
      adRevenue: 'Estimated Ad Revenue',
      adImpressions: 'Ad Impressions',
      adClicks: 'Ad Clicks',
      ctr: 'CTR',
    },
    sidebar: {
      dashboard: 'Dashboard',
      downloads: 'Downloads',
      jobs: 'Jobs',
      users: 'Users',
      platforms: 'Platforms',
      ads: 'Advertisements',
      analytics: 'Analytics',
      seo: 'SEO',
      google: 'Google',
      content: 'Content',
      api: 'API',
      system: 'System',
      security: 'Security',
      logs: 'Logs',
    },
  },

  // SEO
  seo: {
    home: {
      title: 'Universal Media Downloader - Download Videos & Audio',
      description: 'Free online video and audio downloader. Support for YouTube, TikTok, Instagram, Facebook, Twitter, Reddit, and more. Fast, secure, and unlimited downloads.',
    },
  },

  // Errors
  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    notFound: 'Page not found.',
    unauthorized: 'You are not authorized to view this page.',
    forbidden: 'Access denied.',
    serverError: 'Server error. Please try again later.',
    rateLimit: 'Too many requests. Please wait a moment.',
    timeout: 'Request timed out. Please try again.',
  },
};

export type TranslationType = typeof en;
