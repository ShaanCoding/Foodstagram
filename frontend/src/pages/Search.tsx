// import styles from "../styles/Search.module.css";


import { useParams } from 'react-router-dom'
import useAuth from '../api/util/useAuth'

const Search = () => {
  const [account, isLoading] = useAuth()
  const { searchStr } = useParams();
  console.log(searchStr)

  return(
    

    <div>
      
    </div>
	)
}

export default Search