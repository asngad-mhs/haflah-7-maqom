import { Maqam, EventSchedule } from './types';

export const MAQAMS: Maqam[] = [
  {
    id: 'bayati',
    name: 'Bayati',
    arabicName: 'بياتي',
    description: 'Maqam dasar yang paling populer. Memiliki nuansa syahdu, lembut, dan sering digunakan sebagai pembuka (Iftitah).',
    emotion: 'Ketenangan, Kelembutan, Awal mula',
    icon: '🌙',
    playlist: [
      { id: 'bayati-1', surah: 'QS. Al-Fatihah', ayah: '1-7', surahNumber: 1, url: 'https://archive.org/download/muammar-za-al-fatihah-bayati/Al-Fatihah%20%28Bayati%29.mp3', reciter: 'H. Muammar ZA' },
      { id: 'bayati-2', surah: 'QS. Al-Baqarah', ayah: '1-5', surahNumber: 2, url: 'https://archive.org/download/muammar-za-maqamat-full/bayati-al-baqarah-1-5.mp3', reciter: 'H. Muammar ZA' },
      { id: 'bayati-3', surah: 'QS. An-Nisa', ayah: '1', surahNumber: 4, url: 'https://archive.org/download/muammar-za-maqamat-full/bayati-an-nisa-1.mp3', reciter: 'H. Muammar ZA' },
      { id: 'bayati-4', surah: 'QS. Al-A\'raf', ayah: '187', surahNumber: 7, url: 'https://archive.org/download/muammar-za-maqamat-full/bayati-al-araf-187.mp3', reciter: 'H. Muammar ZA' },
      { id: 'bayati-5', surah: 'QS. Ali \'Imran', ayah: '102-104', surahNumber: 3, url: 'https://archive.org/download/muammar-za-maqamat-full/bayati-ali-imran-102-104.mp3', reciter: 'H. Muammar ZA' },
      { id: 'bayati-6', surah: 'QS. Al-Isra', ayah: '1-9', surahNumber: 17, url: 'https://archive.org/download/abdul-basit-collections/017-isra-1-9-bayati.mp3', reciter: 'Syekh Abdul Basit Abdus Samad' },
    ]
  },
  {
    id: 'shoba',
    name: 'Shoba',
    arabicName: 'صبا',
    description: 'Maqam yang sangat emosional, sering membangkitkan kesedihan mendalam atau kerinduan yang kuat.',
    emotion: 'Kesedihan, Kerinduan, Menyayat Hati',
    icon: '😢',
    playlist: [
      { id: 'shoba-1', surah: 'QS. Yusuf', ayah: '23-29', surahNumber: 12, url: 'https://archive.org/download/muammar-za-maqamat-full/shoba-yusuf-23-29.mp3', reciter: 'H. Muammar ZA' },
      { id: 'shoba-2', surah: 'QS. At-Taubah', ayah: '38-39', surahNumber: 9, url: 'https://archive.org/download/muammar-za-maqamat-full/shoba-at-taubah-38-39.mp3', reciter: 'H. Muammar ZA' },
      { id: 'shoba-3', surah: 'QS. Al-An\'am', ayah: '95-99', surahNumber: 6, url: 'https://archive.org/download/muammar-za-maqamat-full/shoba-al-anam-95-99.mp3', reciter: 'H. Muammar ZA' },
      { id: 'shoba-4', surah: 'QS. Al-Isra\'', ayah: '9-11', surahNumber: 17, url: 'https://archive.org/download/muammar-za-maqamat-full/shoba-al-isra-9-11.mp3', reciter: 'H. Muammar ZA' },
      { id: 'shoba-5', surah: 'QS. Al-Hujurat', ayah: '1-13', surahNumber: 49, url: 'https://archive.org/download/minshawi-collections/049-hujurat-1-13-shoba-hijaz.mp3', reciter: 'Syekh Mohamed Siddiq El-Minshawi' },
    ]
  },
  {
    id: 'hijaz',
    name: 'Hijaz',
    arabicName: 'حجاز',
    description: 'Memiliki karakter khas padang pasir. Nadanya tegas, mistis, dan sering digunakan untuk ayat-ayat peringatan.',
    emotion: 'Ketegasan, Agungh, Mistis',
    icon: '🕌',
     playlist: [
      { id: 'hijaz-1', surah: 'QS. Ibrahim', ayah: '35-41', surahNumber: 14, url: 'https://archive.org/download/muammar-za-maqamat-full/hijaz-ibrahim-35-41.mp3', reciter: 'H. Muammar ZA' },
      { id: 'hijaz-2', surah: 'QS. Al-Hijr', ayah: '45-60', surahNumber: 15, url: 'https://archive.org/download/muammar-za-maqamat-full/hijaz-al-hijr-45-60.mp3', reciter: 'H. Muammar ZA' },
      { id: 'hijaz-3', surah: 'QS. An-Nahl', ayah: '90-97', surahNumber: 16, url: 'https://archive.org/download/muammar-za-maqamat-full/hijaz-an-nahl-90-97.mp3', reciter: 'H. Muammar ZA' },
      { id: 'hijaz-4', surah: 'QS. Al-An\'am', ayah: '74-81', surahNumber: 6, url: 'https://archive.org/download/muammar-za-maqamat-full/hijaz-al-anam-74-81.mp3', reciter: 'H. Muammar ZA' },
      { id: 'hijaz-5', surah: 'QS. Al-Anbiya', ayah: '107-112', surahNumber: 21, url: 'https://archive.org/download/h-nanang-qosim-za-al-anbiya-107-112/H.%20Nanang%20Qosim%20ZA%20-%20Al-Anbiya%20107-112.mp3', reciter: 'H. Nanang Qosim ZA' },
      { id: 'hijaz-6', surah: 'QS. Qaf', ayah: '1-11', surahNumber: 50, url: 'https://archive.org/download/abdul-basit-collections/050-qaf-1-11-hijaz.mp3', reciter: 'Syekh Abdul Basit Abdus Samad' },
    ]
  },
  {
    id: 'nahawand',
    name: 'Nahawand',
    arabicName: 'نهاوند',
    description: 'Nada yang terdengar modern, romantis, dan dramatis. Sering digunakan karena fleksibilitasnya.',
    emotion: 'Romantis, Dramatis, Halus',
    icon: '🎭',
    playlist: [
      { id: 'nahawand-1', surah: 'QS. Al-Hijr', ayah: '85-99', surahNumber: 15, url: 'https://archive.org/download/muammar-za-maqamat-full/nahawand-al-hijr-85-99.mp3', reciter: 'H. Muammar ZA' },
      { id: 'nahawand-2', surah: 'QS. Al-Isra', ayah: '78-84', surahNumber: 17, url: 'https://archive.org/download/muammar-za-maqamat-full/nahawand-al-isra-78-84.mp3', reciter: 'H. Muammar ZA' },
      { id: 'nahawand-3', surah: 'QS. Al-Baqarah', ayah: '285-286', surahNumber: 2, url: 'https://archive.org/download/muammar-za-maqamat-full/nahawand-al-baqarah-285-286.mp3', reciter: 'H. Muammar ZA' },
      { id: 'nahawand-4', surah: 'QS. An-Nisa\'', ayah: '100', surahNumber: 4, url: 'https://archive.org/download/muammar-za-maqamat-full/nahawand-an-nisa-100.mp3', reciter: 'H. Muammar ZA' },
      { id: 'nahawand-5', surah: 'QS. Al-Baqarah', ayah: '183', surahNumber: 2, url: 'https://archive.org/download/tilawah-nanang-qosim-al-baqarah-183/Tilawah%20Nanang%20Qosim%20-%20Al%20Baqarah%20183.mp3', reciter: 'H. Nanang Qosim ZA' },
      { id: 'nahawand-6', surah: 'QS. Al-Hashr', ayah: '21-24', surahNumber: 59, url: 'https://archive.org/download/mahmoud-shahat-collections/059-hashr-21-24-nahawand.mp3', reciter: 'Syekh Mahmoud Shahat Anwar' },
    ]
  },
  {
    id: 'rast',
    name: 'Rast',
    arabicName: 'راست',
    description: 'Dikenal sebagai "Bapak Maqam". Nadanya lurus, gagah, dan berwibawa namun tetap membawa kegembiraan.',
    emotion: 'Wibawa, Kejujuran, Semangat',
    icon: '👑',
    playlist: [
      { id: 'rast-1', surah: 'QS. Al-An\'am', ayah: '1-3', surahNumber: 6, url: 'https://archive.org/download/muammar-za-maqamat-full/rast-al-anam-1-3.mp3', reciter: 'H. Muammar ZA' },
      { id: 'rast-2', surah: 'QS. Yusuf', ayah: '1-6', surahNumber: 12, url: 'https://archive.org/download/muammar-za-maqamat-full/rast-yusuf-1-6.mp3', reciter: 'H. Muammar ZA' },
      { id: 'rast-3', surah: 'QS. Al-Mulk', ayah: '1-14', surahNumber: 67, url: 'https://archive.org/download/muammar-za-maqamat-full/rast-al-mulk-1-14.mp3', reciter: 'H. Muammar ZA' },
      { id: 'rast-4', surah: 'QS. Al-Ma\'idah', ayah: '109-111', surahNumber: 5, url: 'https://archive.org/download/muammar-za-maqamat-full/rast-al-maidah-109-111.mp3', reciter: 'H. Muammar ZA' },
      { id: 'rast-5', surah: 'QS. Al-Isra', ayah: '1-5', surahNumber: 17, url: 'https://archive.org/download/tilawah-h-nanang-qosim-za-qs-al-isra-1-5/Tilawah%20H%20Nanang%20Qosim%20ZA%20-%20QS%20Al%20Isra%201-5.mp3', reciter: 'H. Nanang Qosim ZA' },
      { id: 'rast-6', surah: 'QS. Ar-Rahman', ayah: '1-34', surahNumber: 55, url: 'https://archive.org/download/minshawi-collections/055-rahman-1-34-rast.mp3', reciter: 'Syekh Mohamed Siddiq El-Minshawi' },
    ]
  },
  {
    id: 'sika',
    name: 'Sika',
    arabicName: 'سيكا',
    description: 'Maqam yang lambat, penuh harap, dan memohon. Sangat cocok untuk ayat-ayat doa.',
    emotion: 'Harapan, Cinta, Doa',
    icon: '🤲',
    playlist: [
      { id: 'sika-1', surah: 'QS. Al-Kahf', ayah: '107-110', surahNumber: 18, url: 'https://archive.org/download/muammar-za-maqamat-full/sika-al-kahf-107-110.mp3', reciter: 'H. Muammar ZA' },
      { id: 'sika-2', surah: 'QS. Al-Mu\'minun', ayah: '1-11', surahNumber: 23, url: 'https://archive.org/download/muammar-za-maqamat-full/sika-al-muminun-1-11.mp3', reciter: 'H. Muammar ZA' },
      { id: 'sika-3', surah: 'QS. Al-Hajj', ayah: '1-2', surahNumber: 22, url: 'https://archive.org/download/muammar-za-maqamat-full/sika-al-hajj-1-2.mp3', reciter: 'H. Muammar ZA' },
      { id: 'sika-4', surah: 'QS. Al-Qasas', ayah: '5-6', surahNumber: 28, url: 'https://archive.org/download/muammar-za-maqamat-full/sika-al-qasas-5-6.mp3', reciter: 'H. Muammar ZA' },
      { id: 'sika-5', surah: 'QS. Al-Ahzab', ayah: '40-48', surahNumber: 33, url: 'https://archive.org/download/qs-al-ahzab-40-48-h-nanang-qosim-za/QS%20Al-Ahzab%2040-48%20-%20H.%20Nanang%20Qosim%20ZA.mp3', reciter: 'H. Nanang Qosim ZA' },
      { id: 'sika-6', surah: 'QS. Maryam', ayah: '1-15', surahNumber: 19, url: 'https://archive.org/download/abdul-basit-collections/019-maryam-1-15-sika.mp3', reciter: 'Syekh Abdul Basit Abdus Samad' },
    ]
  },
  {
    id: 'jiharkah',
    name: 'Jiharkah',
    arabicName: 'جهاركاه',
    description: 'Nada yang sangat manis, mendayu, dan syahdu. Sering digunakan pada ayat-ayat tentang surga.',
    emotion: 'Manis, Mendayu, Keindahan',
    icon: '🌸',
    playlist: [
      { id: 'jiharkah-1', surah: 'QS. Ad-Dhuha', ayah: '1-11', surahNumber: 93, url: 'https://archive.org/download/muammar-za-maqamat-full/jiharkah-ad-dhuha-1-11.mp3', reciter: 'H. Muammar ZA' },
      { id: 'jiharkah-2', surah: 'QS. Al-Ghashiyah', ayah: '1-26', surahNumber: 88, url: 'https://archive.org/download/muammar-za-maqamat-full/jiharkah-al-ghasyiyah-1-26.mp3', reciter: 'H. Muammar ZA' },
      { id: 'jiharkah-3', surah: 'QS. Ali \'Imran', ayah: '190-194', surahNumber: 3, url: 'https://archive.org/download/muammar-za-maqamat-full/jiharkah-ali-imran-190-194.mp3', reciter: 'H. Muammar ZA' },
      { id: 'jiharkah-4', surah: 'QS. Al-Fath', ayah: '1-5', surahNumber: 48, url: 'https://archive.org/download/muammar-za-maqamat-full/jiharkah-al-fath-1-5.mp3', reciter: 'H. Muammar ZA' },
      { id: 'jiharkah-5', surah: 'QS. Al-Anbiya', ayah: '101-107', surahNumber: 21, url: 'https://archive.org/download/mahmoud-shahat-collections/021-anbiya-101-107-jiharkah.mp3', reciter: 'Syekh Mahmoud Shahat Anwar' },
    ]
  }
];

export const SCHEDULE: EventSchedule[] = [
  {
    id: 1,
    time: "19:30 - 20:00",
    title: "Pembukaan & Iftitah",
    reciter: "H. Muammar ZA (Rekaman)",
    maqamFocus: "Bayati"
  },
  {
    id: 2,
    time: "20:00 - 20:45",
    title: "Sesi Syahdu",
    reciter: "Ust. Abdullah Fikri",
    maqamFocus: "Shoba & Hijaz"
  },
  {
    id: 3,
    time: "20:45 - 21:30",
    title: "Puncak Haflah",
    reciter: "Syekh Mahmoud Shahat (Tamu)",
    maqamFocus: "Nahawand & Rast"
  },
  {
    id: 4,
    time: "21:30 - 22:00",
    title: "Penutup Doa",
    reciter: "KH. Ulil Albab",
    maqamFocus: "Sika & Jiharkah"
  }
];

export const HERO_IMAGE = "https://picsum.photos/1920/1080?grayscale&blur=2"; // Placeholder abstract
