import { authOptions } from '@/auth/authOptions';


import NextAuth from "next-auth";


// export async function isAdmin() {
//     const session = await getServerSession(authOptions);
//     const userEmail = session?.user?.email;
//     if (!userEmail) {
//         return false;
//     }
//     const userInfo = await UserInfo.findOne({ email: userEmail });
//     if (!userInfo) {
//         return false;
//     }
//     return userInfo.admin;
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }