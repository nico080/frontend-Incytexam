import React, { useMemo, useReducer } from "react";
import "./CreateOrder.css";
import RadioInput from "../../components/RadioInput";
import { CreateOrderProps } from "./CreateOrder.props";

const CreateOrderView = (props: CreateOrderProps) => {
  const { items, rules } = props;

  type SelectedItems = Record<number, string>;
  const [selectedItems, updateSelectedItems] = useReducer(
    (state: SelectedItems, newState: SelectedItems) => ({
      ...state,
      ...newState,
    }),
    {
      0: "",
      1: "",
      2: "",
    } as SelectedItems
  );

  const isSelected = (id: string, groupIndex: number) => {
    return id === selectedItems[groupIndex];
  };

  const blacklist = useMemo(() => {
    // Create a blacklist based on rules and currently selected items
    const selectedIds = Object.values(selectedItems);
    const blacklistedIds = selectedIds.flatMap((id) => rules[+id] || []);
    return blacklistedIds;
  }, [rules, selectedItems]);

  const isDisabled = (id: string) => {
    return blacklist.includes(+id);
  };

  const handleSelection = (value: string, groupIndex: number) => {
    updateSelectedItems({
      [groupIndex]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(selectedItems);
  };

  // TODO: If no items are available, show a "Loading..." text
  // Show a "Loading..." text when no items are available
  return (
    <div className="createOrder">
      <form onSubmit={handleSubmit}>
        {items.length === 0 && <p>Loading...</p>} {/* Show "Loading..." text if no items are available */}
        {items.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.map((item) => (
              <RadioInput
                key={item.id} // Set the key prop to a unique identifier for each radio input
                label={item.value} // Set the label prop to the value of the item
                value={item.id} // Set the value prop to the id of the item
                onSelect={(value) => handleSelection(value, groupIndex)} // Pass a callback function to handle the selection of the radio input
                checked={isSelected(item.id, groupIndex)} // Set the checked prop based on whether the item is selected
                disabled={isDisabled(item.id)} // Set the disabled prop based on whether the item is blacklisted
              />
            ))}
            <br />
          </div>
        ))}
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateOrderView;