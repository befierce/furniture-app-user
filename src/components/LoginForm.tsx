import { useState, useRef } from "react";
import SignUp from "../pages/SignUp.tsx";
import Modal from "./Modal";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig.tsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../store/authSlice.tsx";
interface LoginProps {
  onClose: () => void;
}
const LoginForm = ({ onClose }: LoginProps) => {
  const [signUpForm, setSignUpForm] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const state = useSelector((state: any) => state.auth);
  console.log("current login state", state);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("Form submitted!");
    if (!email || !password) {
      alert("please fill all fields");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user credentials", userCredential);
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User profile:", docSnap.data());
        const uid = userCredential.user.uid;
        const name = docSnap.data().name;
        const email = docSnap.data().email;

        console.log("user data to dispatch", uid, name, email);
        dispatch(
          setLogin({
            uid,
            name,
            email,
          })
        );
        alert(`Welcome ${docSnap.data().name}!`);
      } else {
        console.warn("No profile found for user");
        alert("Login successful but no profile found");
      }
      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };
  const toggleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    setSignUpForm(true);
  };
  return (
    <div>
      {!signUpForm && (
        <Modal onClose={onClose}>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="enter your email" ref={emailRef} />
            <input
              type="password"
              placeholder="enter your password"
              ref={passwordRef}
            />
            <button type="submit">log in</button>
          </form>
          <h4>new user?</h4>
          <button onClick={toggleSignUp}> register here</button>
        </Modal>
      )}
      {signUpForm && <SignUp onClose={onClose}></SignUp>}
    </div>
  );
};

export default LoginForm;
