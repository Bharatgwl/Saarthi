'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/auth/AuthForm';

export default function VendorLogin() {
  const router = useRouter();

  const handleLogin = (data: any) => {
    // Simulate login process
    console.log('Vendor login:', data);
    // Store user data in localStorage for demo
    localStorage.setItem('userType', 'vendor');
    localStorage.setItem('userData', JSON.stringify({
      name: data.name || 'John Doe',
      email: data.email,
      businessName: 'Street Food Corner'
    }));
    router.push('/vendor/dashboard');
  };

  return <AuthForm type="login" userType="vendor" onSubmit={handleLogin} />;
}