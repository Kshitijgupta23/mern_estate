import {useSelector, useDispatch} from 'react-redux';
import {useRef, useState, useEffect} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import {updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/user/userSlice.js';

const Profile = () => {

  const {currentUser, loading, error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined);
  const [filePerc,setFilePerc] = useState(0);
  const [fileError,setFileError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  
  /*firebase storage
  allow read;
  allow write: if
  request.resource.size < 2*1024*1024 &&
  request.resource.contentType.matches('image/.*') */

  useEffect(() =>{
    if(file){
      handeFileUpload(file);
    }
  },[file]);

  const handeFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred /
        snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) =>{
        setFileError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        // eslint-disable-next-line no-unexpected-multiline
        ((downloadURL) => 
          setFormData({...formData, avatar: downloadURL})
        );
      }
    );
  };


  const handleChange = (e) =>{
    setFormData({... formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  return (
    <div className='p-3  max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef} 
          hidden accept='image/*'/>
          <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
          <p className='text-sm self-center'>
            {fileError ?
            (<span className='text-red-700'>Error in uploading image(Image size must be less than 2MB)
            </span>) :
            filePerc > 0 && filePerc < 100 ?(
              <span className='text-slate-700'>
                {`Uploading ${filePerc}%`}
              </span>)
              :
              filePerc === 100 ? (
                <span className='text-green-700'>
                  Image successfully uploaded
                </span>)
              :
              ""
            }
          </p>
          <input type='text' placeholder='Username'
            defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg' onChange={handleChange}/>
          <input type='text' placeholder='Email'
            defaultValue={currentUser.email} id='email'className='border p-3 rounded-lg' onChange={handleChange}/>
          <input type='password' placeholder='Password'
            id='password' className='border p-3 rounded-lg' onChange={handleChange}/>
          <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3
          uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...': 'Update'}
          </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer '>Delete account</span>
        <span className='text-red-700 cursor-pointer '>Signout</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : '' }</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User updated successfully!' : '' }</p>
    </div>
  )
}

export default Profile;