import React, { useEffect, useState } from 'react'
import './journaling.css'
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons/navButtons';
import SearchBar from '../../components/SearchBar/searchBar';
import CalendarComponent from '../../components/Calendar/calendar';
import { ReactComponent as SideComma } from '../../assets/svg/sideComma.svg'
import axios from 'axios';


const Journaling = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState("");
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const [selectedNoteDate, setSelectedNoteDate] = useState(`${day}/${month}/${year}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("get")
        const getNoteResponse = await axios.get(`${baseURL}/notes/getNote`, {
          params: {
            date: selectedNoteDate,
            user: userInfo.username,
          },
        });
        // console.log(getNoteResponse.data);
        if (getNoteResponse.data !== null) {
          setNoteId(getNoteResponse.data._id);
          setNote(getNoteResponse.data.note);
        } else {
          setNote("");
          setNoteId("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedNoteDate]);

  // useEffect(() => {
  //   console.log(note);
  // }, [note]);



  const { data } = useFetch(`${baseURL}/user/userInfo/${localStorage.getItem("access_token")}/${JSON.parse(localStorage.getItem("user"))?._id}`);
  useEffect(() => {
    setUserInfo(data);
  }, [data]);
  const handleSave = async () => {
    if (noteId === "") {
      try {
        // console.log("create")
        const createdNote = await axios.post(`${baseURL}/notes/createNote`, {
          date: selectedNoteDate,
          user: userInfo.username,
          note: note, // Use the note state value
        });
        // console.log(createdNote);
        setNoteId(createdNote.data._id);
        setNote(createdNote.data.note);
      } catch (error) {
        console.log(error);
      }
    } else {
      // console.log("update")
      if (note === "") {
        console.log("Deleting the note")
        try {
          await axios.delete(`${baseURL}/notes/deleteNote/${noteId}`)
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const updatedNote = await axios.put(`${baseURL}/notes/updateNote`, {
            id: noteId,
            note: note, // Use the note state value
          });

          setNote(updatedNote.data.note);
          // console.log(updatedNote);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };


  return (
    <div className='home-page'>
      <div className='navbar'>
        <div className='nav-text'>
          <p className='home-main-heading' style={{ fontWeight: "600" }}>Journaling </p>
        </div>
        <SearchBar />
        <NavButtons />
      </div>
      <div className='Journaling-page-row'>
        <div className='Journaling-page-column'>
          <CalendarComponent selectedNoteDate={selectedNoteDate} setSelectedNoteDate={setSelectedNoteDate} />
          <div style={{ height: "10px" }}></div>
          <div className='quote-card'>
            <p className='quote-heading'>Quotes to remember</p>
            <p className='quote'>Just one small positive thought in the morning can change your whole day.</p>
            <p className='side-comma'><SideComma /></p>
          </div>
        </div>
        <div className='Journaling-page-column textarea-right'>
          <div className='notes-container'>
            <p className='notes-text'>Notes</p>
            <p className='notes-title'> ✨ Your thoughts about today ✨</p>
            <textarea className='note-text-area' value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <button className='save-note' onClick={() => handleSave()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Journaling


