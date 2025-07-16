import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from '../utils/api';

export default function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Получаем clientSecret с бэкенда
      const res = await axios.post('/user/create-payment-intent');
      const clientSecret = res.data.clientSecret;

      // 2. Подтверждаем оплату через Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // 3. Говорим бэкенду активировать подписку
        await axios.post('/user/confirm-payment');
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка оплаты');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={{ style: { base: { color: '#fff' } } }} />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Оплата...' : 'Оплатить 299₽'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
