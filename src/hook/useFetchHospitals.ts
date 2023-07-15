import { useEffect, useState} from "react";
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



function useFetchHospitals( city: string) {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
     
    const perPage = 5;

    useEffect(() => {
        const fetchHospital = async () => {
            const q = query(collection(db, "hospitals"), where("city", "==", city), orderBy("name", "asc"));
            try {
                const querySnapshot = await getDocs(q);
                const hospitals = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setHospitals(hospitals as Hospital[]);
                setLoading(false);
                if (hospitals.length === 0) {
                    setMessage(`No hospital data found for ${city}`);
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                    return;
                }
            } catch (error: any) {
                setMessage(error.message);
            }
        };
        fetchHospital();
    }, [city, perPage]  );


    const fetchMoreHospitals = async () => {
        //Get the last visible document
        const lastVisible = hospitals[hospitals.length - 1];
        const q = query(collection(db, "hospitals"), where("city", "==", city), orderBy("name", "asc"), startAfter(lastVisible), limit(perPage));
        try {
            const querySnapshot = await getDocs(q);
            const hospitals = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setHospitals((prev) => [...prev, ...hospitals] as Hospital[]);
            setLoading(false);
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    const fetchPreviousHospitals = async () => {
        //Get the first visible document
        const firstVisible = hospitals[0];
        const q = query(collection(db, "hospitals"), where("city", "==", city), orderBy("name", "asc"), endBefore(firstVisible), limitToLast(perPage));
        try {
            const querySnapshot = await getDocs(q);
            const hospitals = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setHospitals((prev) => [...prev, ...hospitals] as Hospital[]);
            setLoading(false);
        } catch (error: any) {
            setMessage(error.message);
        }
    }


    //handle Search Hospital
    const handleSearchHospital = async () => {
        const q = query(collection(db, "hospitals"), where("city", "==", city), orderBy("name", "asc"), limit(perPage));
        try {
            const querySnapshot = await getDocs(q);
            const hospitals = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setHospitals(hospitals as Hospital[]);
            setLoading(false);
            if (hospitals.length === 0) {
                setMessage(`No hospital data found for ${city}`);
                setTimeout(() => {
                    setMessage("");
                }, 5000);
                return;
            }
        } catch (error: any) {
            setMessage(error.message);
        }
    }

    
    //handle Search Hospital
   

    return { loading, message, hospitals, fetchMoreHospitals, fetchPreviousHospitals, handleSearchHospital };

}

export default useFetchHospitals;




 