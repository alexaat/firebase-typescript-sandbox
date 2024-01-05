import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { firebaseGetTransport, firebaseSaveTransport } from "../../services/firebase/firestore";


const Home = () => {
    
    /*
    if (props?.currentUser === null) {
        return <Navigate to='/' />
    }

    let transport: string[] = []

    const handleClickNext = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        transport = [];
        const hasBike = (event.currentTarget as HTMLFormElement).bike.checked;
        const hasCar = (event.currentTarget as HTMLFormElement).car.checked;
        const hasBoat = (event.currentTarget as HTMLFormElement).boat.checked;
        if (hasBike) transport.push('bike');
        if (hasCar) transport.push('car');
        if (hasBoat) transport.push('boat');

        const q = query(collection(db, "users"), where("uid", "==", auth?.currentUser?.uid));
        getDocs(q)
            .then(querySnapshot => {
                querySnapshot.forEach(document => {
                    const id = document.id
                    updateDoc(doc(db, 'users', id), {
                        transport
                    })
                        .then(() => props?.reload())


                })
            })
            .catch(err => alert(err))
    }
    */

    const [transport, setTransport] = useState<string []>([]);
   
    useEffect(() => {
        firebaseGetTransport(vehicles => {           
            setTransport(vehicles)});
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
            

            {/* {props?.currentUser &&
                <Stack sx={{ ml: 1, mt: 1, width: '128px' }}>
                    <form onSubmit={handleClickNext}>
                        <Stack>
                            <div>
                                <input type="checkbox" id="bike" name="bike" value="Bike" checked={props.currentUser.transport.includes('bike')}/>
                                <label htmlFor="bike"> I have a bike</label>
                            </div>
                            <div>
                                <input type="checkbox" id="car" name="car" value="Car"  checked={props.currentUser.transport.includes('car')} />
                                <label htmlFor="car"> I have a car</label>
                            </div>
                            <div>
                                <input type="checkbox" id="boat" name="boat" value="Boat"  checked={props.currentUser.transport.includes('boat')} />
                                <label htmlFor="boat"> I have a boat</label>
                            </div>
                            <input type='submit' value='next' />
                        </Stack>
                    </form>
                </Stack>
            } */}

        </>
    );
}

export default Home;