// ============================================================
// BYTE//BREW — Data menu
// Ganti isi array `items` di bawah dengan katalog asli.
// ============================================================

export const CATEGORIES = [
  {
    id: "signature",
    label: "Kopi Panas",
    index: "01",
    note: "Biji pilihan, diseduh fresh setiap pesanan.",
  },
  {
    id: "cold",
    label: "Cold Brew",
    index: "02",
    note: "Direndapkan 18 jam, tidak pahit, langsung dingin.",
  },
  {
    id: "notcoffee",
    label: "Non-Kopi",
    index: "03",
    note: "Untuk yang belum siap minum kopi hari ini.",
  },
];

export const ITEMS = [
  // --- 01 Kopi Panas ---
  {
    id: "espresso",
    name: "ESPRESSO",
    category: "signature",
    desc: "Dua shot, 18 gram masuk, 40 gram keluar. Disajikan dengan satu biskuit.",
    price: 22,
    tag: null,
    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "single-origin",
    name: "SINGLE ORIGIN",
    category: "signature",
    desc: "Biji Sumatra, rasa cokelat gelap dengan sedikit manis.",
    price: 28,
    tag: "Paling laris",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flat-white",
    name: "FLAT WHITE",
    category: "signature",
    desc: "Susu 180 ml dengan busa rapat, dituang perlahan.",
    price: 32,
    tag: null,
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cortado",
    name: "CORTADO",
    category: "signature",
    desc: "Espresso dicampur susu oat, ukuran kecil.",
    price: 30,
    tag: null,
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
  },

  // --- 02 Cold Brew ---
  {
    id: "cold-brew",
    name: "COLD BREW",
    category: "cold",
    desc: "Direndapkan 18 jam, dituang di atas es batu.",
    price: 35,
    tag: "Paling laris",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "vanilla-cold-brew",
    name: "VANILLA COLD BREW",
    category: "cold",
    desc: "Cold brew dengan sirup vanila Madagaskar.",
    price: 38,
    tag: null,
    img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "orange-cold-brew",
    name: "ORANGE COLD BREW",
    category: "cold",
    desc: "Cold brew dengan kulit jeruk dan tonic. Segar dan sedikit asam.",
    price: 40,
    tag: "Baru",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
  },

  // --- 03 Non-Kopi ---
  {
    id: "matcha-latte",
    name: "MATCHA LATTE",
    category: "notcoffee",
    desc: "Bubuk matcha kelas premium, dikocok dengan susu oat.",
    price: 38,
    tag: null,
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "hot-chocolate",
    name: "HOT CHOCOLATE",
    category: "notcoffee",
    desc: "Cokelat 70% dengan sedikit garam laut dan susu hangat.",
    price: 34,
    tag: null,
    img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "jasmine-tea",
    name: "JASMINE TEA",
    category: "notcoffee",
    desc: "Teh hijau melati dengan irisan yuzu dan madu.",
    price: 30,
    tag: null,
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chai-latte",
    name: "CHAI LATTE",
    category: "notcoffee",
    desc: "Susu dengan rempah cardamom dan campurannya sendiri.",
    price: 36,
    tag: null,
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80",
  },
];

export const FEATURED_IDS = ["single-origin", "espresso", "cold-brew", "matcha-latte"];

export function getByCategory(id) {
  return ITEMS.filter((i) => i.category === id);
}

export function formatPrice(n) {
  return `Rp${n}k`;
}

export const INFO = {
  name: "BYTE//BREW",
  tagline: "Kopi pilihan, diroast setiap hari.",
  address: "Jl. Senopati No. 12, Jakarta Selatan",
  mapsQuery: "Senopati Jakarta Selatan",
  hours: [
    { day: "Senin – Jumat", time: "07:00 – 22:00" },
    { day: "Sabtu", time: "08:00 – 23:00" },
    { day: "Minggu", time: "08:00 – 21:00" },
  ],
  email: "brew@bytebrew.id",
  phone: "+62 811 0000 777",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};