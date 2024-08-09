import { FC, useCallback, useEffect, useState } from "react";

import { clsx } from "clsx";
import {
  fetchProperties,
  PropertySearchFilters,
} from "../../api/properties.ts";
import { Menu } from "../Menu/Menu.tsx";
import { PaginationProps } from "../Pagination/Pagination.tsx";
import { CityProps, PropertyCard } from "../PropertyCard/PropertyCard.tsx";
import Styles from "./PropertySearch.module.css";

interface IListState {
  pagination: PaginationProps;
  cities: CityProps[];
}

export const PropertySearch: FC = () => {
  const [list, setList] = useState<IListState>({
    pagination: { currentPage: 0, pageCount: 0, pageSize: 0 },
    cities: [],
  });
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async (filters?: PropertySearchFilters) => {
    try {
      setLoading(true);
      const response = await fetchProperties(filters);
      setList({
        pagination: {
          pageCount: response.pageTotal,
          pageSize: response.pageSize,
          currentPage: response.page,
        },
        cities: response.results,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = useCallback(
    async (filters: PropertySearchFilters) => {
      await fetchData(filters);
    },
    [fetchData]
  );

  return (
    <div className={Styles.page}>
      <Menu handleActions={{ handleSubmit }} />
      <section className={clsx(Styles.content, loading && Styles.loading)}>
        {list?.cities.map((city) => {
          return <PropertyCard key={city.id} city={city} />;
        })}
      </section>
      <section className={Styles.pagination}>{/* <Pagination /> */}</section>
    </div>
  );
};
