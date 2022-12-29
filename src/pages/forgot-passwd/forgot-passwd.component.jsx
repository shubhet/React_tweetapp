
import React from 'react';
import "./forgot-passwd.styles.css";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import imgLogo from "../../assets/images/forgoticon.png";
import imgForget from "../../assets/images/b3.jpg";
import { pages } from '../../constants/strings';
import { forgotPassword } from './forgot-passwd.helper';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword(props) {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [values, setValues] = React.useState({
        emailId: '',
        password: '',
        showPassword: false,
    });
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
    const onForgotPasswordClick = async () => {
        try {
            props.showLoader("Resetting Password")
            await forgotPassword(values.emailId, values.password);
            /*
            toast.success("Password Set Succesfull")
            */
            props.updateSelectedPage(pages.LOGIN)
            props.hideLoader();
        } catch (e) {
            props.hideLoader();
            setErrorMessage("No user exists with login Id as " + values.emailId)
        }
    }

    return (
        <>
        <div className={"d-flex h-100 justify-content-center "} style={{backgroundImage: `url(${imgForget})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"} }>
                <div style={{ width: "20%", maxWidth: 300 ,marginLeft:'40%',marginTop:'8%'}}>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => { props.updateSelectedPage(pages.LOGIN) }}>
                        <img src={imgLogo} height={50} width={50} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginLeft: 0 }}>
                        <h2 style={{ fontFamily: "Barlow-Bold",color: "#C70039", marginBottom: 30 }}>Forgot Password</h2>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <FormControl variant="outlined" fullWidth className="formControl">
                            <TextField label="Enter Login Id" variant="standard"
                                onChange={handleChange('emailId')}
                                error={errorMessage != ""} />
                        </FormControl>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Enter New Password" variant="standard"
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
                    <div>
                        {
                            (values.emailId != "" && values.password != "") ?
                                <button style={{ borderWidth: 0, backgroundColor: "#1DA1F2", color: "black", width: "60%", padding: 10, borderRadius: 10, marginBottom: 10 }} onClick={onForgotPasswordClick}>Reset Password</button>
                                : <button style={{ borderWidth: 0, backgroundColor: "#b9dbf0", color: "black", width: "60%", padding: 10, borderRadius: 10, marginBottom: 10 }}>Reset Password</button>
                        }
                    </div>

                </div>
            </div>
        </>
    )

}
