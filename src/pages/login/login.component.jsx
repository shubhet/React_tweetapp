import React from 'react';
import "./login.styles.css";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import imgLogo from "../../assets/images/loginicon.jpg";
import imgBack from "../../assets/images/background.jpg";
import { pages } from '../../constants/strings';
import TextField from '@material-ui/core/TextField';
import { authenticate } from './login.helper';

export default function Login(props) {
    const [values, setValues] = React.useState({
        emailId: '',
        password: '',
        showPassword: false,
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const handleChange = (prop) => (event) => {
        setErrorMessage("")
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {

        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onForgotPasswordClick = () => {
        props.updateSelectedPage(pages.FORGOT_PASSWORD)
    }
    const onRegisterClick = () => {
        props.updateSelectedPage(pages.REGISTER)
    }
    const onLoginClick = async () => {
        try {
            props.showLoader("Logging in")
            let token = await authenticate(values.emailId, values.password);
            await localStorage.setItem("isAuthenticated", true);
            await localStorage.setItem("token", token);
            await localStorage.setItem("loginId", values.emailId);
            props.updateSelectedPage(pages.HOME)
            props.hideLoader();
        } catch (e) {
            setErrorMessage("Incorrect Credentials")
            props.hideLoader();
        }
    }
    return (
        <>
            <div className={"d-flex h-100 justify-content-center align-items-center"} style={{backgroundImage: `url(${imgBack})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"} }>
                <div style={{ width: "28%", maxWidth: 500 ,backgroundColor:"white",borderRadius:"20px" ,marginLeft:'0%', paddingLeft:"25px",paddingRight:"25px"}} >
                   
                    <div>
                         <img src={imgLogo} height={80} width={80} style={{marginBottom:10,marginTop:5}}/> 
                        <h2 style={{ fontFamily: "Barlow-Bold", marginBottom:5,marginTop:5,color:"#0b162e"}}>Log in </h2>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <FormControl variant="outlined" fullWidth className="formControl" style={{color:"white"}}>
                            <TextField label="Login ID" variant="outlined" style={{fontColor:"white"}}
                                onChange={handleChange('emailId')}
                                error={errorMessage != ""} />
                        </FormControl>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Password" variant="outlined"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')}
                                error={errorMessage != ""}
                                helperText={errorMessage}
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
                                }} />
                        </FormControl>
                    </div>
                    <div >
                        {
                            (values.emailId != "" && values.password != "") ?
                                <button style={{ borderWidth: 0, backgroundColor: "#1DA1F2", color: "black", width: "40%", padding: 10, borderRadius: 20, marginBottom: 10 }} onClick={onLoginClick}>Log In</button>
                                : <button style={{ borderWidth: 0, backgroundColor: "#b9dbf0", color: "black", width: "40%", padding: 10, borderRadius: 20, marginBottom: 10 }}>Log In</button>
                        }
                    </div>
                    <div>
                    <a style={{ cursor: "pointer", fontSize:"20px", color: "#000000" }} className="loginLink" onClick={onForgotPasswordClick}>Forgot password ?</a>
                        <br></br>
                        <a style={{ cursor: "pointer",fontSize:"20px" ,color: "#000000" }} className="loginLink" onClick={onRegisterClick}>Sign-up for new user ?</a>
                    </div>
                </div>
            </div>
        </>
    )

}