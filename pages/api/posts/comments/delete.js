import { doc, deleteDoc } from 'firebase/firestore'
import { database } from '../../../../database'

export default async function postComment({body}, res) {
    // console.log(body.data.commentID)
    await deleteDoc(doc(database, 'comments', body.data.commentID))
    return res.status(200).json({ message: 'comment deleted' })
}


