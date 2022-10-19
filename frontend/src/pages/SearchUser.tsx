// import styles from "../styles/Search.module.css";
import { useParams } from 'react-router-dom'

import UseSearchUserMutation from '../api/UseSearchUserMutation';
import useAuth from '../api/util/useAuth'

const SearchUser = () => {
  const [account, isLoading] = useAuth()
  const { searchStr } = useParams();
  const searchUserMutation = UseSearchUserMutation()

  if (searchStr !== undefined)
    searchUserMutation.mutate({
      searchStr: searchStr,
    })
  
  console.log(searchStr)
  console.log(searchUserMutation.data?.data.data)

  return (
    <>
      <div>
        <h1 className='text-justify text-2xl px-48'>Search results for '{searchStr}'</h1>
        {searchUserMutation.data?.data.data !== undefined}
      </div>
    </>
  )
}

export default SearchUser