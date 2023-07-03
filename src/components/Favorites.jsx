import { useContext } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { UserContext } from '../App';

export default function Favorites() {
const [user, setUser] = useContext(UserContext)

    return(
        <>
             <div className="right-align">
                    <HeartFill className="hover-heart"/>
            </div>
        </>
    )
}