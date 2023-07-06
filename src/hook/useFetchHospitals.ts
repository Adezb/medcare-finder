import { useEffect, useState } from "react";
import {
    getDocs,
    collection,
    query,
    where,
    startAfter,
    limit,
    orderBy,
    limitToLast,
    endBefore,
    FieldValue,
  } from "firebase/firestore";
import { db } from "@/firebase/firebase";



  type Hospital = {
    id: string;
    name: string;
    address: string;
    city: string;
    ownership: string;
    phone: string;
    email: string;
  };



function useFetchHospitals() {
    const [loading, setLoading] = useState(true);
   const [message, setMessage] = useState<string | null>(null);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
     
    const perPage = 4;

    const handleSearchHospital = async (city: string) => {
        if (city.trim() === "") {
             setMessage("Please enter a city");
            setTimeout(() => {
             setMessage("");
              }, 3000);
               return;
          }
         setLoading(true);
        const q = query(collection(db, "hospitals"), where("city", "==", city), orderBy("name", "asc"), limit(perPage));
        try {
            const querySnapshot = await getDocs(q);
            const hospitals: Hospital[] = [];
            querySnapshot.forEach((doc) => {
                hospitals.push({
                    id: doc.id,
                    name: doc.data().name,
                    address: doc.data().address,
                    city: doc.data().city,
                    ownership: doc.data().ownership,
                    phone: doc.data().phone,
                    email: doc.data().email
                });
            });
            setHospitals(hospitals);
            setLoading(false);
            //If the city entered is not in the database
            if (hospitals.length === 0) {
                setMessage(`No hospital data found for ${city}`);
                setTimeout(() => {
                    setMessage("");
                }, 3000);
                return;
            }
           
            
        
        } catch (error: any) {
            console.log(error);
            setMessage(error.message);
        }
    };


    const fetchMoreHospitals = async () => {
        
        const q = query(collection(db, "hospitals"), orderBy("name", "asc"), startAfter(FieldValue), limit(perPage));
        try {
            const querySnapshot = await getDocs(q);
            const hospitals: Hospital[] = [];
            querySnapshot.forEach((doc) => {
                hospitals.push({
                    id: doc.id,
                    name: doc.data().name,
                    address: doc.data().address,
                    city: doc.data().city,
                    ownership: doc.data().ownership,
                    phone: doc.data().phone,
                    email: doc.data().email
                });
            });
            setHospitals(hospitals);
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            setMessage(error.message);
        }

        
    };

    console.log(hospitals[0]);
    console.log(hospitals[3]);

    const fetchPreviousHospitals = async () => {
        
        const q = query(collection(db, "hospitals"), orderBy("name", "asc"), endBefore(FieldValue), limitToLast(perPage));
        try {
            const querySnapshot = await getDocs(q);
            const hospitals: Hospital[] = [];
            querySnapshot.forEach((doc) => {
                hospitals.push({
                    id: doc.id,
                    name: doc.data().name,
                    address: doc.data().address,
                    city: doc.data().city,
                    ownership: doc.data().ownership,
                    phone: doc.data().phone,
                    email: doc.data().email
                });
            });
            setHospitals(hospitals);
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            setMessage(error.message);
        }
    };

    //handle Search Hospital
   

    return { loading, message, hospitals, fetchMoreHospitals, fetchPreviousHospitals, handleSearchHospital,  };

}

export default useFetchHospitals;