import type { TypeDict } from "@ctypes/database_types";

import SaleMenu from "@components/database/menus/sale_menu";
import TicketMenu from "./ticket_menu";
import GeneralPriceMenu from "./general_price_menu";
import PrintModelMenu from "./print_model_menu";
import ErrorSaleMenu from "./error_sale_menu";
import ClientMenu from "./client_menu";
import ThemeMenu from "./theme_menu";
import SubthemeMenu from "./subtheme_menu";
import MaterialTypeMenu from "./material_type_menu";
import MaterialMenu from "./material_menu";
import MaterialInventoryMenu from "./material_inventory";
import SetModelMenu from "./set_model_menu";
import BrandModelMenu from "./brand_menu";

interface Props<K extends keyof TypeDict> {
  typeKey: K;
  data: TypeDict[K];
  type_menu:string;
}

export default function MenuSelector<K extends keyof TypeDict>(props:Props<K>){
  const { data, typeKey, type_menu } = props;
  
  const menuComponents: {
    [K in keyof TypeDict]?: React.ComponentType<{ data: TypeDict[K]; type_menu:string }>;
  } = {
    sale: SaleMenu,
    ticket: TicketMenu,
    general_price: GeneralPriceMenu,
    print_model: PrintModelMenu,
    error_sale:ErrorSaleMenu,
    client:ClientMenu,
    theme:ThemeMenu,
    subtheme:SubthemeMenu,
    material_type:MaterialTypeMenu,
    material:MaterialMenu,
    material_inventory:MaterialInventoryMenu,
    set_model:SetModelMenu,
    brand_model:BrandModelMenu,
  };

  const MenuComponent = menuComponents[typeKey] as
    | React.ComponentType<{ data: TypeDict[K]; type_menu:string }>
    | undefined;
  
  if (!MenuComponent) return <p>No hay menú disponible</p>;
  
  return <MenuComponent data={data} type_menu={type_menu}/>;
}