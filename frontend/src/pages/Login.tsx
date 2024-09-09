import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuthServiceContext } from "../context/AuthContext";
import Container from "@mui/material/Container";
import {Box, Button, TextField, Typography} from "@mui/material";


const Login = () => {
    const { login } = useAuthServiceContext();
    const navigate = useNavigate();

    const formik = useFormik(
        {
        initialValues: {
            username: "",
            password: "",
        },
        validate: (values) => {
            const errors: Partial<typeof values> = {} as Partial<typeof values>;

            if (!values.username) {
                errors.username = "Required";
            }
            if (!values.password) {
                errors.password = "Required";
            }

            return errors;
        },
        onSubmit: async (values) => {
            const { username, password } = values;

            try {
                const status = await login(username, password);

                if (status === 200) {
                    navigate("/");

                } else if (status === 401) {
                    // Registration successful, navigate to login
                    formik.setErrors({
                        username: "Invalid username or password",
                        password: "Invalid username or password",
                    });
                } else {
                    formik.setErrors({
                        username: "An unknown error occurred",
                        password: "Please try again",
                    });
                }
            } catch (error) {
                formik.setErrors({
                    username: "Login failed",
                    password: "Please try again",
                });
            }
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: "flex", alignItems: "center", flexDirection: "column"}}>
                <Typography variant="h5" noWrap component="h1"
                            sx={{
                                fontWeight: "fontWeightBold",
                                pb: 2,
                            }}
                >
                    Login
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt:1 }}>


                    <TextField
                        autoFocus
                        fullWidth
                        id="username" name="username" label="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={!!formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username && formik.errors.username}
                    >
                    </TextField>


                    <TextField
                        fullWidth
                        margin="normal"
                        id="password" name="password" type="password" label="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        sx={{ mt:2 }}
                        error={!!formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    >
                    </TextField>

                    <Button disableElevation type="submit" fullWidth variant="contained"
                            sx={{mt:1 , mb: 2}}
                    >Next</Button>
                </Box>
            </Box>
        </Container>
    )
};


export default Login;
