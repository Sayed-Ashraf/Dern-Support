import {jwtDecode} from "jwt-decode";
import Navbar from "../../Components/Navbar/Navbar";
import { AvatarImage, AvatarFallback, Avatar } from "../../Components/ui/avatar";
import { Button } from "../../Components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    if (token && typeof token === 'string') {
        try {
            var userData = jwtDecode(token); // Decode only if token is a string
            // Use userData here
        } catch (error) {
            console.error('Error decoding token:', error);
            // Handle decoding error (e.g., invalid token format)
        }
    } else {
        console.warn('No token found or invalid token type');
        // Handle the case where there's no token or it's not a string
    }

    const getFeedbacks = () => {
        axios.get("http://localhost:5010/feedbacks")
            .then(res => {
                setFeedbacks(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const getUsers = () => {
        axios.get("http://localhost:5010/users")
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        getFeedbacks();
        getUsers();
    }, []);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(word => word[0]).join('');
    };

    return (
        <>
            <Navbar />
            <section className="container mx-auto py-12 px-4 md:px-6 lg:py-16">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        feedbacks && feedbacks.map(feedback => {
                            const user = users.find(user => user.id === feedback.user_id);
                            return (
                                <div key={feedback.id} className="flex flex-col flex-wrap rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 w-auto">
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage alt="User Avatar" src={user?.avatar || "/placeholder-avatar.jpg"} />
                                            <AvatarFallback>{getInitials(user?.username)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="text-lg font-medium">{user?.username || 'Unknown User'}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 ">{feedback.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <div className="fixed bottom-6 right-6">
                <Button className="btn btn-dark" variant="primary">
                    <Link to={"/addFeedback"}>Add Feedback <span style={{ fontWeight: 800, fontSize: "20px", paddingLeft: "10px" }}>+</span></Link>
                </Button>
            </div>
        </>
    )
}
