import * as React from "react";
import { View } from "react-native";
import { Button, Divider, Menu } from "react-native-paper";

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);
  // Temporary workaround for react-native-paper Menu bug
  // Issue: https://github.com/callstack/react-native-paper/issues/4807
  // Menu can only be opened once without this key prop forcing remount
  const [menuKey, setMenuKey] = React.useState(0);

  const openMenu = () => {
    setVisible(true);
    console.log("open");
  };

  const closeMenu = () => {
    setVisible(false);
    console.log("close");
  };

  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        key={menuKey}
        visible={visible}
        onDismiss={() => {
          console.log("dismiss");
          closeMenu();
          setMenuKey(k => k + 1);
        }}
        anchor={
          <View>
            <Button onPress={openMenu}>Show menu</Button>
          </View>
        }
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  );
};

export default MyComponent;
