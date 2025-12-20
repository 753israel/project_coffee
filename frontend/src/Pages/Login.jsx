import { useState } from "react";

function Login(){
    const [user,setUser] = useState({email:'',password:''})

    const onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setUser({...user,[name]:value })
    }
    const onSubmit = (event) =>{
      event.preventDefault()  
      console.log(user)
    }
    return(
        <form onSubmit={onSubmit}>
            <label htmlFor="email">מייל:</label>
            <input type="email" required name='email' onChange={onChange} placeholder="Enter your email" style={{direction:'ltr'}}/>
            <label htmlFor="fullName">סיסמא:</label>
            <input type="password" required name='password' onChange={onChange} placeholder="Enter your password"style={{direction:'rtl'}}/>
            <button>LOGIN</button>
        </form>
    )
}


export default Login;  