"use client";

import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();
  console.log(session);
  console.log(isPending);

  const router = useRouter();

  const isAuthenticated = session !== null;
  if (!isAuthenticated) {
    router.push('/auth/sign-in');
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
