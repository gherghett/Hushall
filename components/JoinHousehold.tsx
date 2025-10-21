// import { userAtom } from "@/atoms/auth-atoms";
// import { db } from "@/lib/firebase";
// import { AppTheme } from "@/lib/theme";
// import {
//   arrayUnion,
//   collection,
//   getDocs,
//   query,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { useAtomValue } from "jotai";
// import React, { useState } from "react";
// import { Alert } from "react-native";
// import {
//   Button,
//   Card,
//   Modal,
//   Text,
//   TextInput,
//   useTheme,
// } from "react-native-paper";

// export default function JoinHoushold() {
//   const theme = useTheme() as AppTheme;
//   const user = useAtomValue(userAtom);
//   const [householdCode, setHouseholdCode] = useState("");
//   const [modalVisible, setModalVisible] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleJoinHouseholdSubmit = async (code: string) => {
//     setIsLoading(true);
//     try {
//       const q = query(collection(db, "Households"), where("code", "==", code));
//       const querySnap = await getDocs(q);

//       if (querySnap.empty) {
//         Alert.alert("Fel", "Ingen hushåll hittades med den koden.");
//         setIsLoading(false);
//         return;
//       }

//       const householdDoc = querySnap.docs[0];

//       await updateDoc(householdDoc.ref, {
//         members: arrayUnion({
//           id: user!.uid,
//           name: user!.displayName,
//         }),
//       });
//     } catch (error) {
//       console.error("Error joining household:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Modal visible={modalVisible}>
//       <Card>
//         <Card.Content>
//           <Text variant="titleLarge">Gå med hushåll</Text>
//           <TextInput
//             label={"kod"}
//             onChangeText={setHouseholdCode}
//             mode="outlined"
//           />
//           <Button
//             mode="contained"
//             loading={isLoading}
//             disabled={isLoading}
//             onPress={() => {
//               setModalVisible(!modalVisible);
//               handleJoinHouseholdSubmit(householdCode);
//             }}
//           >
//             Join
//           </Button>
//         </Card.Content>
//       </Card>
//     </Modal>
//   );
// }
