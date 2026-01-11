import { useState } from "react";

function Register() {
  

  const [user, setUser] = useState({name:'',phone:'',email:'',password:'',role:'regular',role_password:''});
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');


  const onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    
    if (name === "password2") {
      setPassword2(value);
    } else {
    setUser({...user , [name]:value})

  }

  }

  const onSubmit = (event) =>{
    event.preventDefault() 
     if (user.password !== password2) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    setError("");
    console.log("User registered:", user);
 
 
      console.log(user)

  }
 

  return (
   
    <form onSubmit={onSubmit}>
        <input type="text" required name="name"  value={user.name} onChange={onChange} placeholder="Enter your name"/>
        <input type="tel" required name="phone" value={user.phone} onChange={onChange} placeholder="Enter your phone" style={{direction:'rtl'}}/>
        <input type="email" required name="email" value={user.email} onChange={onChange} placeholder="Enter your email" style={{direction:'rtl'}}/>
        <input type="password" required name="password" value={user.password} onChange={onChange} placeholder="Enter your password" style={{direction:'rtl'}}/>
        <input type="password" required name="password2" value={password2} onChange={onChange} placeholder="Confirm your password" style={{ direction: 'rtl' }} />
        <input type="role_password" required name="role_password" value={user.role_password} onChange={onChange} placeholder="Confirm your role_password" style={{ direction: 'rtl' }} />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <br />
        <label htmlFor="regular">משתמש רגיל</label><input type="radio" name="role" id="regular" value="regular" onChange={onChange}/>
        <label htmlFor="admin">מנהל</label><input type="radio" name="role" id="admin" value="admin" onChange={onChange}/>
         <br />
        <button>Register</button>
    </form>



  )



}


export default Register;