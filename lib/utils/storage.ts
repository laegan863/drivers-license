/**
 * Local storage utility functions
 */

import type { ApplicationData } from '@/lib/types/application';

const STORAGE_KEYS = {
  APPLICATION_DATA: 'applicationData',
  APPLICATION_ID: 'applicationId',
} as const;

export const storageUtils = {
  /**
   * Get application data from localStorage
   */
  getApplicationData(): ApplicationData | null {
    if (typeof window === 'undefined') return null;

    const storedData = localStorage.getItem(STORAGE_KEYS.APPLICATION_DATA);
    const storedId = localStorage.getItem(STORAGE_KEYS.APPLICATION_ID);

    if (!storedData) return null;

    try {
      const data: ApplicationData = JSON.parse(storedData);
      if (storedId) {
        data.applicationId = parseInt(storedId, 10);
      }
      return data;
    } catch (error) {
      console.error('Failed to parse application data:', error);
      return null;
    }
  },

  /**
   * Save application data to localStorage
   */
  setApplicationData(data: ApplicationData): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(STORAGE_KEYS.APPLICATION_DATA, JSON.stringify(data));
    if (data.applicationId) {
      localStorage.setItem(STORAGE_KEYS.APPLICATION_ID, data.applicationId.toString());
    }
  },

  /**
   * Clear application data from localStorage
   */
  clearApplicationData(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(STORAGE_KEYS.APPLICATION_DATA);
    localStorage.removeItem(STORAGE_KEYS.APPLICATION_ID);
  },

  /**
   * Get application ID from localStorage
   */
  getApplicationId(): number | null {
    if (typeof window === 'undefined') return null;

    const storedId = localStorage.getItem(STORAGE_KEYS.APPLICATION_ID);
    return storedId ? parseInt(storedId, 10) : null;
  },
};
