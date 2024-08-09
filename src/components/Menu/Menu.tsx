import clsx from "clsx";
import { FC, useState } from "react";
import ReactSlider from "react-slider";

import { PropertySearchFilters } from "../../api/properties";
import Styles from "./Menu.module.css";

interface MenuProps {
  handleActions: {
    handleSubmit: (filters: PropertySearchFilters) => void;
  };
}

export const Menu: FC<MenuProps> = ({ handleActions }) => {
  const [filters, setFilters] = useState({});
  const onChangePrice = (value: number[]) => {
    setFilters((prevState) => {
      return { ...prevState, minPrice: value[0], maxPrice: value[1] };
    });
  };
  const onChangeCity = (value: string) => {
    setFilters((prevState) => {
      return { ...prevState, city: value };
    });
  };
  const { handleSubmit } = handleActions;
  return (
    <div className={Styles.menu}>
      <div className={clsx(Styles.menuItem, Styles.sliderContainer)}>
        <ReactSlider
          className={Styles.slider}
          thumbClassName={Styles.thumb}
          trackClassName={Styles.track}
          defaultValue={[500, 2500]}
          min={0}
          max={3000}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => {
            return <div {...props}>{state.valueNow}</div>;
          }}
          pearling
          minDistance={10}
          onChange={(value) => onChangePrice(value)}
        />
      </div>
      <div className={clsx(Styles.menuItem, Styles.cityContainer)}>
        <label>
          <span>City</span>
          <select
            className={Styles.dropdown}
            onChange={(e) => onChangeCity(e.target.value)}
          >
            <option value="">All</option>
            <option value="Atlanta">Atlanta</option>
            <option value="New York">New York</option>
          </select>
        </label>
      </div>
      <div className={clsx(Styles.menuItem, Styles.buttonContainer)}>
        <button className={Styles.button} onClick={() => handleSubmit(filters)}>
          Find
        </button>
      </div>
    </div>
  );
};
