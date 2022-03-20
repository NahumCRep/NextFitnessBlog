import { collection, getDocs, docs, where, query, orderBy, limit, startAfter } from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req, res) {
    let posts = []
    let lastVisible
    if (req.query.page) {
        const postsConsult = query(collection(database, "posts"), orderBy('date', 'desc'), limit(10))
        const snaptshot = await getDocs(postsConsult)
        snaptshot.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id })
        })
        lastVisible = snaptshot.docs[snaptshot.docs.length - 1];
    } else {
        const postsConsult = collection(database, 'posts')
        const docs = await getDocs(postsConsult)
        docs.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id })
        })
    }
    return res.json(posts)
}