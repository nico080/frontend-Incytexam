import { useEffect, useState } from "react";
import { getMenuItems, GetMenuItemsResponse } from "../../services/menu";
import {
  CreateOrderPrivateProps,
  CreateOrderPublicProps,
} from "./CreateOrder.props";
import CreateOrderView from "./CreateOrder.view";

const CreateOrder = (props: CreateOrderPublicProps) => {
  const [menu, setMenu] = useState<GetMenuItemsResponse>({
    items: [],
    rules: {},
  });

  useEffect(() => {
    // TODO: Fetch menu data
    // Get the menu data by calling the getMenuItems function and setting the state
    const fetchData = async () => {
      const menuData = await getMenuItems();
      setMenu(menuData);
    };

    fetchData();
  }, []);

  const generatedProps: CreateOrderPrivateProps = {
    items: menu.items,
    rules: menu.rules,
  };

  return <CreateOrderView {...generatedProps} />;
};

export default CreateOrder;