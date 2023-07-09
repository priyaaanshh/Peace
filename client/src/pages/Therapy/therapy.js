import React, { useEffect, useState } from 'react'
import './therapy.css'
import '../Home/home.css'
import Sidebar from '../../components/SideBar/sidebar';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../components/DoctorBookCard/bookCard';
import Navbar from '../../components/Navbar/navbar';


const Therapy = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
  useEffect(() => {
    setUserInfo(data);
  }, [data]);


  return (
    <div className='home'>
      <Sidebar Page={"Therapy Session"} />
      <div className='home-page'>

        <Navbar mainHeading={"Therapy Session"} searchBar={true} />
        <div className='home-page-heading'>Top  psychiatrist</div>
        <div className='home-page-cards'>
          <BookCard
            image={"https://tcounseling622704937.files.wordpress.com/2022/01/13b7e-pexels-photo-4101136.jpeg"}
            Name={"Dr.  Ignacio Hettinger"}
            Profession={"Adult Psychiatrist"}
          />
          <BookCard
            image={"https://www.elespectador.com/resizer/Jjrwjgjyzfibnti4COsT5kjSa4U=/525x350/filters:quality(60):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/KUAGXSEBI5BABJX25DX6NK4Q3U.jpg"}
            Name={"Dr. Marlene Hammes"}
            Profession={"Physician and Psychiatrist"}
          />
          <BookCard
            image={"https://visionsource-drmoss.com/wp-content/uploads/2023/01/progressives-2023_620.jpg"}
            Name={"Dr. Annette Crona"}
            Profession={"Consultant Psychiatrist"}
          />
        </div>
        <div className='home-page-heading'>Clincal Experts</div>
        <div className='home-page-cards'>
          <BookCard
            image={"https://wbnlabs.com/wp-content/uploads/2023/01/pexels-cedric-fauntleroy-4270088-scaled-e1675657510459.jpg"}
            Name={"Dr. Valerie Gutmann"}
            Profession={"Clinical psychologist"}
          />
          <BookCard
            image={"https://www.billingsavi.com/wp-content/uploads/2022/07/pexels-tima-miroshnichenko-5452291.jpg"}
            Name={"Dr. Clyde Gaylord"}
            Profession={"Clinical psychologist"}
          />
          <BookCard
            image={"https://images.pexels.com/photos/4989165/pexels-photo-4989165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            Name={"Dr. Raymond Lynch"}
            Profession={"Clinical psychologist"}
          />
          <BookCard
            image={"https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            Name={"Dr. Ellis Feest"}
            Profession={"Clinical psychologist"}
          />
          <BookCard
            image={"https://www.mia-assurances.com/wp-content/uploads/2021/12/pexels-tima-miroshnichenko-5452293-scaled-666x666.jpg"}
            Name={"Dr. Beulah Auer"}
            Profession={"Clinical psychologist"}
          />

        </div>
      </div>
    </div>
  )
}

export default Therapy