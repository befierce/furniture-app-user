import { useState, useRef } from "react";
import SignUp from "../pages/SignUp.tsx";
import Modal from "./Modal";
import { firebaseConfig } from "../firebaseConfig.tsx";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig.tsx";
// import { signInWithEmailAndPassword } from "firebase/auth";
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
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // console.log("user credentials", userCredential);
      // const user = userCredential.user;
      // const docRef = doc(db, "users", user.uid);
      // const docSnap = await getDoc(docRef);
      // console.log("docsnap", docSnap)
      // if (docSnap.exists()) {
      //   console.log("User profile:", docSnap.data());
      //   const uid = userCredential.user.uid;
      //   const name = docSnap.data().name;
      //   const email = docSnap.data().email;

      //   console.log("user data to dispatch", uid, name, email);
      //   dispatch(
      //     setLogin({
      //       uid,
      //       name,
      //       email,
      //     })
      //   );
      //   alert(`Welcome ${docSnap.data().name}!`);
      // } else {
      //   console.warn("No profile found for user");

      //   alert("no profile found");
      // }
      // onClose();
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error.message);
      }

      const logInData = await response.json();
      console.log("Login success:", logInData);
      localStorage.setItem("idToken", logInData.idToken);
      const uid = logInData.localId;
      const idToken = logInData.idToken;
      const userDocUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/users/${uid}`;

      const userDocRes = await fetch(userDocUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!userDocRes.ok) {
        alert("No profile found for user");
        return;
      }

      const userDoc = await userDocRes.json();
      console.log("User doc:", userDoc);

      const name = userDoc.fields?.name?.stringValue;
      const userEmail = userDoc.fields?.email?.stringValue;
      localStorage.setItem("refreshToken", logInData.refreshToken);
      localStorage.setItem("uid", logInData.localId);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("name", name);
      dispatch(setLogin({ uid, name, email: userEmail }));

      alert(`Welcome ${name}!`);
      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };
  const toggleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
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
