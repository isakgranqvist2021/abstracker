import { useRouter } from 'next/router';
import { useState } from 'react';

export function useInvitationActions(_id: string, orgId: string) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const acceptInvitation = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const res = await fetch('/api/account/invite', {
      method: 'PUT',
      body: JSON.stringify({ _id, status: 'accepted' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);

    if (res.status === 200) {
      router.push(`/account/org/${orgId}`);
      return;
    }
  };

  const declineInvitation = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const res = await fetch('/api/account/invite', {
      method: 'PUT',
      body: JSON.stringify({ _id, status: 'declined' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);

    if (res.status === 200) {
      setIsDeclined(true);
      return;
    }
  };

  return { acceptInvitation, declineInvitation, isDeclined };
}
