## Carbreacognitinter

> First of all, this project is still under active development and not even close to a pre-alpha version. So be patient.

## What the hell is Carbreacognitinter???

Carbreacognitinter stands for an IBM **Carb**on **Rea**ct app with built in AWS **Cognit**o integration and **inter**nationalisation capabilities. Easy to guess, right?!

No, but to be honest, that is exactly what that project is all about: A beautiful scaffold which can be used to create own dynamic web applications without needing to reinvent the wheel. User Signup, Signin and Logout are such normal things on the Web nowadays, that I decided to create a starter pack for future projects.

Regarding the technology choices: 
* IBM Carbon Design System: In my eyes these components look very sexy.
* React: Established Frontend Framework. Fortunately there is a [Getting Started tutorial combined with the Carbon Design System](https://github.com/carbon-design-system/carbon-tutorial), from which I robbed the initial project scaffold.
* AWS Cognito: Simple and easy-to-use user management tool in the cloud with a free tier and lots of configuration possibilities. 

## Operations guide

### Development

Clone the repo and run  `npm start` and under [http://localhost:3000](http://localhost:3000) the app should be accessible.

### Release and Deployment

You can create deployable artifacts by running `npm run build`.

I already added docker support, so that you have an OCI image, which you can deploy anywhere:
```bash
docker build --pull --rm -f "Dockerfile" -t carbreacognitinter:latest "."
docker run -p 8080:80 cabreacognitinter:latest
```
