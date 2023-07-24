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
import { useLogoutMutation } from '../generated/graphql';
import { useNavigate } from "react-router-dom"
import { useRouter } from 'next/router'

interface meProps {}

const welcome: React.FC<meProps> = ({}) => {  
  const [, logout] = useLogoutMutation();
  const router = useRouter();
  //const navigate = useNavigate();
    return (        
        <Wrapper variant='regular'>
            <h1>Welcome, user you have logged in the system</h1>
            <Formik initialValues={{ }} 
            onSubmit={async (values) => {                                
                const response = await logout(values);
                // console.log(values);
                console.log("Your system have been logged out");
                router.push("/")
            }}>
                {({ isSubmitting }) => (
                <Form>                                                              
                    <Button                    
                        mt={4}
                        isLoading={isSubmitting}
                        type='submit' 
                        variantColor='green'
                    >
                        Logout
                    </Button>                    
                </Form> 
                )}                        
            </Formik>
        </Wrapper>
    );
};

export default welcome
