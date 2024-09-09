import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuthServiceContext } from "../context/AuthContext";
import Container from "@mui/material/Container";
import {Box, Button, TextField, Typography} from "@mui/material";


const Register = () => {
    const { register } = useAuthServiceContext();
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
                const status = await register(username, password);

                if (status === 409) {
                    formik.setErrors({
                        username: "Username already taken or invalid",
                    });
                } else if (status === 401) {
                    formik.setErrors({
                        username: "Invalid username or password",
                        password: "Invalid username or password",
                    });
                } else if (status === 201) {
                    // Registration successful, navigate to login
                    navigate("/login");
                } else {
                    formik.setErrors({
                        username: "An unknown error occurred",
                        password: "Please try again",
                    });
                }
            } catch (error) {
                formik.setErrors({
                    username: "Registration failed",
                    password: "Please try again",
                });
            }
        }
    });

    return(
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: "flex", alignItems: "center", flexDirection: "column"}}>
                <Typography variant="h5" noWrap component="h1"
                            sx={{
                                fontWeight: "fontWeightBold",
                                pb: 2,
                            }}
                >
                    Register
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

                    <Button variant="contained"
                            disableElevation
                            type="submit"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                          >
                        Register</Button>
                </Box>
            </Box>
        </Container>
    )
};


export default Register;
