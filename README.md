# Study Budz

Study Budz is a web app that connects UCSD students with potential study buddies based on similar classes and major.

## Site
### Landing Page
![Landing Page](screenshots/landing-page.png)

What you see when you open the web app (currently, there's a small bug with the light/dark mode toggle button that affects the landing page and makes it look ugly so if it looks different, that's probably why).

### Profile Page
![Profile Page](screenshots/profile-dark.png)

Once logged in, users can update their profile by selecting a major through the dropdown, listing their classes, updating their bio so others can learn about them, and provide some social media handles so other users can reach out to them. There is also a button to toggle between light and dark mode. 

### Matches Page
![Matches page](screenshots/match-page-dark.png)

When the user's profile is updated, they will see their matches, students who have classes and/or their major in common. For each user, the rest of the students are ordered by the number of classes they have in common, with an extra "point" bonus if they share the same major. Clicking on a user's name would open up their full profile, where they can read their full bio and view their contact information to connect.

## Demo

Check it out here: [https://studybudz.herokuapp.com/](https://studybudz.herokuapp.com/)

There's a good chance it won't load correctly (or at all); I'm still working on that part...

## Built With
Study Budz was built with React.js and uses Firebase to authorize users and store user data.

