import { CityInfo } from "./city-info";
import { NavigationLinks } from "./navigation-links";

export interface CityListResponse {
  data: Array<CityInfo>;
  total: number;
  links: NavigationLinks;
  filter?: string;
}
