import { CityInfo } from "./city-info";

export interface CityList {
  data: Array<CityInfo>;
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
  filter?: string;
}