/**
 * Script to generate seed JSON files from TypeScript data files
 * This script reads the TypeScript data files and converts them to JSON format
 * matching the Prisma schema structure
 */

const fs = require('fs');
const path = require('path');

// Available images from seed data (will be randomly assigned)
const availableImages = [
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618305/elegant-rwanda/file_zdfnou.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618325/elegant-rwanda/file_cjyo3d.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618312/elegant-rwanda/file_pewgmd.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618344/elegant-rwanda/file_emzqnt.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618329/elegant-rwanda/file_qo3wky.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618307/elegant-rwanda/file_jifkpa.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769617647/elegant-rwanda/file_cglweq.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769617645/elegant-rwanda/file_rsb3if.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618319/elegant-rwanda/file_s7zygr.avif",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618317/elegant-rwanda/file_jltbwo.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618303/elegant-rwanda/file_ql1g1e.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618322/elegant-rwanda/file_samkqz.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618331/elegant-rwanda/file_fhyrvk.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618337/elegant-rwanda/file_pkrw7r.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618347/elegant-rwanda/file_q03n1p.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618333/elegant-rwanda/file_fs3fhn.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618324/elegant-rwanda/file_bpba3o.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1770024739/wildlife/file_ve6kji.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618342/elegant-rwanda/file_rqimm1.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769617643/elegant-rwanda/file_rzswto.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769617641/elegant-rwanda/file_ocj6bz.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618340/elegant-rwanda/file_kdohs7.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618335/elegant-rwanda/file_l5ygtl.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618343/elegant-rwanda/file_ycs9rm.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769617639/elegant-rwanda/file_qmjplz.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618339/elegant-rwanda/file_rs1frz.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618315/elegant-rwanda/file_xjhket.jpg",
  "https://res.cloudinary.com/dshjd91l7/image/upload/v1769618327/elegant-rwanda/file_i1fdra.jpg"
];

// Category name to slug mapping
const categorySlugMap = {
  'General Travel': 'general-travel',
  'Gorilla Trekking': 'gorilla-trekking',
  'Tours & Packages': 'tours-packages',
  'Transportation': 'transportation',
  'Accommodation': 'accommodation',
  'Wildlife': 'wildlife',
  'Cultural': 'cultural',
  'Adventure': 'adventure',
  'Unique': 'unique',
  'Nature': 'nature',
  'Group Tour': 'group-tour',
  'Cultural Event': 'cultural-event',
  'Tips': 'tips',
  'News': 'news',
  'Tours': 'tours-packages',
  'Culture': 'cultural'
};

// Helper function to get random images
function getRandomImages(count = 3) {
  const shuffled = [...availableImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to convert image path to URL (if it's a local path, use random image)
function convertImagePath(imagePath) {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  // For local paths, return a random image from available images
  return getRandomImages(1)[0];
}

// Read and parse TypeScript-like data (we'll need to extract the data arrays)
// Since we can't directly execute TS, we'll create JSON files manually based on the data structure

console.log('Seed data generation script');
console.log('Note: This script requires manual data extraction from TypeScript files');
console.log('The seed JSON files should be created manually or by running the TypeScript files');
