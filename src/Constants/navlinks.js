import { ADMIN_MOVIES, ADMIN_ROUTE, CINEMAS_ROUTE, FORGOT_PASSWORD, HOME_ROUTE, LOGIN_ROUTE, MOVIES_FORM, MOVIES_ROUTE, OFFERS_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "./routes";

const navlinks=[
    {
        label:"Home",
        route:HOME_ROUTE
    },

    {
        label:"Cinemas",
        route:CINEMAS_ROUTE

    },

    {
        label:"Movies",
        route:MOVIES_ROUTE
    },

    {
        label:"Offers",
        route:OFFERS_ROUTE
    },

    {
        label:"Login",
        route:LOGIN_ROUTE
    },

    {
        label:"Register",
        route:REGISTER_ROUTE
    },

    {
        label:"Reset-Password",
        route:FORGOT_PASSWORD
    }
    ,


    {
        label:"Profile",
        route:PROFILE_ROUTE
    }

    ,
    {
        label:"Admin",
        route:ADMIN_ROUTE
    },
    {
        label:"Admin/Movies",
        route:ADMIN_MOVIES
    },

    {
        label:"Admin/Moviesform",
        route:MOVIES_FORM
    }
]

export default navlinks;