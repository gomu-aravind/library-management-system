export default function ValidateRegister({name,email,password,confirmPassword}){
    let newErrors={}
    let valid=true;
    if(name.trim()===''){
        newErrors={
            ...newErrors,
            name:'Enter the name'
        }
        valid=false;
    }
    
  
    if(email.trim()==='' || !emailValidator(email.trim())){
        newErrors={
            ...newErrors,
            email:'Enter a valid email'
        }
        valid=false;
    }
    
    if(password.trim()===''){
        newErrors={
            ...newErrors,
            password:'Enter the password'
        }
        valid=false;
    }
    if(confirmPassword.trim()===''){
        newErrors={
            ...newErrors,
            confirmPassword:'Enter the confirm password'
        }
        valid=false;
    }
    if(password!==confirmPassword){
        newErrors={
            ...newErrors,
            confirmPassword:"Password doesn't match"
        }
        valid=false;
    }

    return {
        newErrors,
        valid
    };

}

export function ValidateLogin({email,password}){
    let newErrors={}
    let valid=true;
    if(email.trim()==='' || !emailValidator(email.trim())){
        newErrors={
            ...newErrors,
            email:'Enter a valid email'
        }
        valid=false;
    }
    
    if(password.trim()===''){
        newErrors={
            ...newErrors,
            password:'Enter the password'
        }
        valid=false;
    }
    return {
        newErrors,
        valid
    };
}

export function emailValidator(value){
    const  emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
    if(emailRegex.test(value)){
        return true;
    }else{
        return false;
    }
}