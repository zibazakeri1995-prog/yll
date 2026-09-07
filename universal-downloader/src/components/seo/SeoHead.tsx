import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  jsonLd?: Record<string, unknown>;
}

export function SeoHead({
  title,
  description,
  canonical,
  robots = 'index, follow',
  ogImage,
  ogType = 'website',
  keywords,
  jsonLd,
}: SeoHeadProps) {
  const siteName = import.meta.env.VITE_SITE_NAME || 'Universal Media Downloader';
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const fullTitle = `${title} | ${siteName}`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Create or update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description || '');
    updateMeta('robots', robots);
    if (keywords && keywords.length > 0) {
      updateMeta('keywords', keywords.join(', '));
    }

    // Open Graph tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description || '', true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:site_name', siteName, true);
    if (ogImage) {
      updateMeta('og:image', ogImage, true);
    } else {
      updateMeta('og:image', `${siteUrl}/og-image.svg`, true);
    }

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image', true);
    updateMeta('twitter:title', fullTitle, true);
    updateMeta('twitter:description', description || '', true);
    if (ogImage) {
      updateMeta('twitter:image', ogImage, true);
    }

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // JSON-LD structured data
    if (jsonLd) {
      let script = document.getElementById('json-ld') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    // Cleanup function
    return () => {
      // Meta tags are kept for SPA navigation efficiency
    };
  }, [fullTitle, description, robots, keywords, canonical, ogImage, ogType, jsonLd, siteName, siteUrl]);

  return null;
}
