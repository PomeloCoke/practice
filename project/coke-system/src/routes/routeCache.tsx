// withPageCache.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import LayoutLoading from "@/layout/Loading";

interface CacheItem {
  key: string;
  content: JSX.Element;
}

export function withPageCache(WrappedComponent: React.LazyExoticComponent<React.ComponentType<any>>) {
  return () => {
    const location = useLocation();
    const [cache, setCache] = useState<CacheItem[]>([]);

    useEffect(() => {
      const currentCache = cache.find((item) => item.key === location.key);

      if (!currentCache) {
        const newCacheItem: CacheItem = {
          key: location.key,
          content: (
            <React.Suspense fallback={<LayoutLoading />}>
              <WrappedComponent />
            </React.Suspense>
          ),
        };
        setCache((prevCache) => [...prevCache, newCacheItem]);
      }
    }, [location.key]);

    const renderContent = () => {
      const currentCache = cache.find((item) => item.key === location.key);

      if (currentCache) {
        return currentCache.content;
      }

      return <Outlet />;
    };

    return <>{renderContent()}</>;
  };
}
