import React from 'react';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { filterSelector } from '../redux/filter/selectors';

import { fetchPizzas } from '../redux/pizza/asyncActions';
import { pizzaDataSelector } from '../redux/pizza/selectors';
import { SearchPizzaParams } from '../redux/pizza/types';

import { Categories, PizzaBlock, Sort, Skeleton, Pagination } from '../components';
import { sortList } from '../components/Sort';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSearch, setIsSearch] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const { items, status } = useSelector(pizzaDataSelector);
  const { categoryId, sortType, currentPage, searchValue } = useSelector(filterSelector);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId ? '&category=' + categoryId : '';
    const sortBy = '&sortBy=' + sortType.sortProperty.replace('-', '');
    const order = '&order=' + (sortType.sortProperty.includes('-') ? 'asc' : 'desc');
    const search = '&search=' + searchValue;

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Если изменили параметры и был первый рендер, то вшиваем параметры в URL
  React.useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
        searchValue,
      });

      navigate(`?${queryString}`);
    }

    setIsMounted(true);
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1)) as unknown as SearchPizzaParams;
      const sortType = sortList.find((obj) => obj.sortProperty === params.sortBy);
      if (sortType)
        dispatch(
          setFilters({
            categoryId: +params.category,
            currentPage: +params.currentPage,
            sortType: sortType,
            searchValue: params.search,
          }),
        );

      setIsSearch(true);
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы в зависимости от URL-параметров
  React.useEffect(() => {
    if (!isSearch) {
      getPizzas();
    }

    setIsSearch(false);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((item, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2> Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. <br /> Попробуйте повторить попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
