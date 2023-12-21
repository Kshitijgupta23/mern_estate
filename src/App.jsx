import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, About, Profile, SignIn, SignOut} from "./Pages";
import Header from "./Components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/profile" element={<Profile />}/>
        <Route exact path="/sign-in" element={<SignIn />}/>
        <Route exact path="/sign-out" element={<SignOut />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;