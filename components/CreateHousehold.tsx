// import { userAtom } from "@/atoms/auth-atoms";
// import { useCreateHouseholdMutation } from "@/atoms/household-atoms";
// import { AppTheme } from "@/lib/theme";
// import { useAtomValue } from "jotai";
// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   Modal,
//   Text,
//   TextInput,
//   useTheme,
// } from "react-native-paper";

// export default function CreateHoushold() {
//   const theme = useTheme() as AppTheme;
//   const [householdName, setHouseholdName] = useState("");
//   const user = useAtomValue(userAtom);
//   const [modalVisible, setModalVisible] = useState(true);

//   // Use the centralized mutation hook from atoms
//   const createHouseholdMutation = useCreateHouseholdMutation();

//   const handleCreateHouseholdSubmit = () => {
//     if (!user || !householdName.trim()) return;

//     createHouseholdMutation.mutate({
//       name: householdName,
//       ownerId: user.uid,
//       ownerName: user.displayName || user.email || "Unknown User",
//     });
//   };

//   // Close modal when mutation succeeds
//   React.useEffect(() => {
//     if (createHouseholdMutation.isSuccess) {
//       setModalVisible(false);
//     }
//   }, [createHouseholdMutation.isSuccess]);

//   return (
//     <Modal visible={modalVisible}>
//       <Card>
//         <Card.Content>
//           <Text variant="titleLarge">Skapa hushåll</Text>
//           <Text variant="labelMedium">Hushållsnamn</Text>
//           <TextInput
//             label={"namn"}
//             onChangeText={setHouseholdName}
//             mode="outlined"
//           />
//           <Button
//             mode="contained"
//             loading={createHouseholdMutation.isPending}
//             disabled={
//               createHouseholdMutation.isPending || !householdName.trim()
//             }
//             onPress={handleCreateHouseholdSubmit}
//           >
//             Create
//           </Button>
//         </Card.Content>
//       </Card>
//     </Modal>
//   );
// }
