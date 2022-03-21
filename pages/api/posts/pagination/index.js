import { collection, docs, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { database } from '../../../../database'

export default async function pagination(req, res) {
    let pagesSnaptshot
    if (req.query.name) {
        const postsConsult = query(collection(database, "posts"), where("title", "==", req.query.name))
        pagesSnaptshot = await getDocs(postsConsult)
    } else if (req.query.category) {
        const postsConsult = query(collection(database, "posts"), where("category", "==", req.query.category))
        pagesSnaptshot = await getDocs(postsConsult)
    } else if(req.query.highlight){
        const postsConsult = query(collection(database,"posts"),where("highlight","==",true))
        pagesSnaptshot = await getDocs(postsConsult)
    } else {
        const postsConsult = collection(database, "posts")
        pagesSnaptshot = await getDocs(postsConsult)
    }
    
    const pages = Math.ceil(pagesSnaptshot.size / 10) 

    return res.json(pages)
}