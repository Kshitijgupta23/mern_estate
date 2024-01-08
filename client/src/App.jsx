import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, About, Profile, SignIn, SignUp, CreateListing, UpdateListing, Listing} from "./Pages";
import Header from "./Components/Header";
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route  path="/sign-in" element={<SignIn />}/>
        <Route  path="/sign-up" element={<SignUp />}/>
        <Route  path="/about" element={<About />}/>
        <Route  path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
        <Route  path="/profile" element={<Profile />}/>
        <Route  path="/create-listing" element={<CreateListing />}/>
        <Route  path="/update-listing/:listingId" element={<UpdateListing />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;