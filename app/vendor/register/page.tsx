'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/auth/AuthForm';

export default function VendorRegister() {
  const router = useRouter();

  const handleRegister = (data: any) => {
    // Simulate registration process
    console.log('Vendor registration:', data);
    // Store user data in localStorage for demo
    localStorage.setItem('userType', 'vendor');
    localStorage.setItem('userData', JSON.stringify(data));
    router.push('/vendor/dashboard');
  };

  return <AuthForm type="register" userType="vendor" onSubmit={handleRegister} />;
}