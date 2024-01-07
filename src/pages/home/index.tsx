import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { firebaseGetAll, firebaseGetTransport, firebaseSaveTransport } from "../../services/firebase/firestore";

const Home = () => {

    const [transport, setTransport] = useState<string []>([]);
   
    useEffect(() => {
        firebaseGetTransport(vehicles => {           
            setTransport(vehicles)});

        firebaseGetAll('user_info', data => console.log('user_info ',data));    
        firebaseGetAll('transport', data => console.log('transport ',data));    

    },[]);


    const onCheckedHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        if(transport.includes(name)){
            setTransport(prev =>{
                const modified = [...prev.filter(tr => tr!==name)];
                firebaseSaveTransport(modified);
                return  modified;
            });
        }else{            
            setTransport(prev =>{
                const modified =  [...prev, name];
                firebaseSaveTransport(modified);
                return  modified;
            });            
        }
    } 

    return (
        <>
            <Stack sx={{ ml: 1, mt: 1, width: '128px' }}>               
                    <Stack>
                        <div>
                            <input type="checkbox" id="bike" name="bike" value="Bike" checked={transport && transport.includes('bike')} onChange={onCheckedHandler}/>
                            <label htmlFor="bike"> I have a bike</label>
                        </div>
                        <div>
                            <input type="checkbox" id="car" name="car" value="Car"  checked={transport && transport.includes('car')} onChange={onCheckedHandler}/>
                            <label htmlFor="car"> I have a car</label>
                        </div>
                        <div>
                            <input type="checkbox" id="boat" name="boat" value="Boat"  checked={transport && transport.includes('boat')} onChange={onCheckedHandler}/>
                            <label htmlFor="boat"> I have a boat</label>
                        </div>                           
                    </Stack>                  
            </Stack>
        </>
    );
}

export default Home;