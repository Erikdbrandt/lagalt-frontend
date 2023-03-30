# Lagalt
#### This is a project management platform, designed to help users browse and join projects across different industries. The application includes various features such as project search, OAuth registration and login, user profiles, project administration, and more.

## Colaborator
### Arif Hossain
### Erik Brandt
### Zakhida Ruslanova

## Getting Started
To get started with the application, you will need to have Node.js and npm installed on your machine. Currently this project depends on another server that is build on spring boot. You need both spring boot and keycloak server run locally on your machine.
You can download backend server to this link:
#### https://github.com/ArifHoss/lagalt-backend.git
Run Keycloak on docker
#### docker run --name lagalt_container -e POSTGRES_PASSWORD=root -e POSTGRES_DB=lagalt_db -p 5432:5432 -d postgres


#### Clone this repository to your local machine
#### Install the necessary dependencies by running npm install
#### Start the application by running npm start
#### The application should now be running on http://localhost:3000/

## Features
The application includes the following features:

### FE-01: Main view: 
#### The main view allows users to quickly browse current projects, with an option to login/register that is not obtrusive.
## FE-02: Project at a glance: 
#### The main page displays a collection of project banners that reflect their field/industry and the currently needed skills. Projects also have tags that reflect their theme/purpose. If a logged in user's skills match those needed for a project, the banner will reflect this visibly.
## FE-03: OAuth Registration & Login: 
#### Users can register and login to the application using OAuth.
## FE-04: Search Feature: 
#### Users can use keyword searches to narrow down the visible projects.
## FE-05: Industry switching: 
#### Different industries are differentiated into different categories, with the option to view all projects.
## FE-06: Project View:
#### Users can click on a project to view additional details. Public info is available to all users, with logged in users able to see additional content such as recent git repos commits and the chat panel for the project. Logged in users also have the option to join the project.
## FE-07: User Profile: 
#### Users can enter relevant information to their profile, including a collection of skills and a collection of their own projects and projects they are participating in. There is also an option to toggle between "hidden" and regular mode (though this is not currently functional).
## FE-08: Project Administration: 
#### Project leaders have an administration page that lets them update the status of the project (e.g. "Founding", "In progress", "Stalled", "Completed") and view project applications.
## Technologies Used
#### React
#### React Router
#### OAuth
#### Axios
#### Tailwind
#### Keycloak
