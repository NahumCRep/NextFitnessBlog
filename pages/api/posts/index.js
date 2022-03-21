import { collection, getDocs, docs, where, query, orderBy, limit, startAfter } from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req, res) {
    let posts = []
    let firstVisible
    let lastVisible
    if (req.query.page) {
        if (req.query.page == 1) {
            const postsConsult = query(collection(database, "posts"), orderBy('date', 'desc'), limit(10))
            const snapshot = await getDocs(postsConsult)
            snapshot.forEach(doc => {
                posts.push({ ...doc.data(), id: doc.id })
            })
        }else{
            const newlimit = (parseInt(req.query.page) - 1) * 10
            const consultToGetVisible = query(collection(database, "posts"), orderBy('date', 'desc'), limit(newlimit))
            const snapshot = await getDocs(consultToGetVisible)
            const lastVisible = snapshot.docs[snapshot.docs.length-1];

            //GET Actual Page Posts
            const postsConsult = query(collection(database, "posts"), orderBy('date', 'desc'), limit(10), startAfter(lastVisible))
            const postsSnapshot = await getDocs(postsConsult)
            postsSnapshot.forEach(doc => {
                posts.push({ ...doc.data(), id: doc.id })
            })
        }
    } else {
        const postsConsult = collection(database, 'posts')
        const docs = await getDocs(postsConsult)
        docs.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id })
        })
    }
    return res.json(posts)
}