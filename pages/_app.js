import '@/styles/globals.css'
import Sidebar from '../components/Sidebar'
import Login from '../components/Login'
import {useEffect} from 'react'
import Loading from '../components/Loading'
import { auth,db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);

  useEffect(()=>{
    window.addEventListener('beforeunload', function(e) {
      let confirmationMessage = "Do You Want To Leave?";
      (e || window.event).returnValue = confirmationMessage;
      if (user) {
        setDoc(doc(db, "users", user?.uid), {
          name: user?.displayName,
          email: user?.email,
          imageURL: user?.photoURL,
          online: false,
          lastSeen : serverTimestamp(),
        }, {merge: true});
       }
    })
     if (user) {
      setDoc(doc(db, "users", user?.uid), {
        name: user?.displayName,
        email: user?.email,
        imageURL: user?.photoURL,
        online: true,
        lastSeen : serverTimestamp(),
      }, {merge: true});
     }
  })

  if (loading) return <Loading />
  if (!user) return <Login />
  return (
    <div className='flex'>
      <Sidebar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
