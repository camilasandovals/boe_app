import { useContext, useState } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Favorites({ program, isLiked }) {
    const [user] = useContext(UserContext);
    const [liked, setIsLiked] = useState(isLiked);
    const navigate = useNavigate();

    const handleFavorites = () => {
        if (!user) {
            navigate('/signup');
            return;
        }

        // Toggle the liked status
        setIsLiked(!liked);

        fetch("http://localhost:3001/userlikes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user?.token}`
            },   
            body: JSON.stringify({ program, isLiked: !liked })
        })
        .then((response) => response.json())
        .catch(console.error);
    };

    return (
        <div className='hover'>
            <HeartFill 
                className={`hover-heart ${liked ? "liked" : ""}`} 
                onClick={handleFavorites} 
                size={20} 
                style={{marginTop: 30}}
            />  
        </div>
    );
}
