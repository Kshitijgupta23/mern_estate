import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailfure} from '../redux/user/userSlice.js';
import OAuth from '../Components/OAuth.jsx';


const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user,setUser] = useState({});

  const { loading, error} = useSelector((state) => state.user);

  const handleChange = (e) =>{
    setUser(
      {
        ...user,
        [e.target.id]: e.target.value
      });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(signInFailfure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }catch(error){
      dispatch(signInFailfure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7' id="register_heading">Sign In!</h1>
        <form className='flex flex-col gap-4'>
          <input type="email" placeholder='Email' 
          className='border p-3 rounded-lg' id='email' onChange={handleChange} />
          <input type="password" placeholder='********' 
          className='border p-3 rounded-lg' id='password' onChange={handleChange}  />
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg 
          uppercase hover:opacity-95 disabled:opacity-80' onClick={handleSubmit}>
          {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Do not have an account?</p>
          <Link to="/sign-up">
            <span className='text-blue-700 '>Sign Up</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}

export default SignIn;