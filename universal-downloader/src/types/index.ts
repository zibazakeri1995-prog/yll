// Platform types
export type PlatformId = 
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'instagram_reels'
  | 'facebook'
  | 'facebook_reels'
  | 'x'
  | 'twitter'
  | 'reddit'
  | 'pinterest'
  | 'vimeo'
  | 'dailymotion'
  | 'soundcloud';

export type PlatformStatus = 'active' | 'limited' | 'maintenance' | 'disabled';

export interface Platform {
  id: PlatformId;
  name: string;
  slug: string;
  icon: string;
  color: string;
  supportedFormats: MediaFormat[];
  supportedFeatures: PlatformFeature[];
  status: PlatformStatus;
  urlPatterns: RegExp[];
  description: string;
}

export type PlatformFeature = 
  | 'video'
  | 'audio'
  | 'thumbnail'
  | 'metadata'
  | 'playlist'
  | 'subtitles';

// Media types
export type MediaFormat = 'mp4' | 'mp3' | 'm4a' | 'webm' | 'wav' | 'ogg';
export type MediaQuality = '1080p' | '720p' | '480p' | '360p' | '240p' | '144p' | 'audio';
export type MediaType = 'video' | 'audio';

export interface MediaQualityOption {
  quality: MediaQuality;
  format: MediaFormat;
  type: MediaType;
  filesize?: number; // in bytes
  bitrate?: number; // in kbps
  codec?: string;
}

export interface MediaMetadata {
  title: string;
  author: string;
  thumbnail: string;
  duration: number; // in seconds
  uploadDate?: string;
  viewCount?: number;
  description?: string;
}

export interface MediaAnalysis {
  url: string;
  platform: PlatformId;
  metadata: MediaMetadata;
  formats: MediaQualityOption[];
  isLive?: boolean;
  isPlaylist?: boolean;
  playlistCount?: number;
}

// Download job types
export type DownloadJobStatus = 
  | 'queued'
  | 'analyzing'
  | 'processing'
  | 'downloading'
  | 'converting'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface DownloadJob {
  id: string;
  url: string;
  platform: PlatformId;
  status: DownloadJobStatus;
  progress: number; // 0-100
  selectedFormat: MediaFormat;
  selectedQuality: MediaQuality;
  metadata: MediaMetadata;
  downloadUrl?: string;
  filename?: string;
  filesize?: number;
  speed?: number; // bytes per second
  estimatedTimeRemaining?: number; // in seconds
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  error?: string;
}

export interface DownloadRequest {
  url: string;
  format: MediaFormat;
  quality: MediaQuality;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

// User types
export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLoginAt?: string;
  downloadCount: number;
}

export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

// Advertisement types
export type AdSlot = 
  | 'header'
  | 'hero'
  | 'result'
  | 'download'
  | 'between_content'
  | 'sidebar'
  | 'footer'
  | 'mobile_sticky'
  | 'native';

export type AdProvider = 'adsense' | 'admanager' | 'direct' | 'other';
export type AdType = 'banner' | 'rectangle' | 'skyscraper' | 'native' | 'video';

export interface Advertisement {
  id: string;
  name: string;
  slot: AdSlot;
  provider: AdProvider;
  adType: AdType;
  status: 'active' | 'paused' | 'expired';
  desktopEnabled: boolean;
  mobileEnabled: boolean;
  countries?: string[];
  devices?: string[];
  frequency?: number;
  startDate: string;
  endDate?: string;
  priority: number;
  impressions: number;
  clicks: number;
  revenue: number;
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  properties: Record<string, unknown>;
}

export interface TrafficData {
  date: string;
  visitors: number;
  pageviews: number;
  sessions: number;
  bounceRate: number;
}

export interface DownloadAnalytics {
  date: string;
  totalDownloads: number;
  successfulDownloads: number;
  failedDownloads: number;
  byPlatform: Record<PlatformId, number>;
  byFormat: Record<MediaFormat, number>;
  byCountry: Record<string, number>;
  byDevice: Record<string, number>;
}

// SEO types
export interface SeoPage {
  path: string;
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogImage?: string;
  keywords?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  views: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Admin types
export interface AdminMetric {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface SearchConsoleData {
  property: string;
  lastSync: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries: Array<{ query: string; clicks: number; impressions: number }>;
  topPages: Array<{ page: string; clicks: number; impressions: number }>;
  byCountry: Record<string, { clicks: number; impressions: number }>;
  byDevice: Record<string, { clicks: number; impressions: number }>;
}

export interface SitemapData {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

// Config types
export interface AppConfig {
  siteName: string;
  siteUrl: string;
  apiBaseUrl: string;
  useMockApi: boolean;
  ga4Id?: string;
  gtmId?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  supportedPlatforms: PlatformId[];
  maxDownloadSize: number;
  rateLimit: number;
}
