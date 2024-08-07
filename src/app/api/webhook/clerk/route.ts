import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // TODO: use ENUMS for data.type
  if (body.object === "event" && body.type === "user.created") {
    const keyMap: Record<string, string> = {
      firstName: "first_name",
      lastName: "last_name",
      avatar: "profile_image_url",
      clerkId: "id",
    };

    const userData: Record<string, string> = {};
    Object.entries(keyMap).forEach(([key, value]) => {
      userData[key] = body.data[value];
    });

    const { email_addresses, primary_email_address_id } = body.data;

    userData.email = Array.isArray(email_addresses)
      ? email_addresses.find(
          (emailData: any) => emailData.id === primary_email_address_id
        )?.email_address || null
      : null;

    // TODO: save to db
    console.log("User to add to the database");
    console.log(userData);
  } else if (body.object === "event" && body.type === "user.deleted") {
    const { id: userIdToDelete } = body.data;

    // TODO: delete user from db
    console.log(`User ID to delete: ${userIdToDelete}`);
  }

  return NextResponse.json({ message: "ok" });
}
