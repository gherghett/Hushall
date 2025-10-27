import { db } from "@/lib/firebase";
import { Household } from "@/models/household";
import { doc, getDoc } from "@firebase/firestore";

export default async function getHouseholds(
  userId: string
): Promise<Household[]> {
  try {
    // First, get the user's membership document
    const membershipDoc = await getDoc(doc(db, "memberships", userId));

    if (!membershipDoc.exists()) {
      console.log("membership dont exist");

      return []; // User is not a member of any household
    }

    const membershipData = membershipDoc.data();
    const householdMemberships = membershipData?.households || [];

    console.log("Membership data:", membershipData);
    console.log("Household memberships:", householdMemberships);

    if (householdMemberships.length === 0) {
      return [];
    }

    // The households field is an array of household IDs (strings), not objects
    const householdIds = householdMemberships.filter(
      (id: any) => id && typeof id === "string" && id.trim() !== ""
    );
    console.log("Filtered household IDs:", householdIds);

    if (householdIds.length === 0) {
      console.log("No valid household IDs found");
      return [];
    }

    // Fetch all household documents
    console.log("About to fetch households with IDs:", householdIds);
    const householdPromises = householdIds.map((id: string) =>
      getDoc(doc(db, "households", id))
    );

    const householdDocs = await Promise.all(householdPromises);
    console.log(
      "Fetched household docs:",
      householdDocs.map(doc => ({ id: doc.id, exists: doc.exists() }))
    );

    // Combine household data with membership info
    const households = householdDocs
      .filter(doc => doc.exists())
      .map(householdDoc => {
        const householdData = householdDoc.data();

        // Since we only have household IDs, we need to get role info from the household document itself
        // The user's role should be in the household's members array
        const members = householdData?.members || [];
        const userMember = members.find(
          (member: any) => member.userId === userId
        );

        console.log(`Household ${householdDoc.id}:`, {
          householdData,
          userMember,
          combinedData: {
            id: householdDoc.id,
            ...householdData,
            userRole: userMember?.role || "member",
          },
        });

        return {
          id: householdDoc.id,
          ...householdData,
          userRole: userMember?.role || "member",
        };
      });

    console.log("Final households result:", households);
    return households;
  } catch (error) {
    console.error("Error fetching households:", error);
    throw error;
  }
}
