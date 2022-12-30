/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    TREFLE_BASE_URL: "https://trefle.io/api/v1/plants",
    TREFLE_API_KEY: "p13IHpIfEtoR_m-uK0KgsF2jlQLiGeUEWiQDuOHeN3Y",
  },
};

module.exports = nextConfig;
