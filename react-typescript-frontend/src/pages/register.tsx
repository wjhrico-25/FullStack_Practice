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
import { useRegisterMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

interface registerProps {}

const DisplayingErrorMessagesSchema = Yup.object().shape({
    firstname: Yup.string()      
      .min(1, 'Character must have a range of 1 to 20')
      .max(20, 'Character must have a range of 1 to 20')
      .required('Please enter your First Name'),
    lastname: Yup.string()
      .min(1, 'Character must have a range of 1 to 20')
      .max(20, 'Character must have a range of 1 to 20')
      .required('Please enter your Last Name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter the email'),
    password: Yup.string()
        .min(10, "Too Short, Password must have 10 characters")
        .max(10, "Too Long, Password must have 10 characters")
        .required('Password is Required')
  });


const Register: React.FC<registerProps> = ({}) => {  
    const [, register] = useRegisterMutation();
    const router = useRouter();     

    return (        
        
        <Wrapper variant='regular'>            
            <h1>Register Page</h1>
            <Formik initialValues={{ 
                firstname:"", 
                lastname:"", 
                email:"", 
                password:"" 
            }} 
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={async (values, { setErrors }) => {                                
                const response = await register(values);      
                console.log(response);
                console.log(values);                                                                         
                console.log("You have been registered");
                router.push("/confirmEmail");                              
            }}>
                {({ isSubmitting, errors, touched }) => (
                <Form>  
                    <Box mt={4}>
                        <InputField 
                            name='firstname' 
                            placeholder='firstname' 
                            label="First_Name"   
                        />                            
                    </Box>

                    <Box mt={4}>
                        <InputField 
                            name='lastname' 
                            placeholder='lastname' 
                            label="Last_Name"
                        />          
                    </Box>          
                    
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
                        Register
                    </Button>

                    <Link href="/">
                        <Button 
                        mt={4} ml={5} 
                        variantColor='red'>
                            Back
                        </Button>
                    </Link>                    
                </Form> 
                )}                        
            </Formik>
        </Wrapper>
    );
};

export default Register
