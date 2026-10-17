const nextConfig = {
  images: {
    // Foto produk & space diambil dari Unsplash via <img> biasa,
    // jadi tidak perlu remotePatterns. Disini hanya untuk next/image kalau nanti dipakai.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;