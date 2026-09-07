import {
  MediaAnalysis,
  DownloadJob,
  DownloadRequest,
  Platform,
  ApiResponse,
  DownloadJobStatus,
  MediaMetadata,
  MediaQualityOption,
  PlatformId,
} from '../../types';
import { PLATFORMS, getPlatformByUrl, formatDuration } from '../../config/platforms';
import { DownloaderApi } from './index';

/**
 * Mock API Implementation
 * Simulates backend behavior with realistic delays and data
 */
export class MockDownloaderApi implements DownloaderApi {
  private jobs: Map<string, DownloadJob> = new Map();
  private jobTimers: Map<string, NodeJS.Timeout> = new Map();

  // Simulate network delay
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Generate random ID
  private generateId(): string {
    return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Mock analyze media
  async analyzeMedia(url: string): Promise<ApiResponse<MediaAnalysis>> {
    await this.delay(800 + Math.random() * 700); // 800-1500ms delay

    // Validate URL
    if (!url || !url.trim()) {
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'Please enter a valid URL',
        },
      };
    }

    const trimmedUrl = url.trim();

    // Detect platform
    const platform = getPlatformByUrl(trimmedUrl);

    if (!platform) {
      return {
        success: false,
        error: {
          code: 'UNSUPPORTED_PLATFORM',
          message: 'This platform is not supported. Please check our supported sites.',
        },
      };
    }

    // Generate mock metadata based on platform
    const mockMetadata = this.generateMockMetadata(platform.id, trimmedUrl);

    // Generate available formats
    const formats = this.generateMockFormats(platform, mockMetadata.duration);

    const analysis: MediaAnalysis = {
      url: trimmedUrl,
      platform: platform.id,
      metadata: mockMetadata,
      formats,
      isLive: false,
      isPlaylist: false,
    };

