import type { TypeDict } from "@ctypes/database_types";

import SaleMenu from "@components/database/menus/sale_menu";
import TicketMenu from "./ticket_menu";
import GeneralPriceMenu from "./general_price_menu";
import PrintModelMenu from "./print_model_menu";

interface Props<K extends keyof TypeDict> {
  typeKey: K;
  data: TypeDict[K];
  isInner:boolean;
}

export default function MenuSelector<K extends keyof TypeDict>(props:Props<K>){
  const { data, typeKey, isInner } = props;
  
  const menuComponents: {
    [K in keyof TypeDict]?: React.ComponentType<{ data: TypeDict[K]; isInner:boolean }>;
  } = {
    sale: SaleMenu,
    ticket: TicketMenu,
    general_price: GeneralPriceMenu,
    print_model: PrintModelMenu
  };

  const MenuComponent = menuComponents[typeKey] as
    | React.ComponentType<{ data: TypeDict[K]; isInner:boolean }>
    | undefined;
  
  if (!MenuComponent) return <p>No hay menú disponible</p>;

  return <MenuComponent data={data} isInner={isInner}/>;
}