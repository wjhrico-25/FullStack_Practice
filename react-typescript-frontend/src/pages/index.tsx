import { Button, Link} from '@chakra-ui/core';


const Index = () => {
  return (    
      <>    
        <h1>Welcome! What do you want to do?</h1>
      
        <Link href="/register">
          <Button  variantColor='green'>
            Register
          </Button>
        </Link>
        <Link href="/login">
          <Button ml={5} variantColor='blue'>
            Login
          </Button>
        </Link>
      </>        
  );
};
export default Index;
