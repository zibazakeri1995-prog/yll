import type {
  MediaAnalysis,
  DownloadJob,
  DownloadRequest,
  Platform,
  ApiResponse,
  ApiError,
} from '../../types';

/**
 * Core Downloader API Interface
 * This is the contract that both Mock and Real APIs must implement.
 * UI components should ONLY use this interface.
 */
export interface DownloaderApi {
  analyzeMedia(url: string): Promise<ApiResponse<MediaAnalysis>>;
  createDownloadJob(request: DownloadRequest): Promise<ApiResponse<DownloadJob>>;
  getDownloadJob(id: string): Promise<ApiResponse<DownloadJob>>;
  cancelDownloadJob(id: string): Promise<ApiResponse<void>>;
  getSupportedPlatforms(): Promise<ApiResponse<Platform[]>>;
  getHealth(): Promise<ApiResponse<{ status: string; version: string }>>;
  getConfig(): Promise<ApiResponse<{ maxDownloadSize: number; rateLimit: number }>>;
}

/**
 * Base API client for handling common HTTP operations
 */
class BaseApiClient {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: errorData.message || `HTTP Error: ${response.status}`,
          } as ApiError,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        } as ApiError,
      };
    }
  }

  protected async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

/**
 * Real API Implementation
 * Connects to actual backend endpoints
 */
export class RealDownloaderApi extends BaseApiClient implements DownloaderApi {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async analyzeMedia(url: string): Promise<ApiResponse<MediaAnalysis>> {
    return this.post<MediaAnalysis>('/api/analyze', { url });
  }

  async createDownloadJob(request: DownloadRequest): Promise<ApiResponse<DownloadJob>> {
    return this.post<DownloadJob>('/api/download', request);
  }

  async getDownloadJob(id: string): Promise<ApiResponse<DownloadJob>> {
    return this.get<DownloadJob>(`/api/jobs/${id}`);
  }

  async cancelDownloadJob(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/jobs/${id}`);
  }

  async getSupportedPlatforms(): Promise<ApiResponse<Platform[]>> {
    return this.get<Platform[]>('/api/platforms');
  }

  async getHealth(): Promise<ApiResponse<{ status: string; version: string }>> {
    return this.get('/api/health');
  }

  async getConfig(): Promise<ApiResponse<{ maxDownloadSize: number; rateLimit: number }>> {
    return this.get('/api/config');
  }
}

/**
 * API Factory
 * Returns the appropriate API implementation based on environment
 */
export function createDownloaderApi(): DownloaderApi {
  const useMockApi = import.meta.env.VITE_USE_MOCK_API !== 'false';
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

  if (useMockApi || !baseUrl) {
    // Lazy import to avoid circular dependencies
    const { MockDownloaderApi } = require('./mockApi');
    return new MockDownloaderApi();
  }

  return new RealDownloaderApi(baseUrl);
}

// Singleton instance
let apiInstance: DownloaderApi | null = null;

export function getDownloaderApi(): DownloaderApi {
  if (!apiInstance) {
    apiInstance = createDownloaderApi();
  }
  return apiInstance;
}
