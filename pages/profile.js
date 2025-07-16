import { useEffect, useState } from 'react';
import axios from '../utils/api';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY');

export default function Profile() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
    fetchProfile();
  }, [refresh]);

  async function fetchProfile() {
    try {
      const res = await axios.get('/user/profile');
      setUser(res.data.user);
      setSubscription(res.data.subscription);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page">
      <Header />
      <h1>Личный кабинет</h1>
      {user && (
        <div className="profile">
          <p>Email: {user.email}</p>
          <p>Подписка: {subscription?.active ? 'Активна ✅' : 'Неактивна ❌'}</p>
          {!subscription?.active && (
            <Elements stripe={stripePromise}>
              <CheckoutForm onSuccess={() => setRefresh(!refresh)} />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
}
