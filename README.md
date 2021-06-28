#dmail

Deepesh Kurmi
deekurmi2018@gmail.com

---

Project Name :- D-mail ( Full Stack Application )
Project Link:- https://d-mail.herokuapp.com/
Code:- https://github.com/Deepesh-IIITN/dmail

---

Frameworks, Libraries and Languages are used in project:-

1. ClientSide :- Reactjs, Bootstrap, Material-ui
2. ServerSide :- nodejs, express
3. Database :- MongoDB , mongoose
   Features Implemented in Project:-
4. Signup, Login and Logout System is implemented
5. Google Sync is used for creates accounts on the application
6. Mail System is Implemented in this user can send the mail to the user.
7. Schedule Selectors:
   i ) 20-30 seconds is implemented
   ii ) weakly, monthly and yearly not implemented but that all schedule
   Selectors can be implemented easily just like “20-30 Seconds
   Scheduler“
8. Bold , italic , font type feature is also implementedProcess to Build and Run the project in your pc:-
   Requirements :-
9. Npm and nodejs should be installed on your pc.
10. Install Nodemon dependency and make it global
11. Visual Studio Code should be in your pc
12. Need google api to send mail
13. Need another google api for google sync
14. MongoDB link to connect application with database on mongo DB
    Atlas.com
    Process:-
15. Go to the github repository by clicking on the link :-
    https://github.com/Deepesh-IIITN/dmail
16. Then Clone the the project in your pc
17. Open your VS code.
18. Open project in VS code
19. Then open terminal and open directory client and run command
    “npm i npm”
20. We will also open directory server and here also we will run command
    “npm i npm”
21. Now create a file “config.env” in server folder file
22. In “Config.env” we will add
    I ) DB = ………………….
    II ) SECURE=...................
    III ) CLIENT=....................
    IV ) CLIENT_SECRET=...................
    V ) REDIRECT_URL=..................
    VI) REFRESH_TOKEN=................9. Now we will run command in one terminal in client directory
    “npm start”
23. Finally we will create another terminal and run command in server
    directory “nodemon app.js"
