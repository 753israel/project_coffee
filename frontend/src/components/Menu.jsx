import { Link } from "react-router-dom";



function Menu(){

    return(
        <div style={{width:'100%',display:'flex',gap:'5%',justifyContent:"flex-start"}}>
           <Link to="/"><img src="/coffee_logo.png" alt="logo" style={{width:'10%',borderRadius:'10px'}}/></Link>
            <Link to='/coffee'>הקפה שלנו</Link>
            <Link to='/search'>חיפוש קפה</Link>
            <Link to='coffee/new'>הוספת קפה</Link>
            <Link to='/login'>כניסה</Link>
            <Link to='/register'>רישום</Link>
            <Link to='/logout'>יציאה</Link>
        </div>
    )
}

export default Menu;