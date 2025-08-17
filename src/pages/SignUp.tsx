import Modal from "../components/Modal";
import { useState, useRef } from "react";
import LoginForm from "../components/LoginForm";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

import { createUserWithEmailAndPassword } from "firebase/auth";
interface SignUpProps {
  onClose: () => void;
}

const SignUp = ({ onClose }: SignUpProps) => {
  const [loginForm, setLoginForm] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rePasswordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const rePassword = rePasswordRef.current?.value;

    console.log("entered data", name, email, password, rePassword);

    if (!name || !email || !password || !rePassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== rePassword) {
      return alert("Passwords do not match");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: new Date(),
        cart:[]
      });

      alert("User registered successfully!");
      setLoginForm(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleLogin = () => {
    setLoginForm(true);
  };
  return (
    <div>
      {!loginForm && (
        <Modal onClose={onClose}>
          <form onSubmit={handleSubmit}>
            <input type="name" placeholder="enter your name" ref={nameRef} />
            <input type="email" placeholder="enter your email" ref={emailRef} />
            <input
              type="password"
              placeholder="enter your password"
              ref={passwordRef}
            />
            <input
              type="password"
              placeholder="Re-enter your password"
              ref={rePasswordRef}
            />
            <button type="submit">sign up</button>
          </form>
          <h4>already registerd?</h4>
          <button onClick={toggleLogin}>click here to login</button>
        </Modal>
      )}
      {loginForm && <LoginForm onClose={onClose}></LoginForm>}
    </div>
  );
};

export default SignUp;
