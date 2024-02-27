import { useParams, useNavigate, Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, collection , setDoc} from 'firebase/firestore';


const ClassDetails = () => {
    const { classId } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const [students, setStudents] = useState([]);
    const [teachingAssistants, setTeachingAssistants] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [instructorId, setInstructorId] = useState("");

    useEffect(() => {
        const fetchUsersDetails = async (userIds) => {
            const userDetails = await Promise.all(userIds.map(async (userId) => {
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);
                return userSnap.exists() ? { id: userId, ...userSnap.data() } : null;
            }));
            return userDetails.filter(Boolean);
        };

        const fetchClassDetailsAndUsers = async () => {
            const classRef = doc(db, 'classes', classId);
            const classSnapshot = await getDoc(classRef);

            if (classSnapshot.exists()) {
                const classData = classSnapshot.data();
                setClassDetails(classData);

                if (classData.students) {
                    const studentDetails = await fetchUsersDetails(classData.students);
                    setStudents(studentDetails);
                }
                if (classData.TAs) {
                    const taDetails = await fetchUsersDetails(classData.TAs);
                    setTeachingAssistants(taDetails);
                }

                const instructorRef = doc(db, 'users', classData.instructor);
                const instructorSnapshot = await getDoc(instructorRef);

                if (instructorSnapshot.exists()) {
                    setUser(instructorSnapshot.data());
                    setInstructorId(classData.instructor);
                }
            }
        };

        fetchClassDetailsAndUsers();
    }, [classId]);

    const promoteToTA = async (studentId) => {
        if (instructorId && auth.currentUser.uid !== instructorId) {
            alert('Only instructors can promote students to TAs.');
            return;
        }
    
        const classRef = doc(db, 'classes', classId);
        const classSnapshot = await getDoc(classRef);
    
        if (classSnapshot.exists()) {
            const studentList = classSnapshot.data().students;
            const taList = classSnapshot.data().TAs;
    
            if (studentList.includes(studentId) && !taList.includes(studentId)) {
                // Promote the student to TA by removing them from the students list and adding them to the TAs list.
                await updateDoc(classRef, {
                    students: arrayRemove(studentId),
                    TAs: arrayUnion(studentId)
                });
    
                // Add the student to the TAs subcollection within the class document.
                const taRef = collection(classRef, 'TAs');
                await setDoc(doc(taRef, studentId), {
                    // You can add any additional fields for the TA document here.
                });
    
                setStudents(studentList.filter(id => id !== studentId));
                setClassDetails({ ...classDetails, TAs: [...taList, studentId] });
                window.location.reload();
            }
        }
    };
    
    
    

    const rerouteToClassroom = (e) => {
        const TAid = e.target.value;
        navigate(`/classrooms/${classId}/${TAid}`);
    };

    useEffect(() => {
        if (classDetails) {
            setInstructorId(classDetails.instructor);
        }
    }, [classDetails]);

    return (
        <div className="font-mono">
            <header className="bg-indigo-300 p-0 py-5">
                <div className="container flex justify-between items-center max-w-full">
                    <Link to="/home">
                        <div className="flex items-center">
                            <img src="/logo.png" alt="Logo" className="h-12 w-auto mr-2 pl-10" />
                            <h1 className="text-3xl font-bold text-black font-mono">ONLINE OFFICE HOURS</h1>
                        </div>
                    </Link>
                    <div>
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mr-2 rounded"
                            onClick={() => navigate("/dashboard")}
                        >
                            Back to Dashboard
                        </button>
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mr-2 rounded"
                            onClick={() => navigate("/me")}
                        >
                            My Profile
                        </button>

                        <LogoutButton />
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">

                {classDetails && (
                    <>
                        <div className="font-mono home-container">
                            
                            {/* class name and prof */}
                            <div className="container mx-auto mt-6 bg-indigo-200 p-10 mb-6 rounded-lg shadow-lg">
                                <h1 className="text-3xl font-bold mb-4">{classDetails.className}</h1>
                                <p className="text-lg mb-4 text-gray-700">{classDetails.classDescription}</p>
                                <div className="border-t border-gray-300 pt-4">
                                    <p className="text-black font-semibold">Professor:</p>
                                    <p className="text-gray-700">{user?.email}</p>
                                </div>
                            </div>


                            {/* TAs */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4">Teaching Assistants</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {teachingAssistants.map((ta) => (
                                        <div key={ta.id} className="p-5 bg-indigo-200 rounded-lg shadow-lg flex flex-col justify-center items-center h-48 font-bold">
                                            <h2 className="text-center text-xl font-bold mb-4">{ta.firstName} {ta.lastName}</h2>
                                            <button
                                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                                value={ta.id}
                                                onClick={rerouteToClassroom}
                                            >
                                                View Classroom
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* students */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4">Students</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {students.map((student) => (
                                        <div key={student.id} className="p-5 bg-indigo-200 rounded-lg shadow-lg flex flex-col justify-center items-center">
                                            <span className="text-center text-xl font-bold mb-4">{student.firstName} {student.lastName}</span>
                                            {auth.currentUser?.uid === instructorId && (
                                                <button
                                                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => promoteToTA(student.id)}
                                                >
                                                    Promote to TA
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default ClassDetails;
