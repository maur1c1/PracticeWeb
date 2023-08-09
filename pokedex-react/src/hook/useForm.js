import { useState } from "react";

export const useForm = (initialForm = {})=> {

const [formState, setFormState] = useState(initialForm);

const onInputChange = ({target}) => { //destructuring of a event

    const {name, value} = target;  //destructuring of the target
    
    setFormState({
        ...formState, //destructuring all of my initial state
        [name]: value,   //then make a property computing wtih value
    });
};

    const onResetForm = () => {
        setFormState(initialForm) // put only by defect // that restart
    };

    return {
        ...formState, // rotarnamos todos los componentes del formState
        formState, // lo desestructuro y lo mando completo
        onInputChange,
        onResetForm,
    };
};

