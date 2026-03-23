import { useAuthStore } from '../../store/authStore';
import { auth, facebookProvider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignupWithFacebook() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleFacebookSignup = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      const mockUser = {
        email: user.email!,
        role: 'user' as const,
        token: await user.getIdToken(),
      };
      login(mockUser);
      navigate('/home');
    } catch (err) {
      console.error('Facebook signup error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={handleFacebookSignup}
        disabled={loading}
        className="flex items-center justify-center gap-3 w-full px-6 py-3 border border-gray-300 rounded-2xl hover:shadow-md hover:border-gray-400 transition-all bg-white text-gray-700 font-medium"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Continue with Facebook
      </button>
    </div>
  );
}

