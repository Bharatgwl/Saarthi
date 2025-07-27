'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/auth/AuthForm';

export default function SupplierLogin() {
  const router = useRouter();

  const handleLogin = (data: any) => {
    // Simulate login process
    console.log('Supplier login:', data);
    // Store user data in localStorage for demo
    localStorage.setItem('userType', 'supplier');
    localStorage.setItem('userData', JSON.stringify({
      name: data.name || 'Raj Supplies',
      email: data.email,
      businessName: 'Fresh Ingredients Ltd'
    }));
    router.push('/supplier/dashboard');
  };

  return <AuthForm type="login" userType="supplier" onSubmit={handleLogin} />;
}