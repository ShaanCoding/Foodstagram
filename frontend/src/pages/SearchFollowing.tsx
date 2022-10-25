// import styles from "../styles/Search.module.css";
import { useParams } from 'react-router-dom'

import UseSearchFollowingMutation from '../api/UseSearchFollowingMutation';
import useAuth from '../api/util/useAuth'
import styles from '../styles/Feed.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';


const SearchUser = () => {
  const [account, isLoading] = useAuth()
  const { searchStr } = useParams();
  const searchFollowingMutation = UseSearchFollowingMutation()

  useEffect(() => {
    if (searchStr !== undefined && searchStr !== "") {
      searchFollowingMutation.mutate({
        searchStr: searchStr,
        account_id: account.account_id
      })
    }
  }, [searchStr])

  let following = searchFollowingMutation.data?.data.data

  if (searchStr !== "_all")
    following = [...new Set(following?.map((item:any) => item.item))]

    
  return (
    <>
      <h1 className='text-justify text-2xl px-48'>Search results for '{searchStr}'</h1>
      
      <div>
        {//no results
          following === undefined || following.length == 0 && (
            <h1 className='mx-auto block w-2/3 text-center mt-[200px] mb-[200px] text-xl text'>
              No results
            </h1>
          )
        }

        {//user results
          following !== undefined && following.length > 0 && 
          following.map((user:any) => {
            return (
              <div className="m-3 w-4/5 h-full ml-auto mr-auto flex max-w-[640px]">
                <div className={`flex-auto w-14`}>
                  <Link to={`/profile/${user?.username}`}>
                    <div key={user?.username} className={`py-3 px-8 bg-white hover:bg-gray-100 border ${styles.greyBorder}`}>
                      <div className="flex items-center">
                        <img
                          alt="avatar"
                          className="w-12 h-12 rounded-full border-2 border-gray-700 inline-block align-middle object-cover"
                          src={user?.profile_picture_url}
                        />
                        <p className='px-3'>{user?.name}</p>
                        <p className='text-stone-500 text-right'>@{user?.username}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })
        }

      </div>
    </>
  )
}

export default SearchUser