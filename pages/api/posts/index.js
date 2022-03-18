import { collection, getDocs, where, query } from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req, res) {
    let posts = []
    if (req.query.page) {
        const postsConsult = query(collection(database,"posts"),where("page","==",parseInt(req.query.page)))
        const docs = await getDocs(postsConsult)
        docs.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id })
        })
    }else{
        const postsConsult = collection(database, 'posts')
        const docs = await getDocs(postsConsult)
        docs.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id })
        })
    }
    return res.json(posts)
}