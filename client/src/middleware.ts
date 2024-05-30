import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "./helper/get-user-role";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const driveID = path.split("/")[2];

  const isManagerOnlyPage =
    ["/dashboard", `/drive/${driveID}/registrations`, "/candidates"].includes(path) || path.startsWith("/create");
  const accessToken: string = request.cookies.get("accessToken")?.value || "";
  const isMentorOnlyPage =
    path.startsWith("/mentees") || path.startsWith("/verify");

  if (!isManagerOnlyPage && !isMentorOnlyPage) {
    return NextResponse.next();
  }
  if (isMentorOnlyPage && accessToken) {
    const userRole = await getUserRole(accessToken);
    if (userRole !== 2) {
      return NextResponse.redirect(new URL("/404", request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (isManagerOnlyPage && accessToken) {
    const userRole = await getUserRole(accessToken);
    if (userRole !== 3) {
      // un comment this if you want to just send the unauthorized messsage and not redirected to 404 page

      // return NextResponse.json(
      //   { message: "Unauthorized Access" },
      //   { status: 401 }
      // );

      return NextResponse.redirect(new URL("/404", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/drive/(.*)",
    "/create/(.*)",
    "/candidates",
    "/mentees",
    "/verify/(.*)",
  ],
};
