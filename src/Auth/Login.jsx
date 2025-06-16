import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

const Login = () => {
     const provider = new GoogleAuthProvider();

     const [error, setError] = useState("");
     const [passwords, setPasswords] = useState(false);
     const { handlesignIn, setUser, handleGoogleRegister } = useContext(AuthContext);

     const Navigate = useNavigate();

     const location = useLocation();

     const handleEye = () => {
          setPasswords(!passwords);
     }


     const handleLogin = (e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;

          if (password.length < 6) {
               setError("password must have 6 digit")
          }

          handlesignIn(email, password).then(result => {
               setUser(result.user);
               setTimeout(() => {
                    toast.success(`✅ ${result.user.displayName} your Login successfull`);
               }, 300);
               Navigate(`${location.state ? location.state : '/'}`);
          }).catch(error => {
               setError(error.code);
          })
     }

     const handleRegisterGoogle = () => {
          handleGoogleRegister(provider).then(result => {
               setUser(result.user);
               // console.log(result)
               setTimeout(() => {
                    toast.success(`✅ ${result.user.displayName} your Login successfull`);
               }, 300)
               Navigate(`${location.state ? location.state : '/'}`);
          }).catch(error => setError(error.message));
     }
     return (
          <div>
               <Helmet>
                    <title>
                         auth/login
                    </title>
               </Helmet>
               <div className="hero bgimg min-h-screen edu-sa-hand">
                    <div className="hero-content flex-col w-11/12 mx-auto lg:flex-row-reverse">
                         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                              <div className="card-body">
                                   <h1 className="text-3xl font-semibold text-indigo-950">Login Our BrainBand</h1>
                                   <form onSubmit={handleLogin} className="fieldset">
                                        <label className="label">Email</label>
                                        <input type="email" className="input w-full" name='email' placeholder="Email" />
                                        <label className="label">Password</label>
                                        <div className='relative'>
                                             <input required type={passwords ? 'text' : 'password'} className="input w-full" name='password' placeholder="Password" />
                                             <p onClick={handleEye} className='absolute top-[4px] right-[15px] bg-[#a6b8ef] text-white rounded-full p-2 z-10'>{passwords ?<LuEyeClosed /> : <FaEye /> }</p>
                                        </div>
                                        <div><a className="link link-hover">Forgot password?</a></div>
                                        <div id="or-separator" className="or-separator mt-4 snapple-seperator">
                                             <span className="or-text">or</span>
                                        </div>
                                        <button onClick={handleRegisterGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                             <svg aria-label="Google logo" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                             Login with Google
                                        </button>
                                        <p className='text-error text-xs font-semibold'>{error}</p>
                                        <button className="btn bg-[#342995] btn-neutral mt-4">Login</button>
                                        <p className='font-semibold text-center mt-4'>Don't Have An Account? <Link className='text-[#342995]' to='/auth/register'>Register</Link></p>

                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Login;