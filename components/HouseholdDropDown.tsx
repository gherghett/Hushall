import { ChangeHouseHold, Household } from '@/atoms/household-atoms';
import { AntDesign } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text } from 'react-native-paper';

export default function HouseholdDropDown() {
  const [title] = useAtom(Household)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    {label: 'Hem2', value: '1'},
    {label: 'Hem3', value: '2'},
    {label: '+'   , value: "add"}
  ]);
  const curent = "Hem"
  return (
    <View style={{ width: 150, zIndex: 1000 }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={curent}
        zIndex={1000}
        style={{
          backgroundColor: "transparent", 
          borderWidth: 0,
          height: 40,
          justifyContent: 'center',
        }}
        textStyle={{
          fontSize: 16,
          fontWeight: '500',
          textAlign: 'center',
        }}
        dropDownContainerStyle={{
          borderWidth: 1,
          width: "200%",
          left: "-35%",
          borderColor: '#ccc',
          borderRadius: 8,
          marginTop: 5,
          zIndex: 1000,
        }}
        listMode="FLATLIST"
        renderListItem={({ item }) => (
          <TouchableOpacity onPress={() => 
          {ChangeHouseHold(item.value!), 
          setOpen(false)}}>
          <View
            style={{
              backgroundColor: item.value === 'add' ? '#A0C4FF' : '#ffffffff',
              margin: 5,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: '#cbc9c9ff',
              flexDirection: 'row',
              justifyContent: item.value === 'add' ? "center" : "space-between",
              alignItems: 'center',
              borderRadius: 8,
            }}
            >
              {item.value !== 'add' && <View style={{ width: 16}}/>}
              <Text style={{ fontSize: 16, color: "black"}}>{item.label}</Text>
              {item.value !== 'add' && <AntDesign name="arrow-right" size={16} />}
          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );

};
