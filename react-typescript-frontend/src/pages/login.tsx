import React from 'react';
import { Formik, Form } from 'formik';
import { 
    Box, 
    Button, 
    Link 
    } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useLoginMutation } from '../generated/graphql';
//import { useNavigate } from "react-router-dom"
import { useRouter } from 'next/router'
import * as Yup from 'yup';


interface loginProps {}

const DisplayingErrorMessagesSchema = Yup.object().shape({    
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string()        
        .required('Please enter your password')
  });

const Login: React.FC<loginProps> = ({}) => {      
    const [, login] = useLoginMutation();
    const router = useRouter();       
    return (        
        <Wrapper variant='regular'>
            <h1>Login Page</h1>
            <Formik initialValues={{ email:"", password:"" }} 
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={async (values) => {                                
                const response = await login(values);
                console.log(response);
                console.log(values);
                console.log("Welcome you have logged in");
                router.push("/welcome");              
            }}>
                {({ isSubmitting }) => (
                <Form>                                          
                    <Box mt={4}>
                        <InputField 
                            name='email' 
                            placeholder='email' 
                            label="Email"
                        />
                    </Box>
                    
                    <Box mt={4}>
                        <InputField 
                            name='password' 
                            placeholder='password' 
                            label="Password" 
                            type='password'
                        />
                    </Box>

                    <Button                    
                        mt={4}
                        isLoading={isSubmitting}
                        type='submit' 
                        variantColor='green'                        
                    >
                        Login
                    </Button>

                </Form> 
                )}                        
            </Formik>
        </Wrapper>
    );
};

export default Login
