import React from 'react'; 
import "./register.styles.css"; 
import IconButton from '@material-ui/core/IconButton'; 
import Visibility from '@material-ui/icons/Visibility'; 
import VisibilityOff from '@material-ui/icons/VisibilityOff'; 
import InputAdornment from '@material-ui/core/InputAdornment'; 
import FormControl from '@material-ui/core/FormControl'; 
import InputLabel from '@material-ui/core/InputLabel'; 
import imgLogo from "../../assets/images/registericon.png"; 
import welcome from "../../assets/images/tweeterhome.png"; 
import Input from '@material-ui/core/Input'; 
import { pages } from '../../constants/strings'; 
import TextField from '@material-ui/core/TextField'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { register } from './register.helper'; 
 
export default function Register(props) { 
    const [values, setValues] = React.useState({ 
        emailId: '', 
        loginId: '', 
        firstName: '', 
        lastName: '', 
        confirmPassword: "", 
        password: '', 
        contactNumber: "", 
        showPassword: false, 
        showConfirmPassword: false, 
    }); 
    const [errorValues, setErrorValues] = React.useState({ 
        emailId: '', 
        loginId: '', 
        confirmPassword: "", 
        contactNumber: "", 
    }); 
    const handleChange = (prop) => (event) => { 
        setErrorValues({ 
            emailId: '', 
            loginId: '', 
            confirmPassword: "", 
            contactNumber: "", 
        }) 
        setValues({ ...values, [prop]: event.target.value }); 
    }; 
 
    const validateInputs = () => { 
        let allValid = true; 
        let confirmPassword = ""; 
        let emailId = ""; 
        let phoneNumber = ""; 
        if (values.confirmPassword !== values.password) { 
            confirmPassword = "Confirm Password does not match with Password" 
            allValid = false; 
        } 
        if (!/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(values.emailId)) { 
            emailId = "Email id is not valid" 
            allValid = false; 
        } 
        if (values.contactNumber.length != 10) { 
            phoneNumber = "Contact Number should be of length 10" 
            allValid = false; 
        } 
        if (!allValid) { 
            setErrorValues({ ...errorValues, confirmPassword: confirmPassword, emailId: emailId, contactNumber: phoneNumber }) 
        } 
        return allValid; 
    } 
 
    const handleClickShowPassword = () => { 
        setValues({ ...values, showPassword: !values.showPassword }); 
    }; 
    const handleClickShowConfirmPassword = () => { 
        setValues({ ...values, showPassword: !values.showConfirmPassword }); 
    }; 
    const handleMouseDownPassword = (event) => { 
        event.preventDefault(); 
    }; 
 
    const onRegisterClick = async () => { 
        if (validateInputs()) { 
            try { 
                props.showLoader("Creating User"); 
                await register(values); 
                /*
                toast.success("User Registration Sucessfull") 
                */
                props.updateSelectedPage(pages.LOGIN) 
                props.hideLoader(); 
            } catch (e) { 
                props.hideLoader(); 
                setErrorValues({ ...errorValues, loginId: "Login Id Already Exists", emailId: "Email Id Already Exists" }) 
            } 
        } 
    } 
    return ( 
        <>
            <div className={"d-flex h-100 justify-content-center "} style={{backgroundColor:'rgb(138, 161, 180',backgroundRepeat:"no-repeat",backgroundSize:"cover" }}> 
            <div style={{ width: "50%", maxWidth: 400,marginLeft:20,marginRight:80,marginBottom:80,marginTop:100}}> 
                    <img src={welcome} height={370} width={405} style={{marginLeft:'-15%',marginTop:'7%',marginRight:32}}/> 
                </div> 
                <div style={{ width: "50%", maxWidth: 1000,marginTop:'5%' }}> 
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => { props.updateSelectedPage(pages.LOGIN) }}> 
                        <img src={imgLogo} height={50} width={50} style={{ border:"4px solid blue", borderRadius:"50%", backgroundColor:"white" }} />
                    </div> 
                    <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}> 
                        <h2 style={{ fontFamily: "Barlow-Bold", marginBottom: 30 }}>Register</h2> 
                    </div> 
                    <div style={{ marginBottom: 20, display: "flex", flexWrap: "wrap" }}> 
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}> 
                            <InputLabel htmlFor="standard-adornment-email">First Name</InputLabel> 
                            <Input label="Email ID" 
                                id="standard-adornment-email" 
                                onChange={handleChange('firstName')} /> 
                        </FormControl> 
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}> 
                            <InputLabel htmlFor="standard-adornment-email">Last Name</InputLabel> 
                            <Input label="Email ID" 
                                id="standard-adornment-email" 
                                onChange={handleChange('lastName')} /> 
                        </FormControl> 
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}> 
                            <TextField label="Email ID" 
                                id="standard-adornment-email" 
                                onChange={handleChange('emailId')} 
                                error={errorValues.emailId != ""} 
                                helperText={errorValues.emailId} 
                                color={errorValues.emailId == "" ? "primary" : "secondary"} 
                            /> 
                        </FormControl> 
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}> 
                            <TextField label="Login ID" 
                                id="standard-adornment-email" 
                                onChange={handleChange('loginId')} 
                                error={errorValues.loginId != ""} 
                                helperText={errorValues.loginId} 
                                color={errorValues.loginId == "" ? "primary" : "secondary"} /> 
                        </FormControl> 
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}> 
                            {/* <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel> */} 
                            <TextField label="Password" 
                                type={values.showPassword ? 'text' : 'password'} 
                                onChange={handleChange('password')} 
                                InputProps={{ 
                                    endAdornment: 
                                        <> 
                                            <InputAdornment position="end" > 
                                                <IconButton 
                                                    aria-label="toggle password visibility" 
                                                    onClick={handleClickShowPassword} 
                                                    onMouseDown={handleMouseDownPassword} 
                                                > 
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />} 
                                                </IconButton> 
                                            </InputAdornment> 
                                        </> 
                                }} 
                            /> 
                        </FormControl> 
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginRight: 20 }}> 
                            {/* <InputLabel

htmlFor="outlined-adornment-amount">Confirm Password</InputLabel> */} 
                            <TextField label="Confirm Password" 
                                type={values.showPassword ? 'text' : 'password'} 
                                onChange={handleChange('confirmPassword')} 
                                InputProps={{ 
                                    endAdornment: 
                                        <> 
                                            <InputAdornment position="end" > 
                                                <IconButton 
                                                    aria-label="toggle password visibility" 
                                                    onClick={handleClickShowConfirmPassword} 
                                                    onMouseDown={handleMouseDownPassword} 
                                                > 
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />} 
                                                </IconButton> 
                                            </InputAdornment> 
                                        </> 
                                }} 
                                color={errorValues.confirmPassword == "" ? "primary" : "secondary"} 
                                error={errorValues.confirmPassword != ""} 
                                helperText={errorValues.confirmPassword} /> 
                        </FormControl> 
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}> 
                            {/* <InputLabel htmlFor="standard-adornment-number">Contact Number</InputLabel> */} 
                            <TextField label="Contact Number" 
                                id="standard-adornment-number" 
                                onChange={handleChange('contactNumber')} type="number" 
                                color={errorValues.contactNumber == "" ? "primary" : "secondary"} 
                                error={errorValues.contactNumber != ""} 
                                helperText={errorValues.contactNumber} /> 
 
                        </FormControl> 
                    </div> 
                    <div>
                        {
                            (values.emailId != "" && values.password != "" && values.confirmPassword != "" && values.contactNumber != "" && values.firstName != "" && values.loginId != "" && values.lastName != "") ?
                                <button style={{ borderWidth: 0, backgroundColor: "#1DA1F2", color: "black", width: "30%", padding: 10, borderRadius: 20, marginBottom: 20 }} onClick={onRegisterClick}>Submit</button>
                                : <button style={{ borderWidth: 0, backgroundColor: "#b9dbf0", color: "black", width: "30%", padding: 10, borderRadius: 20, marginBottom: 20 }}>Register</button>
                        }
                    </div>
 
                </div> 
                
            </div> 
        </> 
    ) 
 
}