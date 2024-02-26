import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signup Success:", userCredential.user);
            const userDocRef = doc(db, "users", userCredential.user.uid);

            await setDoc(userDocRef, {
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: role,
                status: role === "instructor" ? "pending" : "approved",
                id: userCredential.user.uid
            });

            // For instructors, check the status
            if (role === "instructor") {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists() && docSnap.data().status === "pending") {
                    alert("Your sign up as an instructor is pending approval. You will be notified once your account has been reviewed.");
                    navigate('/pending-approval');
                } else {
                    navigate('/dashboard');
                }
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.message); // Show error message to the user
        }
    };

    return (
        <div className="font-mono">
            <header className="bg-indigo-300 p-0 py-5">
                <div className="container flex justify-center items-center max-w-full">
                    <Link to="/home">
                        <div className="flex items-center">
                            <img src="/logo.png" alt="Logo" className="h-12 w-auto mr-2" />
                            <h1 className="text-3xl font-bold text-black font-mono">ONLINE OFFICE HOURS</h1>
                        </div>
                    </Link>
                </div>
            </header>
            <div className="flex justify-center mt-6 p-10 pb-4 ">
                <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg bg-indigo-200">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                        <div className="flex items-center">
                            <input
                                className="mr-2 leading-tight"
                                type="radio"
                                value="student"
                                name="role"
                                checked={role === "student"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label className="text-sm" htmlFor="student">Student</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="mr-2 leading-tight"
                                type="radio"
                                value="instructor"
                                name="role"
                                checked={role === "instructor"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label className="text-sm" htmlFor="instructor">Instructor</label>
                        </div>
                    </div>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="flex justify-center">
                Already have an account? <Link to="/login" className="font-semibold text-indigo-500 hover:underline ml-2 mr-2">Log in</Link> here!
            </div>
        </div>
    );
};

export default Signup;
