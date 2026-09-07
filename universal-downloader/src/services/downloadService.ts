import { getDownloaderApi } from './api';

const api = getDownloaderApi();

export const downloadService = {
  analyzeMedia: (url: string) => api.analyzeMedia(url),
  createDownloadJob: (request: { url: string; format: string; quality: string }) => 
    api.createDownloadJob(request as { url: string; format: 'mp4' | 'mp3' | 'm4a' | 'webm'; quality: '1080p' | '720p' | '480p' | '360p' | '240p' | '144p' | 'audio' }),
  getDownloadJob: (id: string) => api.getDownloadJob(id),
  cancelDownloadJob: (id: string) => api.cancelDownloadJob(id),
  getSupportedPlatforms: () => api.getSupportedPlatforms(),
  getHealth: () => api.getHealth(),
  getConfig: () => api.getConfig(),
};

export default downloadService;
