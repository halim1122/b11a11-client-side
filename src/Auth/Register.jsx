import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
const Register = () => {

     const provider = new GoogleAuthProvider();

     const Navigate = useNavigate();

     const location =useLocation()
     
     const { setUser, handleRegister, handleGoogleRegister, upDateUser } = useContext(AuthContext);;
     const [error, setError] = useState("");
     const [passwords, setPasswords] = useState(false);


     const handleEye = () => {
          setPasswords(!passwords);
     }

     const handleRegisterUser = e => {
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form);
          const { password, email, name, photo } = Object.fromEntries(formData.entries());
          // console.log(password, email,name,photo);
          setError("");

          const errors = [];

          if (!/[A-Z]/.test(password)) {
               errors.push('⚠️ Must include at least one uppercase letter.');

          }

          if (!/[a-z]/.test(password)) {
               errors.push('⚠️ Must include at least one lowercase letter.');
          }

          if (password.length < 6) {
               errors.push('⚠️ Password must be at least 6 characters long.');
          }

          handleRegister(email, password)
               .then(result => {
                    // console.log(result.user);
                    const userinfo = result.user;
                    upDateUser({ displayName: name, photoURL: photo }).then(() => {
                         setUser({ ...userinfo, displayName: name, photoURL: photo });
                         // console.log(userinfo);
                    }).catch(() => {
                         // console.log(error);
                         setUser(userinfo);
                    });
               })
               .catch(error => {
                    setError(error.message)
               })

          if (errors.length > 0) {
               errors.forEach((err) => toast.error(err));
               return
          } else {
               setTimeout(() => {
                    toast.success(`✅ ${name} your Register successfull`);
               }, 300)
          }
          Navigate(`${location.state ? location.state : '/'}`);

     }

     const handleRegisterGoogle = () => {
          handleGoogleRegister(provider).then(result => {
               setUser(result.user);
               setTimeout(() => {
                    toast.success(`✅ ${result.user.displayName} your Register successfull`);
               }, 300)
               Navigate(`${location.state ? location.state : '/'}`);
          }).catch(error => setError(error.message));
     };

     // console.log(user);
     return (
          <div className="edu-sa-hand">
               <Helmet>
                    <title>
                         auth/register
                    </title>
               </Helmet>
               <div className="hero bgimg min-h-screen">
                    <div className="flex justify-center mt-5 w-11/12 mx-auto">
                         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                              <div className="card-body">
                                   <h1 className="text-2xl font-semibold text-indigo-950">Register Our BrainBand</h1>
                                   <form onSubmit={handleRegisterUser} className="fieldset">
                                        {/* name field */}
                                        <label className="label">Name</label>
                                        <input required type="text" className="input w-full" name='name' placeholder="Name" />
                                        {/* Email field */}
                                        <label className="label">Email</label>
                                        <input required type="email" className="input w-full" name='email' placeholder="Email" />
                                        {/* Photo url field */}
                                        <label className="label">Photo</label>
                                        <input required type="text" className="input w-full" name='photo' placeholder="Photo url" />
                                        <label className="label">Password</label>
                                        <div className='relative'>
                                             <input required type={passwords ? 'text' : 'password'} className="input w-full" name='password' placeholder="Password" />
                                             <p onClick={handleEye} className='absolute top-[4px] right-[15px] bg-[#a6b8ef] text-white rounded-full p-2 z-10'>{passwords ?<LuEyeClosed /> : <FaEye /> }</p>
                                        </div>
                                        <div id="or-separator" className="or-separator mt-6 snapple-seperator">
                                             <span className="or-text">or</span>
                                        </div>

                                        <button onClick={handleRegisterGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                             <svg aria-label="Google logo" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                             Register with Google
                                        </button>
                                        <p className='text-error text-xs font-semibold'>{error}</p>
                                        <button type='submit' className="btn bg-[#342995] btn-neutral mt-4">Register</button>
                                        <p className='font-semibold text-center mt-4'>Already Have An Account? <Link className='text-[#342995]' to='/auth/login'>Login</Link></p>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Register;