    return {
      success: true,
      data: analysis,
    };
  }

  // Create download job
  async createDownloadJob(request: DownloadRequest): Promise<ApiResponse<DownloadJob>> {
    await this.delay(300 + Math.random() * 400); // 300-700ms delay

    const jobId = this.generateId();
    const now = new Date().toISOString();

    // Analyze the URL first to get metadata
    const analysisResult = await this.analyzeMedia(request.url);

    if (!analysisResult.success || !analysisResult.data) {
      return {
        success: false,
        error: analysisResult.error,
      };
    }

    const job: DownloadJob = {
      id: jobId,
      url: request.url,
      platform: analysisResult.data.platform,
      status: 'queued',
      progress: 0,
      selectedFormat: request.format,
      selectedQuality: request.quality,
      metadata: analysisResult.data.metadata,
      createdAt: now,
      updatedAt: now,
    };

    this.jobs.set(jobId, job);

    // Start simulating the download process
    this.simulateDownloadProgress(jobId);

    return {
      success: true,
      data: job,
    };
  }

  // Get download job status
  async getDownloadJob(id: string): Promise<ApiResponse<DownloadJob>> {
    await this.delay(100 + Math.random() * 200);

    const job = this.jobs.get(id);

    if (!job) {
      return {
        success: false,
        error: {
          code: 'JOB_NOT_FOUND',
          message: 'Download job not found',
        },
      };
    }

    return {
      success: true,
      data: { ...job },
    };
  }

  // Cancel download job
  async cancelDownloadJob(id: string): Promise<ApiResponse<void>> {
    const job = this.jobs.get(id);

    if (!job) {
      return {
        success: false,
        error: {
          code: 'JOB_NOT_FOUND',
          message: 'Download job not found',
        },
      };
    }

    // Clear timer
    const timer = this.jobTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.jobTimers.delete(id);
    }

    job.status = 'cancelled';
    job.progress = 0;
    job.updatedAt = new Date().toISOString();

    return {
      success: true,
      data: undefined,
    };
  }

  // Get supported platforms
  async getSupportedPlatforms(): Promise<ApiResponse<Platform[]>> {
    await this.delay(200);
    return {
      success: true,
      data: PLATFORMS.filter((p) => p.status === 'active'),
    };
  }

  // Get health status
  async getHealth(): Promise<ApiResponse<{ status: string; version: string }>> {
    await this.delay(100);
    return {
      success: true,
      data: {
        status: 'healthy',
        version: '1.0.0-mock',
      },
    };
  }

  // Get config
  async getConfig(): Promise<ApiResponse<{ maxDownloadSize: number; rateLimit: number }>> {
    await this.delay(100);
    return {
      success: true,
      data: {
        maxDownloadSize: 2 * 1024 * 1024 * 1024, // 2GB
        rateLimit: 100, // 100 requests per hour
      },
    };
  }

  // Generate mock metadata
  private generateMockMetadata(platform: PlatformId, url: string): MediaMetadata {
    const titles: Record<PlatformId, string[]> = {
      youtube: ['Amazing Tutorial - Learn in 10 Minutes', 'Epic Moments Compilation 2024', 'Music Video - Official'],
      tiktok: ['Viral Dance Challenge', 'Funny Cat Video 😂', 'Life Hack You Need!'],
      instagram: ['Travel Vlog - Paradise Found', 'Cooking Recipe - Easy & Delicious', 'Workout Routine'],
      instagram_reels: ['Quick Makeup Tutorial', 'Pet Funny Moments', 'DIY Home Decor'],
      facebook: ['Community Event Highlights', 'Product Review 2024', 'Family Memories'],
      facebook_reels: ['Quick Recipe Idea', 'Funny Prank', 'Motivational Quote'],
      x: ['Breaking News Update', 'Tech Announcement', 'Trending Topic Discussion'],
      twitter: ['Viral Tweet Thread', 'Live Event Coverage', 'Celebrity Update'],
      reddit: ['AMA Highlights', 'Epic Fail Compilation', 'Wholesome Moment'],
      pinterest: ['DIY Craft Ideas', 'Home Design Inspiration', 'Fashion Trends 2024'],
      vimeo: ['Short Film - Award Winner', 'Documentary Preview', 'Art Portfolio'],
      dailymotion: ['News Segment', 'Sports Highlights', 'Entertainment Show'],
      soundcloud: ['Original Mix 2024', 'Podcast Episode #42', 'Acoustic Session'],
    };

    const authors: Record<PlatformId, string[]> = {
      youtube: ['TechChannel', 'MusicOfficial', 'VloggerPro'],
      tiktok: ['@creator123', '@viralstar', '@funnymoments'],
      instagram: ['@traveler', '@chef_life', '@fitness_guru'],
      instagram_reels: ['@beauty_tips', '@petlovers', '@diy_home'],
      facebook: ['Community Page', 'Brand Official', 'Local News'],
      facebook_reels: ['Food Network', 'Comedy Central', 'Motivation Daily'],
      x: ['NewsOutlet', 'TechCompany', 'Influencer'],
      twitter: ['Journalist', 'Brand', 'Celebrity'],
      reddit: ['u/redditor123', 'u/awesome_user', 'u/helpful_person'],
      pinterest: ['DIY Queen', 'Design Pro', 'Fashion Blogger'],
      vimeo: ['Indie Filmmaker', 'Documentary Maker', 'Artist Studio'],
      dailymotion: ['TV Channel', 'Sports Network', 'Entertainment TV'],
      soundcloud: ['DJ Producer', 'Podcast Host', 'Indie Artist'],
    };

    const titleList = titles[platform];
    const authorList = authors[platform];

    return {
      title: titleList[Math.floor(Math.random() * titleList.length)],
      author: authorList[Math.floor(Math.random() * authorList.length)],
      thumbnail: `https://picsum.photos/seed/${encodeURIComponent(url)}/640/360`,
      duration: Math.floor(60 + Math.random() * 600), // 1-11 minutes
      uploadDate: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      viewCount: Math.floor(Math.random() * 1000000),
      description: 'This is a sample description for the media content.',
    };
  }

  // Generate mock formats
  private generateMockFormats(platform: Platform, duration: number): MediaQualityOption[] {
    const formats: MediaQualityOption[] = [];

    // Video formats if supported
    if (platform.supportedFormats.includes('mp4')) {
      const qualities: Array<{ q: '1080p' | '720p' | '480p' | '360p'; bitrate: number }> = [
        { q: '1080p', bitrate: 5000 },
        { q: '720p', bitrate: 2500 },
        { q: '480p', bitrate: 1000 },
        { q: '360p', bitrate: 600 },
      ];

      qualities.forEach(({ q, bitrate }) => {
        // Estimate file size: bitrate (kbps) * duration (s) / 8 = KB
        const filesize = Math.floor((bitrate * duration * 1000) / 8);
        formats.push({
          quality: q,
          format: 'mp4',
          type: 'video',
          filesize,
          bitrate,
          codec: 'H.264',
        });
      });
    }

    // Audio formats if supported
    if (platform.supportedFormats.includes('mp3')) {
      const audioBitrate = 192;
      const filesize = Math.floor((audioBitrate * duration * 1000) / 8);
      formats.push({
        quality: 'audio',
        format: 'mp3',
        type: 'audio',
        filesize,
        bitrate: audioBitrate,
        codec: 'MP3',
      });
    }

    if (platform.supportedFormats.includes('m4a')) {
      const audioBitrate = 256;
      const filesize = Math.floor((audioBitrate * duration * 1000) / 8);
      formats.push({
        quality: 'audio',
        format: 'm4a',
        type: 'audio',
        filesize,
        bitrate: audioBitrate,
        codec: 'AAC',
      });
    }

    return formats;
  }

  // Simulate download progress
  private simulateDownloadProgress(jobId: string): void {
    const stages: DownloadJobStatus[] = ['queued', 'analyzing', 'processing', 'downloading', 'converting', 'completed'];
    let currentStage = 0;
    let progress = 0;

    const updateStage = () => {
      const job = this.jobs.get(jobId);
      if (!job || job.status === 'cancelled') {
        return;
      }

      // Move to next stage
      if (currentStage < stages.length - 1 && progress >= 100) {
        currentStage++;
        progress = 0;
      }

      if (currentStage >= stages.length - 1) {
        // Completed
        job.status = 'completed';
        job.progress = 100;
        job.completedAt = new Date().toISOString();
        job.downloadUrl = `/api/download/${jobId}`;
        job.filename = `${job.metadata.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${job.selectedFormat}`;
        job.filesize = Math.floor(5 * 1024 * 1024 + Math.random() * 20 * 1024 * 1024); // 5-25 MB
        job.updatedAt = new Date().toISOString();
        this.jobTimers.delete(jobId);
        return;
      }

      // Update status and progress
      job.status = stages[currentStage];
      progress += Math.floor(5 + Math.random() * 15);
      if (progress > 100) progress = 100;
      job.progress = progress;
      job.speed = Math.floor(500000 + Math.random() * 2000000); // 500KB/s - 2.5MB/s
      job.estimatedTimeRemaining = Math.floor((100 - progress) * 10); // Rough estimate
      job.updatedAt = new Date().toISOString();

      // Schedule next update
      const timer = setTimeout(updateStage, 500 + Math.random() * 1000);
      this.jobTimers.set(jobId, timer);
    };

    // Start the simulation
    updateStage();
  }
}
