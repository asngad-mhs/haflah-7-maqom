// services/quranApi.ts

/**
 * @file service for fetching Quran data from a public API.
 * This service provides functions to get verse details including Arabic text,
 * translations, and audio files. It also implements an in-memory cache
 * to optimize performance and reduce network requests.
 */

// --- TYPES ---

export interface VerseTranslation {
  id: number;
  resource_id: number;
  text: string;
}

export interface VerseAudio {
  url: string;
  duration: number;
  segments: [number, number, number][];
}

export interface VerseDetails {
  id: number;
  verse_key: string;
  text_uthmani: string;
  translations: VerseTranslation[];
  audio: VerseAudio;
}

// --- CACHING ---

/**
 * In-memory cache to store fetched verse data.
 * The key is a string in the format "surah:ayah" (e.g., "1:1").
 * This prevents re-fetching data that has already been requested in the session.
 */
const verseCache = new Map<string, VerseDetails>();

// --- CONFIGURATION ---

const API_BASE_URL = 'https://api.quran.com/api/v4';
const DEFAULT_LANGUAGE = 'id';
const DEFAULT_TRANSLATION_ID = 33; // Kemenag Indonesian Translation
const DEFAULT_RECITER_ID = 7; // Mishary Rashid Alafasy (verse-by-verse)

// --- API FUNCTIONS ---

/**
 * Fetches the details for a specific Quran verse.
 *
 * This function retrieves the Arabic text (Uthmani script), a specified
 * Indonesian translation, and an audio file URL for the given verse.
 * It utilizes an in-memory cache to avoid redundant API calls.
 *
 * @param surahNumber The number of the Surah (e.g., 1 for Al-Fatihah).
 * @param ayahNumber The number of the Ayah.
 * @returns A Promise that resolves to a VerseDetails object, or null if an error occurs.
 */
export const getVerseDetails = async (
  surahNumber: number,
  ayahNumber: number
): Promise<VerseDetails | null> => {
  const verseKey = `${surahNumber}:${ayahNumber}`;
  
  // 1. Check cache first
  if (verseCache.has(verseKey)) {
    console.log(`[Cache] HIT for verse ${verseKey}`);
    return verseCache.get(verseKey)!;
  }
  
  console.log(`[API] FETCH for verse ${verseKey}`);

  // 2. Construct the API URL with desired parameters
  const params = new URLSearchParams({
    language: DEFAULT_LANGUAGE,
    fields: 'text_uthmani', // We only need the arabic text field
    translations: DEFAULT_TRANSLATION_ID.toString(),
    audio: DEFAULT_RECITER_ID.toString(),
  });
  
  const url = `${API_BASE_URL}/verses/by_key/${verseKey}?${params.toString()}`;

  try {
    // 3. Fetch data from the API
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const verseDetails: VerseDetails = data.verse;

    // 4. Store the fetched data in the cache
    verseCache.set(verseKey, verseDetails);
    
    return verseDetails;
    
  } catch (error) {
    console.error(`Error fetching details for verse ${verseKey}:`, error);
    return null;
  }
};
