import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {database} from "../../../database"
import {doc,getDoc,setDoc} from 'firebase/firestore'

export default NextAuth({
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),//http://localhost:3000/api/auth/callback/google
    ],
    pages:{
        signIn:"/login",
    },
    callbacks:{
        async jwt({token,account}){
            // console.log('TOKEN',token)
            // console.log("JWT",account)
            if(account?.providerAccountId){
                token.id = account.providerAccountId
                const snapshot = await getDoc(doc(database,"users",account.providerAccountId))
                if(snapshot.exists()){
                    const user = snapshot.data()
                    if(user.role){
                        token.role = user.role
                    }
                }else{
                    const snapshot = await setDoc(
                        doc(
                            database,
                            "users",
                            account.providerAccountId
                        ),
                        {
                            role:"regular",
                            id:account.providerAccountId,
                            email:token.email,
                            name:token.name,
                            picture:token.picture
                        }
                    )
                    token.role = "regular"
                }
            }
            return token
        },
        async session({ session, token, user }){
            if(token?.id && token?.role){
                session.user.id = token.id
                session.user.role = token.role
            }
            // console.log("Session",session)
            return session
        }
    }
})