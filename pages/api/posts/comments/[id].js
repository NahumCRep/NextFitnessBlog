import { collection, getDocs, where, query, orderBy } from 'firebase/firestore'
import { database } from '../../../../database'

export default async function create(req, res) {

    const commentsConsult = query(collection(database, "comments"), where("post", "==", req.query.id))
    const docs = await getDocs(commentsConsult)
    const commentsData = []
    docs.forEach(doc => {
        commentsData.push({ ...doc.data(), id: doc.id })
    })

    res.json(commentsData)
}