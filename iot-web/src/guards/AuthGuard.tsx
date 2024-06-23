"use client"

import { ReactNode, Suspense, useEffect, useState } from 'react';
// next
import { usePathname, useRouter } from 'next/navigation';
// hooks
// components
import Login from '@/app/auth/login/page';
import useAuth from '@/hooks/useAuth';
// pages

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname()
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <>Loading...</>;
  }
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <Suspense fallback={<>Loading...</>}>
        <Login />
      </Suspense>
    );
  }

  const realPath = ['/dashboard']

  if (!realPath.includes(pathname)) {
    push(`/404`);
    return <></>;
  }

  return <>{children}</>;
}
