/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',

            }
        ],
        domains: [
            'i.postimg.cc',
            '*.postimg.cc',
        ],

    }
}

module.exports = nextConfig
