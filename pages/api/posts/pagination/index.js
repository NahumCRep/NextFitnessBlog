import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { database } from '../../../../database'

export default async function pagination({ body }, res) {
    
    const postsConsult = query(collection(database, "posts"), orderBy('date', 'desc'), limit(10))
    const snaptshot = await getDocs(postsConsult)

    const posts = []
    snaptshot.forEach(doc => {
        posts.push({ ...doc.data(), id: doc.id })
    })
    const lastVisible = snaptshot.docs[snaptshot.docs.length - 1];
    
    return res.json({posts, lastVisible})
}