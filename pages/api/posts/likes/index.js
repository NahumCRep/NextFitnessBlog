import { collection, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { database } from '../../../../database'

export default async function likes({ method, body }, res) {
    const postRef = doc(database, "posts", body.post);

    if (body.replace) {
        if (body.option == 'like') {
            await updateDoc(postRef, {
                likes: arrayUnion(body.user)
            });
            await updateDoc(postRef, {
                dislikes: arrayRemove(body.user)
            });
        } else {
            await updateDoc(postRef, {
                dislikes: arrayUnion(body.user)
            });
            await updateDoc(postRef, {
                likes: arrayRemove(body.user)
            });
        }
    } else {
        if (body.option == 'like') {
            await updateDoc(postRef, {
                likes: arrayUnion(body.user)
            });
        } else {
            await updateDoc(postRef, {
                dislikes: arrayUnion(body.user)
            });
        }
    }
    return res.json({ message: "Rate Added" })
}