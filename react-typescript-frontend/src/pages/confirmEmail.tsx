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
import { useConfirmUserMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

interface registerProps {}

const DisplayingErrorMessagesSchema = Yup.object().shape({    
    token: Yup.string()        
        .required('Please insert the token to confirm your email'),
  });


const Register: React.FC<registerProps> = ({}) => {      
    
    const [, confirmEmail] = useConfirmUserMutation();
    const router = useRouter(); 
    return (
        <Wrapper variant='regular'>
            <h1>Confirm Email Page</h1>
            <Formik initialValues={{ token:"" }} 
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={async (values) => {                                
                const response = await confirmEmail(values);
                
                console.log(response);
                console.log(values);        
                // if(response.data?.register.f) {
                //     setErrors(toErrorMap(response.data.register.errors));
                // }                                
                console.log("You have been confirmed you email address");  
                router.push("/login");                                              
            }}>
                {({ isSubmitting }) => (
                <Form>  
                    <InputField 
                        name='token' 
                        placeholder='token' 
                        label="token"
                    />                                                              

                    <Button                    
                        mt={4}
                        isLoading={isSubmitting}
                        type='submit' 
                        variantColor='green'
                    >
                        Confirm Email
                    </Button>
                </Form> 
                )}                        
            </Formik>
        </Wrapper>
    );
};

export default Register
