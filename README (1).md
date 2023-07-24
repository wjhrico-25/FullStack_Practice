**# Lerna_Project**
IFCA Training using React-TypeScript as Front-End, TypeGraphQL as Back-End and Postgres as Database

Guidelines:
To run the system, you need to run the **backend(typegraphql-practice)** first by typing the _**'yarn start'**_ and then run it by clicking the Enter button, then run the **frontend(react-typescript-frontend)** by typing the _**'yarn dev'**_ and then run it by clicking the enter button

To register the user:
1. click the register button
2. enter the details
3. click the register button to submit it (you will see the backend was operating well and will move to )
4. get the token from the backend side. which was: 
Message sent: <49976144-b2d4-e14e-0edf-11ea550a8c63@example.com>
Preview URL: https://ethereal.email/message/{random url}

5. Copy the token and paste it and then click the confirm email button that will proceed to the login page
6. Login page enter the details then click the login button but don't forget to open the inspect button inside the website, which will show that the cookie was added.
7. Once the system was logged in, it will show the welcome page and a logout button. When you clicked the logout button, it will delete the cookie inside the inspect section in the browser.

Issues:
- I tried to get the token from the backend part and put it in the front-end but there is no result shown

Notes:
- For the backend part I followed the method from the Ben Awad TypeGraphQL tutorial playlist from Setup to Logout
- For the frontend part I used Chakra UI and Nextjs and the methods from Ben Awad's Fullstack React GraphQL TypeScript Tutorial (without using MikroORM)
- The forgotPassword and changePassword, I have not included it and I made it _optional_.
