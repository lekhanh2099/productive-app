import { User } from "@/components/header/User";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
 const session = await getAuthSession();

 return (
  <div>
   {session ? (
    <User
     profileImage={session?.user.image}
     username={session.user.username!}
     email={session.user.email!}
    />
   ) : (
    <>This is homepage</>
   )}
  </div>
 );
}
