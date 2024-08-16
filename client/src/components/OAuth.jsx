import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
      
        try {
          const resultsFromGoogle = await signInWithPopup(auth, provider);
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
              email: resultsFromGoogle.user.email,
              googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            dispatch(signInSuccess(data));
            navigate('/');
          } else {
            // Log or handle non-OK responses
            console.error('Server responded with an error:', data);
          }
        } catch (error) {
          console.log('Error during Google OAuth:', error);
        }
      };
       
  return (
    <Button
    type="button"
    className="bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 ml-auto px-3 py-3"
    onClick={handleGoogleClick}
  >
    <AiFillGoogleCircle className="w-6 h-5 mr-2" />
    Continue with Google
  </Button>
  )
}