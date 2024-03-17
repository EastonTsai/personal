
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDHNtx_t0NiCvmuVfBfh6ut6MitvZpHd6o",
  authDomain: "personal-easton.firebaseapp.com",
  projectId: "personal-easton",
  storageBucket: "personal-easton.appspot.com",
  messagingSenderId: "411470811857",
  appId: "1:411470811857:web:175771b45cb04dd3b46bf0"
};

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
const storage = firebase.storage()

export const getOneDatabase = async (collection: string, doc: string) => {
  const res = await db.collection(collection).doc(doc).get()
  if (res) {
    return res.data()
  }
}
export const getDatabase = async (collection: string) => {
  const res = await db.collection(collection).get()
  if (res) {
    const data = res.docs.map(doc => {
      const docId = doc.id
      const docData = doc.data()
      docData.id = docId
      return docData
    }
    )
    return data
  }
}
export const addDatabase = async (
  imageUrl: string,
  link: string,
  title: string,
  introduce: string,
  features: string[],
  technology: string[],
) => {
  try {
    const doc = await db.collection('portfolio').add(
      {
        imageUrl,
        link,
        title,
        introduce,
        features,
        technology
      }
    )
    if (doc) {
      return doc.id
    }
  }
  catch (err) { console.log('error', err) }
}

interface portfolioType {
  imageUrl: string | undefined,
  link: string,
  title: string,
  introduce: string,
  features: string[],
  technology: string[]
}
export const editDatabase = async (collection: string, id: string, data: portfolioType
) => {
  try {
    await db.collection(collection).doc(id).set(data)
  }
  catch (err) {
    console.log('error', err)
  }

}

export const setDatabase = (
  name: string,
  state: string,
  current: string,
  introduction: string,
) => {
  try {
    db.collection('personal').doc('easton').set({
      name,
      state,
      current,
      introduction,
    })
    return true
  }
  catch (err) { console.log(err) }
}
export const upLoadStorage = async (file: File) => {
  const ref = storage.ref('portfolio-images/' + file.name)
  try {
    const res = await ref.put(file)
    if (res) {
      const imageUrl = await ref.getDownloadURL()
      return imageUrl
    }
  }
  catch (err) { console.log('error :', err) }
}

export default firebase;