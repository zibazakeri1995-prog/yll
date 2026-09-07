import type { Platform, PlatformId, MediaFormat } from '../types';

export const PLATFORMS: Platform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    slug: 'youtube',
    icon: 'youtube',
    color: '#FF0000',
    supportedFormats: ['mp4', 'mp3', 'm4a', 'webm'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata', 'playlist', 'subtitles'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/.+/,
    ],
    description: 'Download videos and audio from YouTube in various qualities up to 4K.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    slug: 'tiktok',
    icon: 'tiktok',
    color: '#000000',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@.+/i,
    ],
    description: 'Download TikTok videos without watermark in HD quality.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    slug: 'instagram',
    icon: 'instagram',
    color: '#E4405F',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/.+/i,
    ],
    description: 'Download Instagram posts, reels, and IGTV videos.',
  },
  {
    id: 'instagram_reels',
    name: 'Instagram Reels',
    slug: 'instagram-reels',
    icon: 'instagram',
    color: '#E4405F',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/reel\/.+/i,
    ],
    description: 'Download Instagram Reels in high quality.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    slug: 'facebook',
    icon: 'facebook',
    color: '#1877F2',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\/.+/i,
    ],
    description: 'Download Facebook videos and posts.',
  },
  {
    id: 'facebook_reels',
    name: 'Facebook Reels',
    slug: 'facebook-reels',
    icon: 'facebook',
    color: '#1877F2',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/reel\/.+/i,
    ],
    description: 'Download Facebook Reels in HD quality.',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    slug: 'x',
    icon: 'x',
    color: '#000000',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/.+/i,
    ],
    description: 'Download videos from X (formerly Twitter).',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    slug: 'twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?twitter\.com\/.+/i,
    ],
    description: 'Download videos from Twitter.',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    slug: 'reddit',
    icon: 'reddit',
    color: '#FF4500',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?reddit\.com\/.+/i,
    ],
    description: 'Download Reddit videos and GIFs.',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    slug: 'pinterest',
    icon: 'pinterest',
    color: '#E60023',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?pinterest\.com\/.+/i,
    ],
    description: 'Download Pinterest videos and pins.',
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    slug: 'vimeo',
    icon: 'vimeo',
    color: '#00ADEF',
    supportedFormats: ['mp4', 'mp3', 'webm'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/.+/i,
    ],
    description: 'Download Vimeo videos in various qualities.',
  },
  {
    id: 'dailymotion',
    name: 'Dailymotion',
    slug: 'dailymotion',
    icon: 'dailymotion',
    color: '#0A0A0A',
    supportedFormats: ['mp4', 'mp3'],
    supportedFeatures: ['video', 'audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?dailymotion\.com\/.+/i,
    ],
    description: 'Download Dailymotion videos.',
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    slug: 'soundcloud',
    icon: 'soundcloud',
    color: '#FF5500',
    supportedFormats: ['mp3', 'm4a', 'wav'],
    supportedFeatures: ['audio', 'thumbnail', 'metadata'],
    status: 'active',
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/.+/i,
    ],
    description: 'Download audio tracks from SoundCloud.',
  },
];

export const getPlatformById = (id: PlatformId): Platform | undefined => {
  return PLATFORMS.find((p) => p.id === id);
};

export const getPlatformBySlug = (slug: string): Platform | undefined => {
  return PLATFORMS.find((p) => p.slug === slug);
};

export const getPlatformByUrl = (url: string): Platform | undefined => {
  for (const platform of PLATFORMS) {
    for (const pattern of platform.urlPatterns) {
      if (pattern.test(url)) {
        return platform;
      }
    }
  }
  return undefined;
};

export const getActivePlatforms = (): Platform[] => {
  return PLATFORMS.filter((p) => p.status === 'active');
};

export const getSupportedFormats = (): MediaFormat[] => {
  const formats = new Set<MediaFormat>();
  PLATFORMS.forEach((p) => {
    p.supportedFormats.forEach((f) => formats.add(f));
  });
  return Array.from(formats);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
};
