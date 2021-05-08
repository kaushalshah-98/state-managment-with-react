import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Test: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, []);
  return null;
};

export default Test;
