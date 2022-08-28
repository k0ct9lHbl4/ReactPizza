import React from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Loading } from '../components';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62f0d7a8e2bca93cd23e14f3.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <Loading value="" />;
  }

  return (
    <div className="container full-pizza">
      <img className="full-pizza__img" src={pizza.imageUrl} />
      <div className="full-pizza__description">
        <h2 className="full-pizza__title">{pizza.title}</h2>
        <p>
          Выглядит невероятно аппетитно, не правда ли? <br /> Скорее добавляй в корзину и заказывай!{' '}
          <br /> Доставка по всей Вселенной со скоростью света!
        </p>
        <h4 className="full-pizza__price">от {pizza.price} ₽</h4>
        <Link to="/" className="button button--outline">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
