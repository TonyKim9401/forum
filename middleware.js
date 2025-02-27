import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  /*
  console.log(request.nextUrl);
  console.log(request.cookies);
  console.log(request.headers);

  NextResponse.next() // pass
  NextResponse.redirect() // redirect to other pages
  NextResponse.rewrite() // move to other pages with same URL
  */
  /* handling cookies
  request.cookies.get('cookieName')  // print
  request.cookies.has('cookieName')  // check exists
  request.cookies.delete('cookieName')  // delete
  
  const response = NextResponse.next()
  response.cookies.set({
    name: 'mode',
    value: 'dark',
    maxAge: 3600,
    httpOnly : true
  })  
  return response  // create cookie

  const session = await getToken({ req: request });

  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      return NextResponse.redirect("http://localhost:3000/api/auth/signin");
    }
  }

  if (request.nextUrl.pathname.startsWith("/list")) {
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }
  */
}
