import User from "@/app/api/models/User/User";
import { NextResponse, NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// const secret = "aniket";

export const POST = async (request: NextRequest, response: Response) => {
  try {
    const reqBody = await request.json();
    const { formData } = reqBody;
    console.log("log request body", formData);
    const email = formData.email;
    const password = formData.password;

    console.log("email password in login ", email, password);

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User does not exist" }, { status: 400 });
    }

    const providedPassword = password;
    const storedPassword = existingUser.password;
    let verify = false;

    const verified = await bcrypt.compare(providedPassword, storedPassword).then((res) => (verify = res));

    if (!verify) {
      return NextResponse.json({ message: "Incorrect password", success: false }, { status: 400 });
    }

    if (existingUser.role !== "admin") {
      return NextResponse.json({ message: "Access denied. Only admin can log in." }, { status: 403 });
    }

    // console.log(existingUser);
    

    // const authtoken = jwt.sign({ id: existingUser.id }, secret);
    const user = await User.findOne({ email }).select("-password").select("-role");
    console.log(user);

    return NextResponse.json({ existingUser, success: true}, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
