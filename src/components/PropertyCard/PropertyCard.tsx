import { FC } from "react";

import clsx from "clsx";
import Styles from "./PropertyCard.module.css";

export interface CityProps {
  city: string;
  id: number;
  isLiked: boolean;
  picture: string;
  price: number;
  rooms: number;
  title: string;
}
interface PropertyCardProps {
  className?: string;
  city: CityProps;
}

export const PropertyCard: FC<PropertyCardProps> = (props) => {
  const { city } = props;
  return (
    <div className={clsx(Styles.card, props.className)}>
      <div className={Styles.imgContainer}>
        <img src={city.picture} alt="" className={Styles.img} />
      </div>
      <div className={Styles.content}>
        <div className={Styles.title}>{city.title}</div>
        <div className={Styles.row}>
          <div className={Styles.city}>{city.city}</div>
          <div className={Styles.roomsCount}>{city.rooms} rooms</div>
        </div>
        <div className={Styles.price}>
          <span className={Styles.priceText}>${city.price}</span> / month
        </div>
      </div>
    </div>
  );
};
