import { createContext, useEffect, useState } from "react";
import { trainersData } from "../assets/assets";
import { toast } from 'react-toastify';
import axios from 'axios';

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    
    //const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const backendUrl = 'http://localhost:4000';

    console.log("Backend url",backendUrl)

    const [userData,setUserData] = useState(false)

    const [trainers,setTrainers] = useState([])

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`,{headers:{token}})
            if(data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getTrainerData = async () => {
        /*try {
            const { data } = await axios.get(`${backendUrl}/api/trainer/list`);
            if (data.success) {
                // Make sure to check for necessary properties like 'available'
                const trainersWithAvailability = data.trainers.map(trainer => ({
                    ...trainer,
                    available: trainer.available !== undefined ? trainer.available : false, // Default to false if not defined
                }));
                setTrainers(trainersWithAvailability);
            } else {
                toast.error("Failed to load trainers.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching trainer data");
        }*/
       //setTrainers(trainersData)
       try {
            const { data } = await axios.get(`${backendUrl}/api/trainer/list`);
            console.log('Trainers Data:', data);  // Log the trainer data here too
            if (data.success) {
                setTrainers(data.trainers);  // Make sure this line is working and you're updating the state
            }
        } catch (error) {
                console.log(error);
            }
        };

    useEffect(() => {
        getTrainerData()
    },[])

    useEffect(() => {
        if(token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    },[token])

    const value = {
        /*Whatever value is added here can be accessed in any component */
        trainersData,
        trainers,
        getTrainerData,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData 
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider