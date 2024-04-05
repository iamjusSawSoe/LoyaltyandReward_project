import { sfAnd, sfEqual } from "spring-filter-query-builder/";
import { Equal } from "spring-filter-query-builder/dist/types/comparators";

type keyValue = { key: string; value: string };

export const ArrayRouteParams = (data: keyValue[]) => {
  const routeParamsArr: Equal[] | string = [];

  if (data.length <= 0) return "";

  data.map((item) => {
    const condition = sfEqual(item.key, item.value);
    routeParamsArr.push(condition);
  });

  return sfAnd(routeParamsArr).toString();
};
