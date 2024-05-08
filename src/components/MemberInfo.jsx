// import { Form, Col, Row } from "react-bootstrap";
// import { useContext, useState } from "react";
// import { UserContext } from "../App";
// import { useNavigate } from "react-router-dom";

export default function MemberInfo() {
  //   const [user, setUser] = useContext(UserContext)
  //   const [name, setname] = useState(user?.name || '')
  //   const [lastName, setLastName] = useState(user?.lastName || '')
  //   const [bio, setBio] = useState(user?.bio || '')
  //   const [location, setLocation] = useState(user?.location || '')
  //   const [category, setCategory] = useState(user?.category || '')
  //   const [skills, setSkills] = useState(user?.skills || [])
  //   const [required, setRequired] = useState(false)
  //   const navigate = useNavigate()
  // const array = ["Technology", "Contruction", "Healthcare", "Aviation", "Fashion", "Automotive"]
  // const handleBioChange = (event) => {
  //   const words = event.target.value.split(' ');
  //   if (words.length <= 100) {
  //     setBio(event.target.value);
  //   } else {
  //     const shortenedBio = words.slice(0, 100).join(' ');
  //     setBio(shortenedBio);
  //     alert('Bio must be less than 100 words')
  //   }
  // };
  // const handleUpdateUser = (e) => {
  //     e.preventDefault();
  //     if (!name || !lastName || !bio || !location || !category) {
  //         alert('Please fill out all required fields');
  //         setRequired(true);
  //         return;
  //     }
  //     const updatedFields = {};
  //     if (name) {
  //       updatedFields.name = name;
  //     }
  //     if (lastName) {
  //       updatedFields.lastName = lastName;
  //     }
  //     if (bio) {
  //       updatedFields.bio = bio;
  //     }
  //     if (location) {
  //       updatedFields.location = location;
  //     }
  //     if (category) {
  //       updatedFields.category = category;
  //     }
  //     if (skills) {
  //       updatedFields.skills = skills;
  //     }
  //     fetch(`https://boepartners-api.web.app/api/users`, {
  //       method: "PATCH",
  //       headers: {
  //         'Authorization': `Bearer ${user?.token}`,
  //         'Content-Type': "application/json"
  //       },
  //       body: JSON.stringify(updatedFields),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         if (data.message) {
  //           alert(data.message);
  //           return;
  //         }
  //         setUser(data);
  //         localStorage.setItem("user", JSON.stringify(data))
  //       })
  //       .catch(alert);
  //       navigate('/profile')
  //   };
  // const handleCheckboxChange = (event) => {
  //   if (event.target.checked) {
  //       setSkills([...skills, event.target.value]);
  //   } else {
  //       setSkills(skills.filter(skill => skill !== event.target.value));
  //   }
  // };
  //   return (
  //     <Form className="form-account" onSubmit={handleUpdateUser}>
  //       <Form.Group className="mb-3">
  //         <div className= {!name && required? "text-danger" : "text-muted"}>Required*</div>
  //         <Form.Control type="text" value={name}  placeholder="name"
  //         onChange={(e) => {setname(e.target.value)}} className="me-2 mb-2"/>
  //         <div className={!lastName && required? "text-danger" : "text-muted"}>Required*</div>
  //         <Form.Control type="text" value={lastName} placeholder="Lastname"
  //         onChange={(e) => {setLastName(e.target.value)}} className="mb-2"/>
  //         <div className={!bio && required? "text-danger" : "text-muted"}>Required*</div>
  //         <Form.Control as="textarea" rows={3} placeholder="Tell us about yourself..."
  //         onChange={handleBioChange} value={bio} className="mb-2" />
  //         <div className={!location && required? "text-danger" : "text-muted"}>Required*</div>
  //         <Form.Select
  //             aria-label="Default select example"
  //             className="mb-5"
  //             onChange={(e) => setLocation(e.target.value)}
  //             value={location}>
  //                 <option value="">Select location</option>
  //                 <option value="Miami Dade">Miami Dade</option>
  //                 <option value="Broward">Broward</option>
  //                 <option value="Palm Beach">Palm Beach</option>
  //         </Form.Select>
  //         Select the reason that best describes why you're creating a BOE account:
  //         <div className={!category && required? "text-danger" : "text-muted"}>Required*</div>
  //         <Form.Select
  //           aria-label="Default select example"
  //           onChange={(e) => setCategory(e.target.value)}
  //           className="mb-4"
  //           value={category}>
  //               <option value="">Select category</option>
  //               <option value="Actively seeking a job">Actively seeking a job</option>
  //               <option value="Friend or family member actively seeking a job">Friend or family member actively seeking a job</option>
  //               <option value="Work at a non-profit, school, or any organization that helps with job placement">Work at a non-profit, school, or any organization that helps with job placement</option>
  //               <option value="Just browsing">Just browsing</option>
  //         </Form.Select>
  //         Areas of interest:
  //         <Row>
  //         {array.map((type, index) => (
  //           <Col xs={4} key={index}>
  //             <Form.Check
  //               className="m-2"
  //               inline
  //               label={type}
  //               name="group1"
  //               type="checkbox"
  //               id={`inline-checkbox-${index}`}
  //               value={type}
  //               onChange={handleCheckboxChange}
  //               checked={skills.includes(type)}
  //             />
  //           </Col>
  //         ))}
  //         </Row>
  //     </Form.Group>
  //     <button className="button-class" type="submit">
  //         <strong>Submit</strong>
  //     </button>
  //     </Form>
  //   )
}
