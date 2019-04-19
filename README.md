<h1 align="center">
    <a href="#">
        <img src="assets/qlambda.png" alt="QLambda Logo" width="300" />
    </a>
</h1>
<h4 align="center">
	✴️ A portfolio of AWS Serverless apps ✴️
</h4>

<div align="center">

[![Badge](https://88yiwpec0oxo.runkit.sh)](https://git.io/gradientbadge)&nbsp;&nbsp;[![Badge](https://8e8o0wa91jd0.runkit.sh)](https://reactjs.org/)&nbsp;&nbsp;[![Badge](https://8f6c9ibziff5.runkit.sh)](https://git.io/gradientbadge)

_Quick View:_

[00][0link]&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;

</div>

**QLambda** is a project dedicated to learning about serverless computing on AWS. The serverless applications are built following online tutorials and sometimes adapted to suit the purpose of this project. In this way, techniques and tools from various implementations are discovered.

<!--
TODO: Insert a pic of the web page
-->

### Overview

A summary of the examples found in this project.

<!--
TODO: Add demo links
-->

| Name                                | Tech                 | Description                                                   |
| ----------------------------------- | -------------------- | ------------------------------------------------------------- |
| 00. [React Amplify Auth Service][0] | Amplify CLI, Cognito | Simple authentication in React using AWS Amplify and Cognito. |

### How To Use

QLambda requires [Node.js](https://nodejs.org/) v10 or more recent. [Yarn package manager](https://yarnpkg.com/) and an [AWS account](https://aws.amazon.com/getting-started/) is also needed. This project is structured as a monorepo using yarn workspaces. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/elitenoire/QLambda.git

# Go into the repository
$ cd QLambda

# Install dependencies
$ yarn install -g @aws-amplify/cli
$ cd examples/~insert~example~name && yarn install
# or
$ yarn workspace ~insert~example~name install

# Configure Amplify
$ amplify init

# Add Amplify Auth
$ amplify add auth
  <accept defaults>
  ...
$ amplify push

# Run the app
$ yarn start
# or
$ yarn workspace ~insert~example~name start
```

### Deploy to AWS Amplify Console

The console does not auto-detect the build settings due to the project structure. Hence `amplify.yml` is included in the root directory to expose the settings. Each example app is to be deployed separately. Four steps needed to deploy:

- Click the button and follow the prompts to save and deploy app
  [![amplifybutton](https://oneclick.amplifyapp.com/button.svg)][deployrepo]
- The build fails because it is missing an env variable which needs to be set in the console as `APP_NAME = ~insert~example~name` . [Read more][consoleenv]
- Follow this [link][consolerole] to enable Amplify Console deploy the backend resource. (_This fixes the missing AWS credentials error during build_)
- Retry the build process again

The [Amplify Console User Guide](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html) provides detailed information on deploying apps.

#### Credits

- Logo design by [Logofury](https://www.logofury.com/)

[0]: /examples/react-amplify-auth-service 'React Cognito Authentication'
[0link]: https://master.d3gdsyrswsj5yq.amplifyapp.com/
[deployrepo]: https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/elitenoire/QLambda
[consoleenv]: https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html
[consolerole]: https://docs.aws.amazon.com/amplify/latest/userguide/how-to-service-role-amplify-console.html
