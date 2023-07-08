import { useContext, useState, useEffect } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { UserContext } from '../App';
import SignModal from './SignModal';
import { useNavigate } from 'react-router-dom';

export default function Favorites({school, program}) {
const [user, setUser] = useContext(UserContext)
const [isLiked, setIsLiked] = useState(false)

const navigate = useNavigate()

useEffect(() => {
    if (user) {
        fetch(`http://localhost:3000/userlikes?user=${user.email}`)
            .then((response) => response.json())
            .then((data) => {
                const liked = data.some(like => like.school === school && like.program === program);
                setIsLiked(liked);
            })
            .catch(console.error);
    }
}, [user, school, program]);

const handleFavorites = () => {
    if (!user) {
        navigate('/signup');
        return;
    }
    setIsLiked(!isLiked);

    fetch("http://localhost:3000/userlikes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},   
        body: JSON.stringify({ user: user.email, school, program, is_liked: !isLiked })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message) {
            alert(data.message);
            return;
        }
    })
    .catch(console.error);
};

    return(
        <>
            <div className="right-align">
                <HeartFill className={`hover-heart ${isLiked ? "liked" : ""}`} onClick={handleFavorites} />
            </div>
        </>
    )
}