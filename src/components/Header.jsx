import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faFileCirclePlus, faGear, faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Client, Storage } from "appwrite";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Button from './Button';
import { ID } from 'appwrite';
function Header() {
    const [showmenu, setshowmenu] = useState(false);
    const [videos, setvideos] = useState([]);
    const windowtheme = useSelector(state => state.theme || "light");
    const [Search,setsearch] = useState([])
    const [searchresults,setsearchresults] = useState([])
    const [selectedfile,setselectedfile] = useState("")

    useEffect(() => {
        console.log("received")
        console.log("Theme changed:",windowtheme);
    }, [windowtheme]);

    const Togglemenu = () => {
        setshowmenu(!showmenu);
    };

    const client = new Client();
    const storage = new Storage(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') 
        .setProject('65da2395ec465b74322e'); 

    useEffect(() => {
        const fetchVideos = async () => {
           
            const response = await storage.listFiles('65da24431a9b4fb05538');
            console.log(response)
            
            try {
                setvideos(response.files)
               
            } catch (error) {
                console.log(error)
            }
        };

        fetchVideos();
    }, []);
    useEffect(() => {
        const handleSearch = () => {
            if (typeof Search === 'string') {
                const filteredData = videos.filter(item => item.name.toLowerCase().includes(Search.toLowerCase()));
                setsearchresults(filteredData);
            } else {
                setsearchresults([]); 
            }
        };
    
        handleSearch();
    }, [Search, videos]);
    const select = (e) => {
        const file = e.target.files[0];
        setselectedfile(file);
    };
    const generateFileId = () => {
        return ID.unique(); 
    };
    const handleUpload = async () => {
        if (selectedfile) {
            try {
                const fileId = generateFileId(); 
             
                const response = await storage.createFile("65da24431a9b4fb05538", selectedfile, fileId); 
                console.log('File uploaded:', response);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected for upload');
        }
    };
   
    return (
        <><div className={`w-full h-screen  ${windowtheme === "light"?" bg-slate-600":" bg-white"} `}>
            <div className=' fixed top-0 left-0 z-10 border-t-gray-600 w-full h-16 px-2 bg-transparent flex justify-between items-center'>
                <div className=' flex'>
                <div onClick={Togglemenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className=' ml-4 text-center w-6 bg-pink-600 '><Button/></div>
                </div>
                <Link to="/Home">
                <div className='w-16 h-16 pt-4'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBEt9fkwXzOsrz9aU9dmSoc0Xl783OypEbHBr8K31PasWiEhy76CdAkQbQjtCGFW_P4s&usqp=CAU"  alt="" />
                </div>
                </Link>


               


                <form className='flex' action="">
                    <input
                    onChange={(e)=>setsearch(e.target.value)}
                        className='  w-full md:w-72 h-7  rounded-xl border border-gray-300 focus:border-blue-500 outline-none px-2 '
                        type="text"
                        placeholder="Search..." />
                        <div className=' bg-white absolute top-12'>
                        {searchresults.length > 0 && (
                     <ul className=' bg-transparent'>
                         {searchresults.map((item, index) => (
                              <li className=' w-full md:w-72 h-12 border border-gray-600' key={index}>{item.name}</li> ))}
                     </ul>)}</div>
                    <div  className=' border border-gray-300 focus:border-blue-500 w-10 h-7 rounded-full bg-transparent flex items-center justify-center'>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </form>
              

                <div  className='flex justify-evenly '>
                {/* < div onClick={Togglemenu} className=' mr-7'><FontAwesomeIcon icon={faFileCirclePlus} />
                        <p className=' text-xs'>Upload</p>
                        {showmenu &&   <div className='  flex flex-col mt-1 justify-center items-center'>
                    <input className=' w-20 text-xs' type="file" />
                </div>}
                    </div> */}
                    <Link to="/"><div className=' mt-2 text-xm mr-6'>Login</div></Link>
                    <div className=' mr-7'><FontAwesomeIcon icon={faBell} />
                    <p className=' text-xs'>notification</p></div>
                    <Link to="/Profile"><div className=' mr-7'><FontAwesomeIcon icon={faUser} />
                    <p className=' text-xs'>profile</p></div></Link>
                    

                    
                </div>
            </div>

            <div className=' fixed flex flex-col   top-20 left-0 h-screen ml-4  p-8 w-16   ' >
                <Link to="/Home">
                <div className=' flex flex-col justify-center items-center'>
                    <div><FontAwesomeIcon icon={faHome} />
                        <p className=' text-xs'>Home</p>
                    </div>
                </div>
                </Link>
                
                <div className='  flex flex-col mt-10 justify-center items-center'>
                   <Link to="/Profile">
                   <div><FontAwesomeIcon icon={faUser} />
                        <p className=' text-xs'>Profile</p>
                    </div>
                   </Link>
                   
                </div>
                <div className=' flex flex-col mt-10 justify-center items-center'>
                    <div><FontAwesomeIcon icon={faGear} />
                        <p className=' text-xs'>Setting</p>
                    </div>
                </div>
                <div onClick={Togglemenu} className='  flex flex-col mt-10 justify-center items-center'>
                    <div><FontAwesomeIcon icon={faFileCirclePlus} />
                        <p className=' text-xs'>Upload</p>
                    </div>
                </div>
                {showmenu &&   <div className='  flex flex-col mt-1 justify-center items-center'>
                    <input
                   onChange={select}
                     className=' w-20 text-xs' type="file" />
                     <button onClick={handleUpload}>Upload</button>
                </div>}
              
            </div>
           
            <div className={`pt-10 overflow-y-scroll max-sm:mt-0 px-8 flex flex-wrap  justify-evenly ml-10 h-screen ${windowtheme === "light"?" bg-slate-600":" bg-white"}`}>
    {videos && videos.map((video, index) => (
        <div className=' w-80 h-80 m-3' key={index}>
            <video controls volume={0.5} src={`https://cloud.appwrite.io/v1/storage/buckets/65da24431a9b4fb05538/files/${video.$id}/view?project=65da2395ec465b74322e&mode=admin`} type={video.mimeType}></video>
            <h1>{video.name}</h1>
        </div>
    ))}
</div>

</div>
        </>
    );
}

export default Header;
