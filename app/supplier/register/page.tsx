'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/auth/AuthForm';

export default function SupplierRegister() {
  const router = useRouter();

  const handleRegister = (data: any) => {
    // Simulate registration process
    console.log('Supplier registration:', data);
    // Store user data in localStorage for demo
    localStorage.setItem('userType', 'supplier');
    localStorage.setItem('userData', JSON.stringify(data));
    router.push('/supplier/dashboard');
  };

  return <AuthForm type="register" userType="supplier" onSubmit={handleRegister} />;
}