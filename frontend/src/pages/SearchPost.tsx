// import styles from "../styles/Search.module.css";
import { useParams } from 'react-router-dom'
import useAuth from '../api/util/useAuth'
import UseSearchPostResultsMutation from '../api/UseSearchResultPostMutation'
import { useEffect, useState } from 'react'


const SearchPost = () => {
  const [account, isLoading] = useAuth()
  const { searchStr } = useParams();
  const searchPostResultMutation = UseSearchPostResultsMutation()

  useEffect(() => {
    searchPostResultMutation.mutate({
      searchStr: searchStr
    })
  }, [searchStr])

  let posts = searchPostResultMutation.data?.data.data
  console.log(searchStr)

  return (
    <>
    <h1 className='text-justify text-2xl px-48'>Search results for '{searchStr}'</h1>
      <div className='w-full lg:w-1/2 flex justify-end items-center relative'>       
        {//posts results
          posts !== undefined && posts.length > 0 &&
          posts.map((element: {item: Post}) => {
            return (
              <h1 key={element.item.post_id}>{posts.length}</h1>
            )
          })
        }
      </div>     
    </>
  )
}

export default SearchPost