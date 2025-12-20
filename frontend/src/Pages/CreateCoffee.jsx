import { useState } from "react";

function CreateCoffee() {


    const [coffee, setCoffee] = useState({ name: "", description: "", price: "", image: null})


    const onChange = (event) => {
        const name = event.target.name;
           if (name === "image") {
            const file = event.target.files[0];
            setCoffee({ ...coffee, image: file });
            console.log(coffee)
        } else {
            const value = event.target.value;
            setCoffee({ ...coffee, [name]: value });
             console.log(coffee)
        }
    };



    



    const onSubmit = (event) => {
        event.preventDefault()

    }





    return (

        <form onSubmit={onSubmit}>
            <div>
                <input type="text" required name="name" value={coffee.name} onChange={onChange} placeholder="coffee name" />
            </div>
            <div>
                <input type="number" required name="price" value={coffee.price} onChange={onChange} placeholder="Price" style={{ direction: 'rtl' }}/>
            </div>
            <div>
                <textarea required name="description" value={coffee.description} onChange={onChange} placeholder="coffee description" style={{ direction: 'rtl' }}></textarea>
            </div>
            <input type="file" name="image" onChange={onChange} />
            <br />
            <button>Register</button>
        </form>



    )



}


export default CreateCoffee;