// import styles from "../styles/Search.module.css";
import { useParams } from 'react-router-dom'
import useAuth from '../api/util/useAuth'
import UseSearchPostMutation from '../api/UseSearchPostMutation'


const SearchPost = () => {
  const [account, isLoading] = useAuth()
  const { searchStr } = useParams();
  const searchPostMutation = UseSearchPostMutation()
  console.log(searchPostMutation.data?.data.data)

  return (
    <>
      <div>
        <h1 className='text-justify text-2xl px-48'>Search results for '{searchStr}'</h1>
        { }
      </div>
    </>
  )
}

export default SearchPost