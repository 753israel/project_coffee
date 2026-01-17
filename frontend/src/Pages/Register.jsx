import { useState } from "react";

// הוק מותאם אישית לניהול סטטוס קריאות API (טעינה, שגיאה, הודעות)
import useApiStatus from '../hooks/useApiStatus';

// API לרישום משתמש חדש
import userApi from '../api/userApi';
function Register() {
  

  const [user, setUser] = useState({name:'',phone:'',email:'',password:'',role:'regular',role_password:''});
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const { call,isLoading, message} = useApiStatus();

  const onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    
    if (name === "password2") {
      setPassword2(value);
    } else {
    setUser({...user , [name]:value})

  }

  }

  const onSubmit = async (event) => {
  event.preventDefault();
  console.log("SUBMIT!");
  if (user.password !== password2) {
    setError("הסיסמאות אינן תואמות");
    return;
  }

  setError("");

  const response = await call({
    callbackApi: userApi.register,
    data: user
  });

  console.log("User registered:", response);
};
 

  return (
   
    <form onSubmit={onSubmit}>
        <input type="text" required name="name"  value={user.name} onChange={onChange} placeholder="Enter your name"/>
        <input type="tel" required name="phone" value={user.phone} onChange={onChange} placeholder="Enter your phone" style={{direction:'rtl'}}/>
        <input type="email" required name="email" value={user.email} onChange={onChange} placeholder="Enter your email" style={{direction:'rtl'}}/>
        <input type="password" required name="password" value={user.password} onChange={onChange} placeholder="Enter your password" style={{direction:'rtl'}}/>
        <input type="password" required name="password2" value={password2} onChange={onChange} placeholder="Confirm your password" style={{ direction: 'rtl' }} />
        <input type="text" required name="role_password" value={user.role_password} onChange={onChange} placeholder="password company" />
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