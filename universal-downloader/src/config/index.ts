import type { PlatformId, MediaFormat, MediaQuality } from '../types';

export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'Universal Media Downloader',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  useMockApi: import.meta.env.VITE_USE_MOCK_API !== 'false',
  ga4Id: import.meta.env.VITE_GA4_ID,
  gtmId: import.meta.env.VITE_GTM_ID,
  googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION,
  bingSiteVerification: import.meta.env.VITE_BING_SITE_VERIFICATION,
};

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Download', href: '/download' },
    { label: 'Tools', href: '/tools' },
    { label: 'Supported Sites', href: '/supported-sites' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ],
  tools: [
    { label: 'Video to MP3', href: '/tools/video-to-mp3' },
    { label: 'Video to MP4', href: '/tools/video-to-mp4' },
    { label: 'Audio Converter', href: '/tools/audio-converter' },
    { label: 'Video Converter', href: '/tools/video-converter' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'DMCA', href: '/dmca' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Acceptable Use', href: '/acceptable-use' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Downloads', href: '/admin/downloads' },
    { label: 'Jobs', href: '/admin/jobs' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Platforms', href: '/admin/platforms' },
    { label: 'Advertisements', href: '/admin/ads' },
    { label: 'Analytics', href: '/admin/analytics' },
    { label: 'SEO', href: '/admin/seo' },
    { label: 'Google', href: '/admin/google/analytics' },
    { label: 'Content', href: '/admin/content/blog' },
    { label: 'API', href: '/admin/api' },
    { label: 'System', href: '/admin/system' },
    { label: 'Logs', href: '/admin/logs' },
  ],
};

export const QUALITY_OPTIONS: { quality: MediaQuality; label: string; bitrate?: number }[] = [
  { quality: '1080p', label: '1080p Full HD', bitrate: 5000 },
  { quality: '720p', label: '720p HD', bitrate: 2500 },
  { quality: '480p', label: '480p SD', bitrate: 1000 },
  { quality: '360p', label: '360p', bitrate: 600 },
  { quality: '240p', label: '240p', bitrate: 300 },
  { quality: '144p', label: '144p', bitrate: 150 },
  { quality: 'audio', label: 'Audio Only', bitrate: 192 },
];

export const FORMAT_OPTIONS: { format: MediaFormat; label: string; type: 'video' | 'audio' }[] = [
  { format: 'mp4', label: 'MP4', type: 'video' },
  { format: 'webm', label: 'WebM', type: 'video' },
  { format: 'mp3', label: 'MP3', type: 'audio' },
  { format: 'm4a', label: 'M4A', type: 'audio' },
  { format: 'wav', label: 'WAV', type: 'audio' },
  { format: 'ogg', label: 'OGG', type: 'audio' },
];

export const DOWNLOAD_STATUS_LABELS: Record<string, string> = {
  queued: 'Queued',
  analyzing: 'Analyzing',
  processing: 'Processing',
  downloading: 'Downloading',
  converting: 'Converting',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

export const PLATFORM_SLUGS: PlatformId[] = [
  'youtube',
  'tiktok',
  'instagram',
  'instagram_reels',
  'facebook',
  'facebook_reels',
  'x',
  'twitter',
  'reddit',
  'pinterest',
  'vimeo',
  'dailymotion',
  'soundcloud',
];

export const BLOG_CATEGORIES = [
  'Tutorials',
  'Updates',
  'Tips & Tricks',
  'Platform News',
  'Features',
];

export const FAQ_CATEGORIES = [
  'General',
  'Downloads',
  'Formats',
  'Troubleshooting',
  'Privacy',
  'Supported Platforms',
];
