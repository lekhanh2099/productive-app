import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["vi", "en"];
const publicPages = ["/", "/sign-in", "/sign-up"];

const intlMiddleware = createMiddleware({
 locales,
 defaultLocale: "en",
});

export default function middleware(req: NextRequest) {
 const publicPathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
  "i"
 );
 const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

 return intlMiddleware(req);
}

export const config = {
 matcher: ["/((?!api|_next|.*\\..*).*)"],
};
