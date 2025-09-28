// API service for YouTube download functionality
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1/youtube';

export interface VideoInfo {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  uploader: string;
  view_count: number;
  formats: VideoFormat[];
}

export interface VideoFormat {
  format_id: string;
  ext: string;
  resolution: string;
  filesize: number;
  vcodec: string;
  acodec: string;
}

export interface DownloadResponse {
  success: boolean;
  message?: string;
  blob?: Blob;
}

export interface ApiError {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string[];
}

class YouTubeApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message.join(', '));
    }

    return response.json();
  }

  private async makeDownloadRequest(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<Blob> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message.join(', '));
    }

    return response.blob();
  }

  async getVideoInfo(url: string): Promise<VideoInfo> {
    const encodedUrl = encodeURIComponent(url);
    return this.makeRequest<VideoInfo>(`/info?url=${encodedUrl}`);
  }

  async downloadVideo(url: string, format: string = 'best[ext=mp4]/best'): Promise<Blob> {
    return this.makeDownloadRequest('/download', {
      url,
      format,
      quality: 'best',
      output: '%(title)s.%(ext)s'
    });
  }

  async downloadAudio(url: string): Promise<Blob> {
    return this.makeDownloadRequest('/download-audio', { url });
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.makeRequest<{ status: string; timestamp: string }>('/health');
  }

  // Utility function to validate YouTube URL
  isValidYouTubeUrl(url: string): boolean {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  }

  // Utility function to extract video ID from URL
  extractVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Utility function to trigger file download
  triggerDownload(blob: Blob, filename: string): void {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

export const youtubeApi = new YouTubeApiService();
