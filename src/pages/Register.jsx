import React, { useEffect, useState } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import FadeLoader from 'react-spinners/FadeLoader';
import { useNavigate, Link } from 'react-router-dom'; // Use Link for navigation
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { customer_register, messageClear } from '../store/reducers/authReducer';
// import axios from 'axios'; // Import axios for HTTP requests

const Register = () => {
  const navigate = useNavigate();
  const { loader, successMessage, errorMessage, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  // inputHandle function is now used
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };

  
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate('/');
    }
  }, [successMessage, errorMessage, userInfo, navigate, dispatch]);

  return (
    <div>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}
      <Headers />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">Register</h2>
              <div>
                <form onSubmit={register} className="text-slate-600">
                  <input
                    type="text"
                    name="name"
                    value={state.name}
                     className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                    onChange={inputHandle} // Now inputHandle is used
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                     className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                    onChange={inputHandle} // Now inputHandle is used
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                     className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                    onChange={inputHandle} // Now inputHandle is used
                    placeholder="Password"
                  />
                  <button className="px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md">
                    Register
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                  <span className="px-3 text-slate-600">or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                </div>
                
                {/* Link to login page */}
                <p className="text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Log in here
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full h-full py-4 pr-4">
              <img
                className="w-full h-[95%]"
                src="http://localhost:3000/images/login.jpg"
                alt="Login"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
