## Carbreacognitinter

> Update (19.04.21): The project is finally in shape and at a point where I can share it with the public wihtout having second thoughts. A deployed version of the project can be found at [carbreacognitinter.carlo-hildebrandt.de/](http://carbreacognitinter.carlo-hildebrandt.de/).

## What the hell is Carbreacognitinter???

Carbreacognitinter stands for an IBM **Carb**on **Rea**ct app with built in AWS **Cognit**o integration and **inter**nationalisation capabilities. Easy to guess, right?!

No, but to be honest, that is exactly what that project is all about: A beautiful scaffold which can be used to create own dynamic web applications without needing to reinvent the wheel. User Signup, Signin and Logout are such normal things on the Web nowadays, that I decided to create a starter pack for future projects.

Regarding the technology choices: 
* IBM Carbon Design System: In my eyes these components look very sexy.
* React: Established Frontend Framework. Fortunately there is a [Getting Started tutorial combined with the Carbon Design System](https://github.com/carbon-design-system/carbon-tutorial), from which I robbed the initial project scaffold.
* AWS Cognito: Simple and easy-to-use user management tool in the cloud with a free tier and lots of configuration possibilities. 

## Operations guide

### Prerequisites

Before running the project make sure to have an AWS account and one Cognito User Pool already configured.
(Once I have time I will also share a AWS CDK script, which automatically generates and configures the necessary AWS resources. )
In the mean time you have to do it yourself and need to configure your React app to use the following configurations, which need to be saved in the `.env` file in the project root directory:

```bash
REACT_APP_COGNITO_REGION="'XX-XXXX-X"
REACT_APP_COGNITO_USER_POOL_ID="XX-XXXX-X_abcd1234"
REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID="a1b2c3d4e5f6g7h8i9j0k1l2m3"
```
More information regarding the configuration can be found [here](https://docs.amplify.aws/lib/auth/start/q/platform/js#create-new-authentication-resource).

### Development

Clone the repo and run  `npm start` and under [http://localhost:3000](http://localhost:3000) the app should be accessible.

### Release and Deployment

You can create deployable artifacts by running `npm run build`.

I already added docker support, so that you have an OCI image, which you can deploy anywhere:
```bash
docker build --pull --rm -f "Dockerfile" -t carbreacognitinter:latest "."
docker run -p 8080:80 cabreacognitinter:latest
```
(Make sure to pass the Cognito configuration as build args or .env file during the docker build)


## Open points

Here is a list of thing, that need to / can be done to further improve the project:

- [x] disable submit after click and finally reenable it
- [x] introduce success notifications for login & logout
- [x] rename user page to "My Profile"
- [x] remove email as sign in possibility 
- [x] fix logout access denied error
- [x] introduce "thanks for registering" modal
- [x] fix that form is cleared after error (wtf? why is that the case?)
- [x] fix `<a>` cursor
- [x] implement "forgot password" functionality
- [x] implement the complete i18n part of the project
- [x] fix notification countdown timer
- [ ] build AWS CDK script for cognito user pool
- [ ] give inline invalid warning on empty input field
- [ ] add Logged in as xyz label
- [ ] add password visibility toogle


