import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "./helper/get-user-role";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const driveID = path.split("/")[2];
  // const isManagerOnlyPage :boolean = path === "/dashboard" || path === `/drive/${driveID}/registrations` || path === '/create/drive' || path === "/candidates"
  const isManagerOnlyPage = [
    "/dashboard",
    `/drive/${driveID}/registrations`,
    "/create/drive",
    "/candidates",
  ].includes(path);
  const accessToken: string = request.cookies.get("accessToken")?.value || "";
  if (!isManagerOnlyPage) {
    return NextResponse.next();
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
  matcher: ["/dashboard", "/drive/(.*)", "/create/drive", "/candidates"],
};
