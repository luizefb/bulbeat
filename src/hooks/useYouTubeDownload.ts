import { useState, useCallback } from 'react';
import { youtubeApi, VideoInfo } from '@/lib/api';

export interface DownloadState {
  isDownloading: boolean;
  progress: number;
  videoInfo: VideoInfo | null;
  error: string | null;
  downloadType: 'video' | 'audio';
}

export const useYouTubeDownload = () => {
  const [state, setState] = useState<DownloadState>({
    isDownloading: false,
    progress: 0,
    videoInfo: null,
    error: null,
    downloadType: 'video',
  });

  const setDownloadType = useCallback((type: 'video' | 'audio') => {
    setState(prev => ({ ...prev, downloadType: type }));
  }, []);

  const getVideoInfo = useCallback(async (url: string) => {
    try {
      setState(prev => ({ ...prev, error: null }));
      
      if (!youtubeApi.isValidYouTubeUrl(url)) {
        throw new Error('URL do YouTube inválida');
      }

      const videoInfo = await youtubeApi.getVideoInfo(url);
      setState(prev => ({ ...prev, videoInfo }));
      return videoInfo;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao obter informações do vídeo';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, []);

  const downloadVideo = useCallback(async (url: string) => {
    try {
      setState(prev => ({ 
        ...prev, 
        isDownloading: true, 
        progress: 0, 
        error: null 
      }));

      if (!youtubeApi.isValidYouTubeUrl(url)) {
        throw new Error('URL do YouTube inválida');
      }

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 15, 90)
        }));
      }, 500);

      const blob = await youtubeApi.downloadVideo(url);
      
      clearInterval(progressInterval);
      setState(prev => ({ ...prev, progress: 100 }));

      // Generate filename
      const videoId = youtubeApi.extractVideoId(url);
      const filename = `video_${videoId || 'download'}.mp4`;
      
      // Trigger download
      youtubeApi.triggerDownload(blob, filename);

      return { success: true, filename };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no download do vídeo';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    } finally {
      setTimeout(() => {
        setState(prev => ({ 
          ...prev, 
          isDownloading: false, 
          progress: 0 
        }));
      }, 1000);
    }
  }, []);

  const downloadAudio = useCallback(async (url: string) => {
    try {
      setState(prev => ({ 
        ...prev, 
        isDownloading: true, 
        progress: 0, 
        error: null 
      }));

      if (!youtubeApi.isValidYouTubeUrl(url)) {
        throw new Error('URL do YouTube inválida');
      }

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 15, 90)
        }));
      }, 500);

      const blob = await youtubeApi.downloadAudio(url);
      
      clearInterval(progressInterval);
      setState(prev => ({ ...prev, progress: 100 }));

      // Generate filename
      const videoId = youtubeApi.extractVideoId(url);
      const filename = `audio_${videoId || 'download'}.m4a`;
      
      // Trigger download
      youtubeApi.triggerDownload(blob, filename);

      return { success: true, filename };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no download do áudio';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    } finally {
      setTimeout(() => {
        setState(prev => ({ 
          ...prev, 
          isDownloading: false, 
          progress: 0 
        }));
      }, 1000);
    }
  }, []);

  const download = useCallback(async (url: string) => {
    if (state.downloadType === 'video') {
      return downloadVideo(url);
    } else {
      return downloadAudio(url);
    }
  }, [state.downloadType, downloadVideo, downloadAudio]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      isDownloading: false,
      progress: 0,
      videoInfo: null,
      error: null,
      downloadType: 'video',
    });
  }, []);

  return {
    ...state,
    getVideoInfo,
    downloadVideo,
    downloadAudio,
    download,
    setDownloadType,
    clearError,
    reset,
  };
};
