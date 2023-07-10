import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function CardBlog() {
  const [blogs, setBlogs] = useState('');

  useEffect(() => {
    fetch('https://boepartners-api.web.app/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(alert)
  }, []);


  return (
    
    <section className='blogs-container'>
      {!blogs? "Loading" : blogs.slice(0,6).map((blog) => (      
        <div key ={blog.id} className = 'card-wrapper'>
        <a href={blog.link} target='_blank'> 
        <img className = 'card-blog-image' src={blog.image} about='' />
        </a>
        <div  className='text-container'>
          <p>{blog.title}</p>
        </div>
      </div>
      ))}
    </section>

  );
}

export default CardBlog;