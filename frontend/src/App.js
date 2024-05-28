import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [authors, setAuthors] = useState([])

  const authorsData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASEURL}/authors`)
      const data = await response.json()
      setAuthors(data)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    authorsData()
  }, [])

  return (
    <div>
      {authors.map(author => (
        <p>{author.name}</p>
      ))}
    </div>
  );
}

export default App;
