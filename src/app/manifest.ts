import type { MetadataRoute } from 'next';
import { APP_META } from '@/lib/app-meta';

// Installable on the home screen, with this app's own name, icon and colours (E11).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             APP_META.name,
    short_name:       APP_META.shortName,
    description:      APP_META.description,
    start_url:        '/app',
    display:          'standalone',
    background_color: APP_META.themeColor,
    theme_color:      APP_META.themeColor,
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
